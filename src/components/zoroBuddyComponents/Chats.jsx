import React, { useEffect, useState } from "react";
import defaultAvatar from "../../assets/default.jpg";
import "../userProfileServices/ZoroBuddy.css";
import { db, auth } from "../../index";
import {
  getDocs,
  doc,
  collection,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";

const Chats = ({ setUsersDetailsArray, setSelectedChat, setChattingWith }) => {
  const [loading, setLoading] = useState(false);
  const [chatsArray, setChatsArray] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const chats = [];
      const querySnapshot = await getDocs(
        collection(db, "users", `all users`, "userDetails")
      );

      if (querySnapshot.empty) {
        console.log("No documents found");
        setDataNotFound(true);
      } else {
        setDataNotFound(false);
        querySnapshot.forEach((doc) => {
          chats.push(doc.data());
          console.log(doc.id, "=>", doc.data());
        });
        console.log("ALLuserDetailsArray :", chats);
        const chatsNeeded = chats.filter(
          (item) => item.uid != auth.currentUser.uid
        );
        const currentUserDetails = chats.filter(
          (item) => item.uid == auth.currentUser.uid
        );
        setUsersDetailsArray(currentUserDetails);
        console.log("NEEDEDuserDetailsArray :", chatsNeeded);
        setChatsArray(chatsNeeded);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching documents: ", error);
    }
  };

  // function to check if a chat already exists with a specific user
  const checkChatExists = async (otherUserID) => {
    try {
      const currentUserID = auth.currentUser.uid;
      const chatId =
        currentUserID < otherUserID
          ? `${currentUserID}_${otherUserID}`
          : `${otherUserID}_${currentUserID}`;

      const chatDocRef = doc(db, "userChats", chatId);
      const chatDocSnapshot = await getDoc(chatDocRef);

      if (chatDocSnapshot.exists()) {
        // chat exists between the users
        console.log("Chat exists with user:", otherUserID);
        // set the selected chat ID
        // setSelectedChat(chatId);
        localStorage.setItem("chatID", chatId);
      } else {
        // chat does not exist, create a new chat
        console.log(
          "Chat does not exist, creating a new chat with user:",
          otherUserID
        );
        await setDoc(chatDocRef, {});
        // set the selected chat ID
        localStorage.setItem("chatID", chatId);
        // setSelectedChat(chatId);
      }
    } catch (error) {
      console.log("Error checking chat existence: ", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="zoroChats">
      {!dataNotFound &&
        chatsArray.map((user, index) => (
          <div
            className="userChat"
            key={index}
            onClick={() => {
              checkChatExists(user.uid);
              localStorage.setItem("chattingWith", user.name);
            }}
          >
            <img src={user.photoURL} />
            <div className="userChatInfo">
              <span>{user.name}</span>
              <p>Hello</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
