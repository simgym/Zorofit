import React, { useState, useEffect } from "react";
import { db, auth } from "../../index";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "../userProfileServices/ZoroBuddy.css";
import defaultAvatar from "../../assets/default.jpg";
import { IoSend } from "react-icons/io5";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoChevronBack } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";
import { FaImages } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

const Chat = ({ selectedChat, onBack }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputOptions, setInputOptions] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const [rotation, setRotation] = useState(0);
  const selectedUserDetails = JSON.parse(
    localStorage.getItem("selectedUserDetails")
  );
  console.log("selectedUserPic is : ", selectedUserDetails.userPic);
  console.log(
    auth.currentUser.displayName,
    " is chatting with : ",
    selectedUserDetails.userName
  );

  useEffect(() => {
    const fetchMessages = () => {
      if (selectedChat) {
        const messagesRef = collection(
          db,
          "userChats",
          selectedChat,
          "messages"
        );
        const q = query(messagesRef, orderBy("timestamp"));

        // real-time listener for immediate display of messages sent
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messagesData = snapshot.docs.map((doc) => doc.data());
          console.log("MESSAGES ARE :", messagesData);
          setMessages(messagesData);
        });

        // clean up of listener when the component unmounts
        return () => unsubscribe();
      }
    };

    fetchMessages();
  }, [selectedChat, message]);

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const chatRef = doc(db, "userChats", selectedChat);
      const newMessageRef = collection(chatRef, "messages");

      // check if the collection exists
      const messageCollection = await getDocs(newMessageRef);

      // if the collection doesn't exist create it
      if (messageCollection.empty) {
        await setDoc(chatRef, {}); // to create an empty document
      }

      // add the message to the collection
      if (message.trim()) {
        await addDoc(newMessageRef, {
          senderId: auth.currentUser.uid,
          receiverId: selectedChat,
          content: message,
          timestamp: new Date(),
        });
      }
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // scroll to bottom of conv
  useEffect(() => {
    const conversationDiv = document.getElementById("conversation");
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={selectedChat ? "zoro-chat" : "noChatYet"}>
      {selectedChat && (
        <div className="convo-header">
          {isSmallScreen && <IoChevronBack onClick={() => onBack()} />}
          <img
            src={
              selectedUserDetails.userPic
                ? selectedUserDetails.userPic
                : defaultAvatar
            }
            alt="Avatar"
          />
          <span>{selectedUserDetails.userName}</span>
        </div>
      )}
      <div className="conversation" id="conversation">
        {messages.length > 0 &&
          messages.map((msg, index) => (
            <div key={index}>
              <div
                className={
                  msg.senderId === auth.currentUser.uid
                    ? "yourMessages"
                    : "otherMessage"
                }
              >
                <div className="chatMessage">
                  <span className="message-content">{msg.content}</span>
                  <span className="message-timing">
                    {new Date(msg.timestamp.seconds * 1000).getHours()}:
                    {new Date(msg.timestamp.seconds * 1000).getMinutes()}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      {inputOptions && (
        <div className="messageOptionsListWrapper">
          <ul className="messageOptionsList">
            <li
              onClick={() => {
                setInputOptions((prev) => !prev);
                setRotation((prev) => prev + 45);
              }}
            >
              <FaImages />
              Img
            </li>
            <li
              onClick={() => {
                setInputOptions((prev) => !prev);
                setRotation((prev) => prev + 45);
              }}
            >
              <IoDocumentText />
              Doc
            </li>
          </ul>
        </div>
      )}
      {selectedChat && (
        <div className="sendMessage">
          <form onSubmit={sendMessage}>
            <motion.button
              type="button"
              className="message-options"
              onClick={() => {
                setInputOptions((prev) => !prev);
                setRotation((prev) => prev + 45);
              }}
              initial={{ rotate: "0deg" }}
              animate={{ rotate: `${rotation}deg` }}
            >
              <IoMdAdd />
            </motion.button>
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="sendMessageButton">
              <IoSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
