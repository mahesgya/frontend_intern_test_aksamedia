import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/use.redux';
import { addItem, updateItem, deleteItem } from '../context/slices/data.slice';
import type { Item } from '../types';
import { Modal } from '../components/common/modal';
import { ItemForm } from '../components/crud/form';

const ITEMS_PER_PAGE = 10;

const HomePage = () => {
  const dispatch = useAppDispatch();
  const allItems = useAppSelector((state) => state.data.items);
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('q') || '';

  const filteredData = useMemo(() => {
    return allItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allItems, searchQuery]);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);
  
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set('q', e.target.value);
      prev.set('page', '1');
      return prev;
    });
  };

  const openModalForCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  
  const handleFormSubmit = (itemData: Omit<Item, 'id'> | Item) => {
    if ('id' in itemData) {
      dispatch(updateItem(itemData));
    } else {
      dispatch(addItem(itemData));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      dispatch(deleteItem(id));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-quicksand">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-light dark:text-text-dark mb-4 sm:mb-0">
          CRUD Management
        </h1>
        <button 
          onClick={openModalForCreate} 
          className="bg-primary  text-white px-3 py-2 text-sm md:text-base  md:px-4 md:py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 shadow-sm"
        >
          + Tambah Data
        </button>
      </div>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full max-w-sm px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div className="md:bg-white dark:bg-gray-800 rounded-lg md:shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
             <thead className="hidden md:table-header-group border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
              {paginatedData.map(item => (
                  <tr 
                    key={item.id} 
                    className="block md:table-row border-b border-border-light dark:border-border-dark p-4 md:p-0 mb-4 md:mb-0 bg-white dark:bg-gray-800 rounded-lg shadow md:shadow-none"
                  >
                    <td data-label="ID" className="flex justify-between items-center text-right md:text-left md:table-cell px-2 py-2 md:px-6 md:py-4 text-gray-500 dark:text-gray-400 border-b md:border-none">
                      <span className="md:hidden font-semibold uppercase text-xs text-gray-400">ID</span>
                      <span>{item.id}</span>
                    </td>
                    <td data-label="Name" className="flex justify-between items-center text-right md:text-left md:table-cell px-2 py-2 md:px-6 md:py-4 font-medium text-text-light dark:text-text-dark border-b md:border-none">
                      <span className="md:hidden font-semibold uppercase text-xs text-gray-400">Name</span>
                      <span>{item.name}</span>
                    </td>
                    <td data-label="Email" className="flex justify-between items-center text-right md:text-left md:table-cell px-2 py-2 md:px-6 md:py-4 text-gray-600 dark:text-gray-400 border-b md:border-none">
                      <span className="md:hidden font-semibold uppercase text-xs text-gray-400">Email</span>
                      <span>{item.email}</span>
                    </td>
                    <td data-label="Actions" className="flex justify-end items-center md:table-cell px-2 py-2 md:px-6 md:py-4 space-x-4">
                      <button onClick={() => openModalForEdit(item)} className="font-medium text-secondary hover:text-green-400 transition-colors">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="font-medium text-error hover:text-red-400 transition-colors">Delete</button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6 space-x-2">
        {totalPages > 0 && Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-bg-dark focus:ring-primary ${
              currentPage === page
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white dark:bg-gray-700 text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Data Pengguna' : 'Tambah Data Pengguna Baru'}
      >
        <ItemForm 
          onSubmit={handleFormSubmit} 
          initialData={editingItem} 
        />
      </Modal>
    </div>
  );
};

export default HomePage;