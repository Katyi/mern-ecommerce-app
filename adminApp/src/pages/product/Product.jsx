import { useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getProducts, updateProduct } from "../../redux/apiCalls";
import Select from '../../UI/select/Select';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [file, setFile] = useState(null);
  // const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentProduct = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [product, setProduct] = useState(currentProduct);
  const [openInStock, setOpenInStock] = useState(false);
  const [inStock, setInStock] = useState(product?.inStock ? 'Yes' : 'No');
  const optionsInStock  = [
    { value: 'Yes'},
    { value: 'No'},
  ];

  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec", ], []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
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
    getStats();
  }, [productId, MONTHS]);

  const handleChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleInStockSelectChange = (value) => {
    setInStock(value);
    setOpenInStock(false);
  }

  const handleClick = (e) => {
    e.preventDefault();
    let fileName = product.img;
    if (file !== null) {
      fileName = new Date().getTime() + file.name;
      const storage = getStorage();
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed', 
        (snapshot) => {
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
          console.log(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let newproduct = { ...product, img: downloadURL };
            setProduct(newproduct);
            updateProduct(productId, newproduct, dispatch);
            getProducts(dispatch);
          });
        }
      );
      
      navigate('/products');
    } else {
      let newproduct = { ...product, inStock: inStock === 'Yes' ? true : false };
      setProduct(newproduct);
      updateProduct(productId, newproduct, dispatch);
      getProducts(dispatch);
      navigate('/products');
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <div className="productTitle">Product</div>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
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
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleClick}>
          <div className="productFormLeft">
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
              <label>In Stock</label>
              <Select 
                options={optionsInStock}
                selected={inStock || ""}
                onChange={handleInStockSelectChange}
                open={openInStock}
                setOpen={setOpenInStock}
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
          </div>
          <div className="productFormRight">
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
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button type="submit" className="productButton">Update</button>
          </div>
        </form>
        
        {/* <ModalTemplate active={modalSelectTypeOpen} setActive={setModalSelectTypeOpen}>
          <UpdateProduct modalSelectTypeOpen={modalSelectTypeOpen} setModalSelectTypeOpen={setModalSelectTypeOpen}/>
        </ModalTemplate> */}
      </div>
    </div>
  );
}