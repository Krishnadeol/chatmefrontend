import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import loader from "../assets/loader.gif";
import { Buffer } from "buffer";

function SetAvatar() {
  const api1 =
    "https://api.dicebear.com/8.x/avataaars/svg?top=winterHat04,shortWaved";
  const api2 =
    "https://api.dicebear.com/8.x/avataaars/svg?backgroundType=gradientLinear,solid";
  const api3 = "https://api.dicebear.com/8.x/adventurer/svg?seed=Felix";
  const api4 = "https://api.dicebear.com/8.x/personas/svg?seed=Aneka";

  const navigate = useNavigate();
  const [avatars, setavatars] = useState([]);
  const [isLoading, setload] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(true);

  const tobj = {
    position: "bottom-right",
    autoclose: 5000,
    pauseOnhover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (avatars[selectedAvatar] === undefined) {
      toast.error("please select an avatar", tobj);
    } else {
      // for getting the infortmation stored in local storage
      const user = await JSON.parse(localStorage.getItem("chatme-user-data"));
      // api call for setting image in backend
      const { data } = await axios.post(
        `http://localhost:5000/setA/${user._id}`,
        {
          image: avatars[selectedAvatar],
        }
      );

      // changing information in local storage  if the the backend has been updated successfully
      if (data.isSet) {
        user.isAvatarSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chatme-user-data", JSON.stringify(user));
        navigate("/");
      } else toast.error("Error setting avatar, please try again", tobj);
    }
  };

  const fetchData = async () => {
    try {
      const data = [];

      let image = await axios.get(`${api1}`);
      let buffer = Buffer.from(image.data);
      data.push(buffer.toString("base64"));

      image = await axios.get(`${api2}`);
      buffer = Buffer.from(image.data);
      data.push(buffer.toString("base64"));

      image = await axios.get(`${api3}`);
      buffer = Buffer.from(image.data);
      data.push(buffer.toString("base64"));

      image = await axios.get(`${api4}`);
      buffer = Buffer.from(image.data);
      data.push(buffer.toString("base64"));

      setavatars(data);
      setload(false);
    } catch (error) {
      // Handle errors here
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("chatme-user-data")) {
      navigate("/login");
    }
    if (JSON.parse(localStorage.getItem("chatme-user-data")).isAvatarSet) {
      navigate("/");
    }
    fetchData();
  }, []);

  return (
    <>
      {!isLoading ? (
        <Container>
          <div className="title-container">
            <h1>pick a profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`} // way of converting string to image.
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
            <button className="sel-btn" onClick={setProfilePicture}>
              Set avatar
            </button>
          </div>
        </Container>
      ) : (
        <Container>
          <img src={loader} alt="Loading..." />
        </Container>
      )}
      <ToastContainer />
    </>
  );
}
export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
      background-color: #4e0eff;
    }
  }
`;
