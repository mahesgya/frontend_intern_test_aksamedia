import React, { useState, useEffect } from 'react';
import type { Item } from '../../types';

interface ItemFormProps {
  onSubmit: (item: Omit<Item, 'id'> | Item) => void;
  initialData?: Item | null;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      onSubmit({ id: initialData.id, name, email });
    } else {
      onSubmit({ name, email });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
        {initialData ? 'Update' : 'Create'}
      </button>
    </form>
  );
};