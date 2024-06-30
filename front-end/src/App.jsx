import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import ProtectedRoute from './components/ProtectedRoutes';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SinglePost from './components/SinglePost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="create" element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
