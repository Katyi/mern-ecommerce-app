import { useState } from "react";
import "./newProduct.css";
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish, DeleteOutline } from "@mui/icons-material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { imageUpload, imageDelete } from '../../services/imageUpload';
import Select from '../../UI/select/Select';

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [cat, setCat] = useState([]);
  const [inStock, setInStock] = useState('Choose in stock or not');
  const [openInStock, setOpenInStock] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const optionsInStock  = [
    { value: 'Yes'},
    { value: 'No'},
  ];

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeCatSizeColor = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value.split(', ') })
  };

  const handleInStockSelectChange = (value) => {
    setInStock(value);
    setOpenInStock(false);
  };

  const handleChangeImage = (e) => {
    e.preventDefault();
    const forNameOfFile = `${Date.now()}_${e.target.files[0].name}`;
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], forNameOfFile);
    setFileName(forNameOfFile);
    setFile(formData);
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    setFileName(null);
    setFile(null);
    const file = document.getElementById('file1');
    file.value = '';
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    let newProduct;
    if (file !== null) {
      imageUpload(file);
      newProduct = { ...inputs, img: `http://alexegorova.ru/images/${fileName}`, categories: cat };
    } else {
      newProduct = { ...inputs, categories: cat };
    }
    addProduct(newProduct, dispatch);
    setFileName(null);
    navigate('/products');
  };

  return (
    <div className="newProduct">
      <div className="addProductTitle">New Product</div>
      <form className="addProductForm">
        <div className="userUpload">
        <img className="productUpdateImg" src={"https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg"}/>
          <div className="newUserImage">
            <label htmlFor="file1" className="userImageLabel">
              <Publish className="userUpdateIcon" />
            </label>
            <input 
              type="file" 
              id="file1" 
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChangeImage}
            />
            <button className="userImageBtn" onClick={handleDeleteImage} id="resetbtn" type="button">
              <HighlightOffIcon className="userUpdateIcon"/>
            </button>
            <div>{fileName}</div>
          </div>
        </div>
        <div className="newProductWrapper">
          <div className="addProductItem">
            <label>Title</label>
            <input 
              name="title"
              type="text"
              placeholder="Apple Airpods" 
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              name="desc"
              type="text"
              placeholder="description..."
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product categories</label>
            <input 
              name="categories"
              type="text"
              placeholder="categories..."
              onChange={handleChangeCatSizeColor}
            />
          </div>
          <div className="addProductItem">
            <label>Product sizes</label>
            <input 
              name="size"
              type="text"
              placeholder="sizes..."
              onChange={handleChangeCatSizeColor}
            />
          </div>
          <div className="addProductItem">
            <label>Product colors</label>
            <input 
              name="color"
              type="text"
              placeholder="colors..."
              onChange={handleChangeCatSizeColor}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="100"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>In Stock</label>
            <Select 
              options={optionsInStock}
              selected={inStock || ""}
              onChange={handleInStockSelectChange}
              open={openInStock}
              setOpen={setOpenInStock}
            />
          </div>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}