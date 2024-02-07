import { useEffect, useRef} from 'react';
import './Select.css';
import downArrow from '../../assets/down-arrow.svg';

const CustomSelect = ({options, selected, onChange, open, setOpen}) => {
  const selectRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleSelectKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
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
      <div className="selectButton" onClick={() => setOpen(!open)}>
        <div className='selectTitle'>{selected}</div>
        <img src={downArrow} alt="downArrow" className={`"downArrow" ${open ? "rotate" : ""}`} />
      </div>
      <div className={`dropdownStyle ${open ? "show" : "hidden"}`}>
        {options?.map((opt) => (
          <div className="dropdownItem" key={opt.value} onClick={()=> onChange(opt.value)}>
            <div className="optionTitle">{opt.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomSelect;