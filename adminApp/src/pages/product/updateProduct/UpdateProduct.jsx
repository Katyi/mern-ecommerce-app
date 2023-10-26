import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import "./updateProduct.css";
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import { updateProduct } from "../../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const UpdateProduct = ({modalSelectTypeOpen, setModalSelectTypeOpen}) => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [inputs, setInputs] = useState({
    _id: productId,
    title: product.title,
    desc: product.desc, 
    price: product.price,
    categories: product.categories,
    // img: product.img,
    // size: []
  });
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  

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
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newproduct = { ...inputs, img: downloadURL, categories: cat };
          updateProduct(product._id, newproduct, dispatch);
        });
      }
    );
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
            placeholder="title"
            value={inputs.title} 
            onChange={handleChange}
          />
        </div>
        <div className="updateProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            value={inputs.desc}
            onChange={handleChange}
          />
        </div>
        <div className="updateProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </div>
        <div className="updateProductItem">
          <label>Categories</label>
          <input 
            type="text" 
            placeholder="jeans,skirts" 
            value={inputs.categories}
            onChange={handleCat}/>
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