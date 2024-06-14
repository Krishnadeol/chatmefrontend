import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom";
import style from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/loader.gif"
import axios from 'axios';

function Login() {
  const navigate=useNavigate();
const [cred,setCred]=useState({
  email:"",
  password:"",
})

const tobj={
  position:"bottom-right",
  autoclose:5000,
  pauseOnhover:true,
  draggable:true, 
}
useEffect(() => {
  if (localStorage.getItem('chatme-user-data')) {
    navigate("/");
  }
}, [navigate]);



const handleSubmit=  async (e)=>{

  e.preventDefault();

  if(handleValidation){

    try{ 
  const {data} = await axios.post('http://localhost:5000/auth/login',{
  email:cred.email,
  password: cred.password,
})

if (data.success) {
    localStorage.setItem('user-data', JSON.stringify(data.user));
    navigate('/');
}
else if(!data.success) {
    toast.error(data.error, tobj);
}
}catch(error){
  toast.error("wrong credentials", tobj);
  
  console.log({error:error.message});
}
}
};

const handleValidation= async ()=>{
  const {password}=cred;

     if(password.length==="")
   {
    toast.error("Password cannot be blank",tobj);
    return false;
   }

 return true;
}

const handleChange=(e)=>{
  e.preventDefault();
   setCred({...cred,[e.target.name]:e.target.value});
  }

  return (
    <> 
    <Formcontainer>
    <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="brand">
        <img src={logo} alt=""/>
        <h1>Chat Me</h1>
        </div>
        
    
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

      <button type="submit">Login in</button>
      <span>Dont have an account ?<Link to="/register">Signup</Link></span>
    </form>
 </Formcontainer>
 <ToastContainer/>
  </>
  )
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
export default Login
