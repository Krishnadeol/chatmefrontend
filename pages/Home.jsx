import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import Chats from "../components/Chat";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

function Home() {
  const [users, setUsers] = useState([]); // all the users in the database
  const [curUser, setcurUser] = useState(undefined);
  const [curChat, setCurChat] = useState(undefined);
  const [isLoading, setLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {}, [users]);

  useEffect(() => {
    const fetchUser = async () => {
      if (curUser !== undefined) {
        if (curUser.isAvatarSet) {
          console.log(curUser, "current user");
          const response = await axios.get(
            `http://localhost:5000/getcontacts?id=${curUser._id}`
          );
          setUsers(response.data);
          setLoad(false);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchUser();
  }, [curUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chatme-user-data")) {
        alert("no item chat me");
        navigate("/login");
      } else {
        const userData = JSON.parse(localStorage.getItem("chatme-user-data"));
        setcurUser(userData);
      }
    };

    fetchData();
  }, []);

  const handleChatchange = (chat) => {
    setCurChat(chat);
  };
  return (
    <>
      {isLoading || users === undefined ? (
        <Container>
          <img src={loader} alt="Loading..." />
        </Container>
      ) : (
        <Container>
          <Contacts
            curuser={curUser}
            allusers={users}
            chatchange={handleChatchange}
          />
          {curChat === undefined ? (
            <Welcome />
          ) : (
            <Chats chat={curChat} user={curUser} />
          )}
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Home;
