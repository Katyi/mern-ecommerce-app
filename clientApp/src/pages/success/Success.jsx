import React from 'react';
import { useNavigate } from 'react-router';
import thanksImg from "../../assets/paid-thank-you.png";

const Success = () => {
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
      <h1 style={{color:'teal', }}>Your payment is successfull!</h1>
      <img
        style={{
          // width: 100,
          // height: 100,
          borderRadius: "50%",
        }}
        src={thanksImg}
        alt=""
      />
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

export default Success;