import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login/Login';
import Home from "./pages/home/Home";
import Topbar from './components/topbar/Topbar';
import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/Sidebar';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import Order from './pages/order/Order';
import NewUser from './pages/newUser/NewUser'
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import WishList from './pages/wishList/WishList';
import Wish from './pages/wish/Wish';
import { useSelector } from 'react-redux';
import OrderList from './pages/orderList/OrderList';
import { selectUser } from './redux/userSlice';

function App() {
  const user = useSelector(selectUser);
  return (
    <Router>
        <div className='wrapper'>
          {user ? <Topbar/> : ""}
          <div className="container">
            {user ? <Sidebar/> : ""}
            <Routes>
              <Route exact path='/' element={<Login/>}/>
              <Route exact path="/home" element={<Home/>}/>
              <Route path="/users" element={<UserList />}/> 
              <Route path="/user/:userId" element={<User />}/>
              <Route path="/newUser" element={<NewUser />}/>
              <Route path="/products" element={<ProductList />}/>
              <Route path="/product/:productId" element={<Product/>}/>
              <Route path="/newProduct" element={<NewProduct />}/>
              <Route path="/wishlists" element={<WishList />}/>
              <Route path="/wishlists/:wishListId" element={<Wish />}/>
              <Route path="/orders" element={<OrderList />}/>
              <Route path="/orders/:orderId" element={<Order />}/>
            </Routes>
          </div>
          {user ? <Footer/> : ""}
        </div>
    </Router>
  )
}

export default App;