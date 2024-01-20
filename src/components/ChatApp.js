import React, { useState, useEffect, useRef } from "react";
// import socket from "./io";
import HeaderLogout from "./HeaderLogout.jsx";
import styled from "styled-components";
import io from "socket.io-client";

import Image from "./Image";

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  /* background-color: #46516e; */
  background: linear-gradient(to right, #0d1525, #0c264d);

  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 600px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;

  @media (max-width: 600px) {
    width: 90%; /* Set width to 100% for smaller screens */
    height: 300px;
    max-height: 300px;
  }
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 50px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
  @media (max-width: 600px) {
    width: 80%; /* Set width to 100% for smaller screens */
  }
`;

const Button = styled.button`
  background-color: #3d82d5;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: white;
  font-size: 25px;
  @media (max-width: 600px) {
    width: 90%; /* Set width to 100% for smaller screens */
  }
`;

const Form = styled.form`
  width: 600px;
  @media (max-width: 600px) {
    width: 90%; /* Set width to 100% for smaller screens */
  }
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: #0a101b;
  color: #ffffff;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-radius: 20px;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightgray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-radius: 20px;
`;
function ChatApp() {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const [istyping, setIstyping] = useState(false);

  const socketRef = useRef();

  let socketType = io.connect("https://ef21-116-71-9-199.ngrok-free.app");

  useEffect(() => {
    socketRef.current = io.connect("https://ef21-116-71-9-199.ngrok-free.app");

    socketRef.current.on("your id", (id) => {
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current.on("typing", (data) => {
      console.log("I am Typing..........", data);

      if (data) {
        setIstyping(true);
        setTimeout(() => {
          setIstyping(false);
        }, 3000);
      } else {
        setIstyping(false);
      }
      // receivedMessage(sendTyping);
    });
  });

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (file) {
      const messageObject = {
        id: yourID,
        type: "file",
        body: file,
        mimeType: file.type,
        fileName: file.name,
      };
      setMessage("");
      setFile(null); // Clear the file state
      socketRef.current.emit("send message", messageObject);
    } else {
      const messageObject = {
        id: yourID,
        type: "text",
        body: message,
      };
      setMessage("");
      socketRef.current.emit("send message", messageObject);
    }
  }

  function handleChange(e) {
    if (e.target.name == "message") {
      console.log("message type start");
      socketType.emit("sendTyping", message);
    }
    setMessage(e.target.value);
  }

  function selectFile(e) {
    const selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile);
    setFile(selectedFile);
  }

  function renderMessages(message, index) {
    if (message.type === "file") {
      const blob = new Blob([message.body], { type: message.mimeType });
      if (message.id === yourID) {
        return (
          <MyRow key={index}>
            <Image fileName={message.fileName} blob={blob} />
          </MyRow>
        );
      }
      return (
        <PartnerRow key={index}>
          <Image fileName={message.fileName} blob={blob} />
        </PartnerRow>
      );
    }

    if (message.id === yourID) {
      return (
        <MyRow key={index}>
          <MyMessage>{message.body}</MyMessage>
        </MyRow>
      );
    }
    return (
      <PartnerRow key={index}>
        <PartnerMessage>{message.body}</PartnerMessage>
      </PartnerRow>
    );
  }

  return (
    <>
      <HeaderLogout count={messages ? messages.length : 0} />
      <Page>
        <div
          style={{
            textAlign: "center",
            fontFamily: "fantasy",
            letterSpacing: "2px",
            fontSize: "31px",
            color: "white",
          }}
        >
          ChatApp
        </div>

        <Container>{messages.map(renderMessages)}</Container>
        <Form onSubmit={sendMessage}>
          {istyping == true ? <div>Typing...</div> : <div></div>}
          <TextArea
            value={message}
            onChange={handleChange}
            placeholder="Start Chatting..."
            name="message"
          />
          <input onChange={selectFile} type="file" />
          <Button>Send</Button>
        </Form>
      </Page>
    </>
  );
}

export default ChatApp;
