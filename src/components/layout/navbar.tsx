import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/use.redux';
import { logoutSuccess } from '../../context/slices/auth.slice';
import { Dropdown } from './dropdown';
import { ThemeSwitcher } from '../theme.switcher';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/login')
  };

  return (
    <nav className="font-quicksand bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-primary font-bold text-xl">
              Aksamedia
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <Dropdown
              trigger={
                <button className="flex items-center text-sm rounded-sm focus:outline-none ">
                  <span className="text-text-light dark:text-text-dark">{user?.name}</span>
                </button>
              }
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit Profil
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-sm text-error hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};