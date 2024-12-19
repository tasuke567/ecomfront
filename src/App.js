import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import PrivateRoute from './components/common/PrivateRoute';
import { useSelector } from 'react-redux';

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;