import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, Menu, X, LogOut, Package, Settings, Sun, Moon } from 'lucide-react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className='bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to='/' className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
            ProShop
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center gap-6'>
            <SearchBox />
            
            <Link
              to='/cart'
              className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition relative'
            >
              <ShoppingCart className='w-5 h-5' />
              Cart
              {cartItems.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className='relative group'>
                <button className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition'>
                  <User className='w-5 h-5' />
                  {userInfo.name}
                </button>
                <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className='w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to='/login'
                className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition'
              >
                <User className='w-5 h-5' />
                Sign In
              </Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className='relative group'>
                <button className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition'>
                  <Settings className='w-5 h-5' />
                  Admin
                </button>
                <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                  <Link
                    to='/admin/productlist'
                    className='block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    Products
                  </Link>
                  <Link
                    to='/admin/orderlist'
                    className='block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    Orders
                  </Link>
                  <Link
                    to='/admin/userlist'
                    className='block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    Users
                  </Link>
                </div>
              </div>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className='p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition'
              aria-label='Toggle theme'
            >
              {darkMode ? (
                <Sun className='w-5 h-5 text-yellow-400' />
              ) : (
                <Moon className='w-5 h-5 text-gray-600' />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition'
          >
            {menuOpen ? (
              <X className='w-6 h-6 text-gray-700 dark:text-gray-300' />
            ) : (
              <Menu className='w-6 h-6 text-gray-700 dark:text-gray-300' />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className='lg:hidden pb-4 border-t border-gray-200 dark:border-gray-700 mt-2 pt-4'>
            <div className='flex flex-col gap-4'>
              <SearchBox />
              
              <Link
                to='/cart'
                className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingCart className='w-5 h-5' />
                Cart
                {cartItems.length > 0 && (
                  <span className='bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1'>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </Link>

              {userInfo ? (
                <>
                  <Link
                    to='/profile'
                    className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className='w-5 h-5' />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setMenuOpen(false);
                    }}
                    className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-left'
                  >
                    <LogOut className='w-5 h-5' />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to='/login'
                  className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  onClick={() => setMenuOpen(false)}
                >
                  <User className='w-5 h-5' />
                  Sign In
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <>
                  <div className='border-t border-gray-200 dark:border-gray-700 pt-4 mt-2'>
                    <p className='text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2'>
                      Admin Menu
                    </p>
                    <Link
                      to='/admin/productlist'
                      className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-2'
                      onClick={() => setMenuOpen(false)}
                    >
                      <Package className='w-5 h-5' />
                      Products
                    </Link>
                    <Link
                      to='/admin/orderlist'
                      className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-2'
                      onClick={() => setMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      to='/admin/userlist'
                      className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                      onClick={() => setMenuOpen(false)}
                    >
                      Users
                    </Link>
                  </div>
                </>
              )}

              {/* Theme Toggle - Mobile */}
              <button
                onClick={toggleTheme}
                className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              >
                {darkMode ? (
                  <>
                    <Sun className='w-5 h-5 text-yellow-400' />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className='w-5 h-5' />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
