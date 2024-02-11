import Navbar from '../../components/navbar/Navbar';
import Announcement from '../../components/announcement/Announcement';
import Products from '../../components/products/Products';
import Newsletter from '../../components/newsletter/Newsletter';
import Footer from '../../components/footer/Footer';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, TitleWrapper, Title, TopButton, FilterContainer, Filter, FilterText } from './styled';
import Select from '../../UI/select/Select';

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');
  const [colorOpen, setColorOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const navigate = useNavigate();

  const colorOptions  = [
    { value: 'All'},
    { value: 'White'},
    { value: 'Black'},
    { value: 'Red'},
    { value: 'Blue'},
    { value: 'Yellow'},
    { value: 'Green'},
  ];
  const sizeOptions  = [
    { value: 'All'},
    { value: 'One size'},
    { value: 'XS'},
    { value: 'S'},
    { value: 'M'},
    { value: 'L'},
    { value: 'XL'},
  ];
  const sortOptions  = [
    { value: 'Newest'},
    { value: 'Price (asc)'},
    { value: 'Price (desc)'},
  ];

  const handleFilters = (value) => {
    if (colorOpen) {
      setFilters({...filters, color: value});
      setColorOpen(false);
    } else if (sizeOpen) {
      setFilters({...filters, size: value});
      setSizeOpen(false);
    } else if (sortOpen) {
      setSort(value)
      setSortOpen(false)
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <TitleWrapper>
        {cat !== 'all' ? <Title>Category: {cat}</Title> : <Title>All products</Title>}
      <TopButton onClick={()=> navigate('/home')}>TO HOME PAGE</TopButton>
      </TitleWrapper>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select
            options={colorOptions}
            selected={filters.color || "Color"}
            onChange={handleFilters}
            open={colorOpen}
            setOpen={setColorOpen}
          />
          <Select
            options={sizeOptions}
            selected={filters.size || "Size"}
            onChange={handleFilters}
            open={sizeOpen}
            setOpen={setSizeOpen}
          />
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select
            options={sortOptions}
            selected={sort || ""}
            onChange={handleFilters}
            open={sortOpen}
            setOpen={setSortOpen}
          />
        </Filter>
      </FilterContainer>
      <br/>
      <Products cat={cat} filters={filters} sort={sort}/>
      <Newsletter />
      <Footer/>
    </Container>
  )
}

export default ProductList;