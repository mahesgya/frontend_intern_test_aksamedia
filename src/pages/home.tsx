import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

interface Item {
  id: number;
  name: string;
  email: string;
}

const mockData: Item[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User Name ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

const ITEMS_PER_PAGE = 10;

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('q') || '';

  const filteredData = useMemo(() => {
    return mockData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
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

  const handleSearch = (query: string) => {
    setSearchParams(prev => {
      prev.set('q', query);
      prev.set('page', '1'); 
      return prev;
    });
  };

  return (
    <div className='px-2 font-quicksand'>
      <h1 className="text-xl md:text-2xl text-3xl font-bold mb-4">CRUD Management</h1>
      <input 
        type="text" 
        placeholder="Search by name..."
        defaultValue={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-[80dvw] md:w-1/3 dark:bg-gray-700"
      />
    
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-md">
           <thead>
            <tr className="border-b border-border-light dark:border-border-dark">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
            </tr>
           </thead>
           <tbody>
             {paginatedData.map(item => (
                <tr key={item.id} className="border-b border-border-light dark:border-border-dark">
                  <td className="p-4">{item.id}</td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.email}</td>
                </tr>
             ))}
           </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;