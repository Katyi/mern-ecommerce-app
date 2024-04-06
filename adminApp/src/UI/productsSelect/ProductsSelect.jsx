import { useEffect, useRef, useState } from 'react';
import './ProductsSelect.css';
import downArrow from '../../assets/down-arrow.svg';

const ProductsSelect = ({options, selected, onChange, open, setOpen, index}) => {
  const selectRef = useRef(null);
  
  const handleOutsideClick = (e) => {
    if (selectRef.current && e.target.className !== 'productsSelectButton' && e.target.className !== 'productsSelectTitle' && e.target.className !== '"downArrow" rotate') {
      setOpen();
    }
  };

  const handleSelectKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen();
    }
  };

  useEffect(() => {    
    document.addEventListener('mouseup', handleOutsideClick);
    return () => document.removeEventListener('mouseup', handleOutsideClick);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleSelectKeyDown);
    return () => document.removeEventListener('keydown', handleSelectKeyDown);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="selectContainer" ref={selectRef}>
      <div className="productsSelectButton" onClick={() => setOpen(index)}>
        <div className='productsSelectTitle'>{selected}</div>
        <img src={downArrow} alt="downArrow" className={`"downArrow" ${open[index] ? "rotate" : ""}`} />
      </div>
      <div className={`productsDropdownStyle ${open[index] ? "show1" : "hidden1"}`}>
        {options?.map((opt) => (
          <div className="dropdownItem" key={opt.value} onClick={()=> onChange(index, opt.value)}>
            <div className="optionTitle">{opt.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsSelect;