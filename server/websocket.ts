import { createServer } from 'http';
import { Server } from 'socket.io';
import type { GroceryList, GroceryItem } from '../lib/types';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// In-memory storage (replace with database in production)
const groceryLists = new Map<string, GroceryList>();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join a grocery list room
  socket.on('join-list', (listId: string) => {
    socket.join(listId);
    console.log(`Socket ${socket.id} joined list ${listId}`);
    
    // Send current list state
    const list = groceryLists.get(listId);
    if (list) {
      socket.emit('list-updated', list);
    }
  });

  // Leave a grocery list room
  socket.on('leave-list', (listId: string) => {
    socket.leave(listId);
    console.log(`Socket ${socket.id} left list ${listId}`);
  });

  // Create a new grocery list
  socket.on('create-list', (data: { name: string; userId: string }) => {
    const newList: GroceryList = {
      id: `list-${Date.now()}`,
      name: data.name,
      items: [],
      sharedWith: [],
      createdBy: data.userId,
      updatedAt: new Date(),
    };
    
    groceryLists.set(newList.id, newList);
    socket.emit('list-created', newList);
  });

  // Add item to list
  socket.on('add-item', (data: { listId: string; item: Omit<GroceryItem, 'id'> }) => {
    const list = groceryLists.get(data.listId);
    if (!list) return;

    const newItem: GroceryItem = {
      ...data.item,
      id: `item-${Date.now()}-${Math.random()}`,
    };

    list.items.push(newItem);
    list.updatedAt = new Date();
    
    // Broadcast to all clients in the room
    io.to(data.listId).emit('list-updated', list);
  });

  // Update item
  socket.on('update-item', (data: { listId: string; itemId: string; updates: Partial<GroceryItem> }) => {
    const list = groceryLists.get(data.listId);
    if (!list) return;

    const itemIndex = list.items.findIndex(item => item.id === data.itemId);
    if (itemIndex !== -1) {
      list.items[itemIndex] = { ...list.items[itemIndex], ...data.updates };
      list.updatedAt = new Date();
      
      io.to(data.listId).emit('list-updated', list);
    }
  });

  // Remove item
  socket.on('remove-item', (data: { listId: string; itemId: string }) => {
    const list = groceryLists.get(data.listId);
    if (!list) return;

    list.items = list.items.filter(item => item.id !== data.itemId);
    list.updatedAt = new Date();
    
    io.to(data.listId).emit('list-updated', list);
  });

  // Toggle item checked status
  socket.on('toggle-item', (data: { listId: string; itemId: string }) => {
    const list = groceryLists.get(data.listId);
    if (!list) return;

    const item = list.items.find(item => item.id === data.itemId);
    if (item) {
      item.checked = !item.checked;
      list.updatedAt = new Date();
      
      io.to(data.listId).emit('list-updated', list);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.WS_PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
