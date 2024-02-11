import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from './pages/home/Home';
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import Success from "./pages/success/Success";
import Thanks from "./pages/thanks/Thanks";
import UserPage from "./pages/userPage/UserPage";
import Wishlist from "./pages/wishlist/Wishlist";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={user ? <Navigate to='/home'/> : <Login/>}/> */}
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/wishlist" element={<Wishlist/>}/>
        <Route exact path="/success" element={<Success/>}/>
        <Route exact path="/thanks" element={<Thanks/>}/>
        <Route exact path="/account" element={<UserPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;