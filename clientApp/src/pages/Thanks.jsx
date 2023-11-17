import React from 'react';
import { useNavigate } from 'react-router';

const Thanks = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        // margin: "60px auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
      }}
    >
      <h1 style={{color:'teal', }}>The form was submitted successfully!</h1>
      
      <button
        style={{
          border: "none",
          marginTop: 20,
          borderRadius: 5,
          padding: "20px",
          backgroundColor: "teal",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
          fontSize: 18,
          textAlign: "center",
        }}
        onClick={()=> navigate("/home")}
      >
        TO HOME PAGE
      </button>
        <p style={{
          marginTop: 20,
          textAlign: "center",
          fontSize: 16,
          fontWeight: "500"
        }}>
          Your order is being prepared.<br/>
          Thanks for choosing Alex's shop.
        </p>
    </div>
  );
};

export default Thanks;