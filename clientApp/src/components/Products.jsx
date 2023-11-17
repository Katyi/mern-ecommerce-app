import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from '../data';
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  /* width: calc(100vw - 1.5vw); */
  padding: 5px 20px;
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
          ? `http://localhost:5000/api/products?category=${cat}` 
          : 'http://localhost:5000/api/products?category'
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts()
  },[cat]);

  useEffect(()=>{
    cat &&
    setFilteredProducts(
      products?.filter(item => 
        Object?.entries(filters)?.every(([key, value]) =>
          item[key]?.includes(value)
        )
      )
    );
  }, [products, filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>a.createdAt - b.createdAt)  
      );
    } else if (sort === 'asc') {
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>a.price - b.price)  
      );
    } else {
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
