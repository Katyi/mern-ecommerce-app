import React, { useState } from 'react';
import "./updateProduct.css";

const UpdateProduct = ({modalSelectTypeOpen, setModalSelectTypeOpen}) => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModalSelectTypeOpen(false);
    console.log('submit!')
  }

  return (
    <div className="updateProduct">
      <h1 className="updateProductTitle">New Product</h1>
      <form className="updateProductForm" onSubmit={handleClick}>
        <div className="updateProductItem">
          <label>Image</label>
          <input 
            type="file" 
            id="file" 
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="updateProductItem">
          <label>Title</label>
          <input 
            name="title"
            type="text"
            placeholder="Apple Airpods" 
            onChange={handleChange}
          />
        </div>
        <div className="updateProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="updateProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="updateProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat}/>
        </div>
        <div className="updateProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type='submit' className="updateProductButton">
          Update
        </button>
      </form>
    </div>
  )
}

export default UpdateProduct;