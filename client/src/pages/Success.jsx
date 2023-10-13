import React from 'react';
import { useLocation } from 'react-router';

const Success = () => {
  const location = useLocation();
  // const data = location.data;


  console.log(location);
  return (
    <div>Success</div>
  )
}

export default Success;