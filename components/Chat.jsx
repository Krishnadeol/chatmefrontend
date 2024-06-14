import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import ChatInput from "./ChatInput";
function Chat({ chat, user }) {
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.post(
        "http://localhost:5000/message/getmsg",
        {
          from: user._id,
          to: chat._id,
        }
      );
      setAllMessages(response.data);
    };
    fetchMessages();
  }, [chat]);

  const handleSendMsg = async (msg) => {
    const response = await axios.post("http://localhost:5000/message/addmsg", {
      from: user._id,
      to: chat._id,
      message: msg,
    });
  };
  console.log(chat);
  return (
    chat !== undefined && (
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${chat.avatarImage}`}
                alt="my avatar"
              />
            </div>
            <div className="username">
              <h3>{chat.name}</h3>
            </div>
          </div>
        </div>
        <div className="chat-messages">
          {allMessages.map((message) => {
            return (
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    )
  );
}
export default Chat;
const Container = styled.div``;
