import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {

  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-white text-2xl font-bold">My Blog</Link>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/create" className="text-gray-400 hover:text-white">Create</Link>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/create" className="text-gray-400 hover:text-white">Create</Link>
              <Link to="/login" className="text-gray-400 hover:text-white">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header