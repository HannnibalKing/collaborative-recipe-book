'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { GroceryList, GroceryItem } from '@/lib/types';

let socket: Socket | null = null;

export function useGroceryList(listId: string | null) {
  const [list, setList] = useState<GroceryList | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!listId) return;

    // Initialize socket connection
    if (!socket) {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
      socket = io(wsUrl);

      socket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to WebSocket server');
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from WebSocket server');
      });
    }

    // Join the list room
    socket.emit('join-list', listId);

    // Listen for list updates
    socket.on('list-updated', (updatedList: GroceryList) => {
      setList(updatedList);
    });

    return () => {
      if (socket) {
        socket.emit('leave-list', listId);
        socket.off('list-updated');
      }
    };
  }, [listId]);

  const addItem = (item: Omit<GroceryItem, 'id'>) => {
    if (!socket || !listId) return;
    socket.emit('add-item', { listId, item });
  };

  const updateItem = (itemId: string, updates: Partial<GroceryItem>) => {
    if (!socket || !listId) return;
    socket.emit('update-item', { listId, itemId, updates });
  };

  const removeItem = (itemId: string) => {
    if (!socket || !listId) return;
    socket.emit('remove-item', { listId, itemId });
  };

  const toggleItem = (itemId: string) => {
    if (!socket || !listId) return;
    socket.emit('toggle-item', { listId, itemId });
  };

  return {
    list,
    isConnected,
    addItem,
    updateItem,
    removeItem,
    toggleItem,
  };
}

export function createGroceryList(name: string, userId: string): Promise<GroceryList> {
  return new Promise((resolve, reject) => {
    if (!socket) {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
      socket = io(wsUrl);
    }

    socket.once('list-created', (newList: GroceryList) => {
      resolve(newList);
    });

    socket.emit('create-list', { name, userId });

    // Timeout after 5 seconds
    setTimeout(() => {
      reject(new Error('Timeout creating grocery list'));
    }, 5000);
  });
}
