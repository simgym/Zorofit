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
import { useSelector } from "react-redux";
import "../userProfileServices/ZoroBuddy.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const selectedChat = localStorage.getItem("chatID");
  const chattingWith = localStorage.getItem("chattingWith");
  console.log(
    auth.currentUser.displayName,
    " is chatting with : ",
    chattingWith
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
      await addDoc(newMessageRef, {
        senderId: auth.currentUser.uid,
        receiverId: selectedChat,
        content: message,
        timestamp: new Date(),
      });

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="zoro-chat">
      <div className="convo-header">
        <span>{chattingWith}</span>
      </div>
      <div className="conversation">
        {messages &&
          messages.map((msg, index) => (
            <div key={index}>
              <p
                className={
                  msg.senderId === auth.currentUser.uid
                    ? "yourMessages"
                    : "otherMessage "
                }
              >
                <p className="chatMessage">{msg.content}</p>
              </p>
            </div>
          ))}
        {!messages && <p>NO MESSAGES</p>}
      </div>
      <div className="sendMessage">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
