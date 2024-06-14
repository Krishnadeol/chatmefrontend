import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

function Contacts({ curuser, allusers, chatchange }) {
  const [name, setName] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  useEffect(() => {}, [name]);

  useEffect(() => {
    if (curuser) {
      setName(curuser.name);
      setImage(curuser.avatarImage);
    }
  }, []);

  const changeCurrentChat = (index, contact) => {
    setSelectedIndex(index);
    chatchange(contact);
  };
  return (
    <>
      {name !== undefined && image != undefined && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>ChatME</h3>
          </div>
          <div className="contacts">
            {allusers.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === selectedIndex ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                  }}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="image of the contact"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${image}`} alt="my avatar" />
            </div>
            <div className="username">
              <h3>{name}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default Contacts;
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
