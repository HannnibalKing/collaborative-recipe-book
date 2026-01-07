'use client';

import { useState } from 'react';
import GroceryListComponent from '@/components/GroceryList';
import { createGroceryList } from '@/lib/websocket-client';
import { Plus } from 'lucide-react';

export default function GroceryPage() {
  const [lists, setLists] = useState<{ id: string; name: string }[]>([
    { id: 'demo-list', name: 'Weekly Shopping' },
  ]);
  const [activeListId, setActiveListId] = useState<string>('demo-list');
  const [newListName, setNewListName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Simulated user ID (in production, this would come from auth)
  const userId = 'user-123';

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newListName.trim()) return;

    setIsCreating(true);
    try {
      const newList = await createGroceryList(newListName.trim(), userId);
      setLists([...lists, { id: newList.id, name: newList.name }]);
      setActiveListId(newList.id);
      setNewListName('');
    } catch (error) {
      console.error('Error creating list:', error);
      alert('Failed to create grocery list. Make sure the WebSocket server is running.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shared Grocery Lists</h1>
          <p className="text-gray-600">Real-time syncing across all your devices</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - List Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-gray-900 mb-4">Your Lists</h2>
              
              <form onSubmit={handleCreateList} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="New list name"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                    title="Create new list"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                {lists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => setActiveListId(list.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeListId === list.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {list.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Quick Tip</h3>
              <p className="text-sm text-blue-800">
                Changes sync in real-time! Open this page on another device to see updates instantly.
              </p>
            </div>
          </div>

          {/* Main Content - Active List */}
          <div className="lg:col-span-3">
            {activeListId ? (
              <GroceryListComponent listId={activeListId} userId={userId} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
                <p>Select or create a grocery list to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-medium text-gray-900 mb-1">Real-time Sync</h4>
              <p className="text-sm text-gray-600">
                Changes appear instantly on all connected devices using WebSocket technology
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">👥</div>
              <h4 className="font-medium text-gray-900 mb-1">Collaborative</h4>
              <p className="text-sm text-gray-600">
                Share lists with family and friends for coordinated shopping
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-medium text-gray-900 mb-1">Smart Organization</h4>
              <p className="text-sm text-gray-600">
                Items automatically categorized for efficient shopping
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
