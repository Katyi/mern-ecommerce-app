import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Thanks from "./pages/Thanks";

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
        <Route path="/product/:id" element={<Product/>}/>=''
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/success" element={<Success/>}/>
        <Route exact path="/thanks" element={<Thanks/>}/>
      </Routes>
    </Router>
  )
}

export default App