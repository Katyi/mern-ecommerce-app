import { useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish, DeleteOutline } from "@mui/icons-material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import Select from '../../UI/select/Select';
import { imageUpload, imageDelete } from '../../services/imageUpload';
import { useUpdateProductMutation } from '../../redux/productsApi';

export default function Product() {
  const location = useLocation();
  const {currentProduct} = location.state;
  const productId = currentProduct._id;
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();
  const [pStats, setPStats] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileForDelete, setFileForDelete] = useState(null);
  const [product, setProduct] = useState(currentProduct);
  const [openInStock, setOpenInStock] = useState(false);
  const [inStock, setInStock] = useState(product?.inStock ? 'Yes' : 'No');
  const optionsInStock  = [
    { value: 'Yes'},
    { value: 'No'},
  ];

  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec", ], []);

  const getStats = async () => {
    try {
      const res = await userRequest.get(`orders/income?pid=${productId}`);
      const list = res.data.sort((a,b)=>{
          return a._id - b._id
      })
      list.map((item) =>
        setPStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Sales: item.total },
        ])
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  };

  const handleChangeCatSizeColor = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value.split(', ') })
  };

  const handleInStockSelectChange = (value) => {
    setInStock(value);
    setOpenInStock(false);
  };

  const handleChangeImage = (e) => {
    let forNameOfFile = `${Date.now()}_${e.target.files[0].name}`;
    setFileName(forNameOfFile);
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], forNameOfFile);
    setFile(formData);
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    setFileForDelete(product.img.slice(29));
    setFileName(null);
    setFile(null);
  };

  const handleDeleteInputFile = (e) => {
    e.preventDefault();
    setFileName(null);
    setFile(null);
    const file = document.getElementById('file');
    file.value = '';
  };

  const handleClick = (e) => {
    e.preventDefault();
    let newProduct;
    if (file !== null) {
      if (product.img) {
        imageDelete(product.img.slice(29));
      }
      imageUpload(file);
      newProduct = { ...product, inStock: inStock === 'Yes' ? true : false, img: `http://alexegorova.ru/images/${fileName}` };
    } else if (fileForDelete !== null) {
      imageDelete(fileForDelete);
      newProduct = { ...product, inStock: inStock === 'Yes' ? true : false, img: null };
    } else {
      newProduct = { ...product, inStock: inStock === 'Yes' ? true : false };
    }
    setFileName(null);
    updateProduct({id: productId, body: newProduct});
    navigate('/products');
  };

  useEffect(() => {
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <div className="productTitle">Product</div>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" grid={pStats}/>
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} className="productInfoImg" 
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
              }}
            />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">{pStats[1]?.Sales}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
      </div>
      <form className="productForm" onSubmit={handleClick}>
        <div className="productFormBottom">
          <div className="productUpload">
            <img src={product.img} className="productUploadImg"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
              }}
            />
            <label htmlFor="file">
              <Publish />
            </label>
            <input type="file" id="file" style={{ display: "none" }} onChange={handleChangeImage}/>
            {product.img 
              ? <button className="userImageBtn" onClick={handleDeleteImage} id="" type="button">
                  <DeleteOutline className="userUpdateIcon"/>
                </button>
              : <button className="userImageBtn" onClick={handleDeleteInputFile} id="resetbtn" type="button">
                  <HighlightOffIcon className="userUpdateIcon"/>
                </button>
            }
            <span style={{fontSize: "10px", wordBreak: "break-all", width: "150px"}}>{fileName}</span>
          </div>
          <div className="productUpdateItem">
            <label>Product Name</label>
            <input 
              name="title"
              type="text" 
              placeholder="title"
              value={product.title} 
              onChange={handleChange}
            />
          </div>
          <div className="productUpdateItem">
            <label>Product Description</label>
            <input 
              name="desc"
              type="text"
              placeholder="description..."
              value={product.desc}
              onChange={handleChange}
            />
          </div>
          <div className="productUpdateItem">
            <label>Product categories</label>
            <input 
              name="categories"
              type="text"
              placeholder="categories..."
              value={product?.categories.join(', ') || ""}
              onChange={handleChangeCatSizeColor}
            />
          </div>
          <div className="productUpdateItem">
            <label>Product sizes</label>
            <input 
              name="size"
              type="text"
              placeholder="sizes..."
              value={product.size.join(", ")}
              onChange={handleChangeCatSizeColor}
            />
          </div>
          <div className="productUpdateItem">
            <label>Product colors</label>
            <input 
              name="color"
              type="text"
              placeholder="colors..."
              value={product.color.join(", ")}
              onChange={handleChangeCatSizeColor}
            />
          </div>
          <div className="productUpdateItem">
            <label>Price</label>
            <input 
              name="price"
              type="number"
              placeholder="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="productUpdateItem">
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
        <button type="submit" className="productButton">Update</button>
      </form>
    </div>
  );
}