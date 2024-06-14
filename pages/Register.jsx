import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/loader.gif";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const tobj = {
    position: "bottom-right",
    autoclose: 5000,
    pauseOnhover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation) {
      try {
        const { data } = await axios.post("http://localhost:5000/auth", {
          name: cred.name,
          email: cred.email,
          password: cred.password,
        });
        if (data.success) {
          localStorage.setItem("chatme-user-data", JSON.stringify(data.user));
          navigate("/login");
        } else if (!data.success) {
          toast.error(data.error, tobj);
        }
      } catch (error) {
        toast.error("user exists", tobj);

        console.log({ error: error.message });
      }
    }
  };

  const handleValidation = async () => {
    const { name, password, cpassword } = cred;

    if (name.length < 3) {
      toast.error("Too short name", tobj);
      return false;
    } else if (password.length < 5) {
      toast.error("Password should atleast 5 char long", tobj);
      return false;
    } else if (password !== cpassword) {
      toast.error("Confired password does not match", tobj);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Formcontainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={logo} alt="" />
            <h1>Chat Me</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="name"
            value={cred.name}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={cred.email}
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={cred.password}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            value={cred.cpassword}
            onChange={handleChange}
          />

          <button type="submit">Create User</button>
          <span>
            already have an account ?<Link to="/login">Login</Link>
          </span>
        </form>
      </Formcontainer>
      <ToastContainer />
    </>
  );
}

const Formcontainer = style.div`
  margin-top:2px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  overflow: auto; 
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;

      &:hover {
        background-color: #997af0;
      }
    }
  }

  span {
    color: white;
    text-transform: uppercase;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
export default Register;
