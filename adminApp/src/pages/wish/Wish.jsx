import './wish.css';
import { useEffect, useMemo, useState } from "react";
import dayjs from 'dayjs';
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../redux/usersApi";
import { useGetProductsQuery } from "../../redux/productsApi";

const Wish = () => {
  const location = useLocation();
  const {currentWishlist} = location.state;
  const {  data: users = [], isLoading, isFetching, isError, error, } = useGetUsersQuery();
  const {  data: products = [] } = useGetProductsQuery();
  const [wishlist, setWishlist] = useState(currentWishlist);

  const getUserNameFromWishlist = (userId) => {
    return users?.find(elem => elem._id === userId)?.username;
  };

  const getProductTitleFromWishlist = (ProductId) => {
    return products?.find(elem => elem._id === ProductId)?.title;
  };

  return (
    <div className="wish">
      <div className="wishTitleContainer">
        <div className="wishTitle">Wishlist</div>
      </div>
      <div className="wishContainer">
        <div className="wishTop">
          <div className="wishInfoItem">
            <span className="wishInfoKey">ID:</span>
            <span className="wishInfoValue">{wishlist._id}</span>
          </div>
          <div className="wishInfoItem">
            <span className="wishInfoKey">User:</span>
            <span className="wishInfoValue">{getUserNameFromWishlist(wishlist.userId)}</span>
          </div>
          <div className="wishInfoItem">
            <span className="wishInfoKey">Created date:</span>
            <span className="wishInfoValue">{dayjs(wishlist.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
          </div>
          <div className="wishInfoItem">
            <span className="wishInfoKey">Updated date:</span>
            <span className="wishInfoValue">{dayjs(wishlist.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</span>
          </div>  
        </div>
        <div className="WishProductsPartTitle">Products</div>
        <div className="wishBottom">
          {wishlist.products.map((product, index) => (
            <div className="WishProductPart" key={product._id}>
              <div className="wishProductPartItem">
                <label className="wishInfoSecondKey">Product title:</label>
                <div className="wishInfoValue">{getProductTitleFromWishlist(product.productId)}</div>  
              </div>
              <div className="wishProductPartItem">
                <label className="wishInfoSecondKey">Product color:</label>
                <div className="wishInfoValue">{product.color}</div>
              </div>
              <div className="wishProductPartItem">
                <label className="wishInfoSecondKey">Product size:</label>
                <div className="wishInfoValue">{product.size}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wish;