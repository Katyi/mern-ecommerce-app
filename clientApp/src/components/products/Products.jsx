import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "../product/Product";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  padding: 10px 0px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 1vw;
`;

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async()=>{
      try {
        const res = await axios.get(
          cat 
          ? `http://212.113.120.58:5000/api/products?category=${cat}` 
          : 'http://212.113.120.58:5000/api/products?category'
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts()
  },[cat]);

  useEffect(()=>{
    !filters || (filters?.color === 'All' && filters?.size === 'All') || (filters?.color === 'All' && !filters.size)
    || (filters?.size === 'All' && !filters.color)
    ? setFilteredProducts(products)
    : filters?.color !== 'All' && filters?.size === 'All' 
      ? setFilteredProducts(products?.filter(item => item?.color?.includes(filters?.color))) 
    : filters?.color === 'All' && filters?.size !== 'All'
      ? setFilteredProducts(products?.filter(item => item?.size?.includes(filters?.size)))
    : setFilteredProducts(products?.filter(item => Object?.entries(filters)?.every(([key, value]) => item[key]?.includes(value))))
  }, [products, filters]);

  useEffect(() => {
    if (sort === 'Newest') {
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))  
      );
    } else if (sort === 'Price (asc)') {
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>a.price - b.price)  
      );
    } else if (sort === 'Price (desc)') {
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>b.price - a.price)  
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts?.map(item => <Product item={item} key={item._id} />) 
        : products?.slice(0, 8)?.map(item => <Product item={item} key={item._id} />)
      }
    </Container>
  )
}

export default Products;