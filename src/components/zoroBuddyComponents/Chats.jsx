import React, { useEffect, useState } from "react";
import defaultAvatar from "../../assets/default.jpg";
import "../userProfileServices/ZoroBuddy.css";
import { db, auth, storage } from "../../index";
import { getDocs, doc, collection, getDoc, setDoc } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Chats = ({
  setUsersDetailsArray,
  setSelectedChat,
  searchUser,
  setSelectedUserPic,
}) => {
  const [loading, setLoading] = useState(false);
  const [chatsArray, setChatsArray] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [avatarList, setAvatarList] = useState([]);

  console.log(searchUser);

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

        // localStorage.setItem("chatID", chatId);
        if (typeof setSelectedChat === "function") {
          setSelectedChat(chatId);
        } else {
          console.error("setSelectedChat is not a function");
        }
      } else {
        // chat does not exist, create a new chat
        console.log(
          "Chat does not exist, creating a new chat with user:",
          otherUserID
        );
        await setDoc(chatDocRef, {});

        // localStorage.setItem("chatID", chatId);
        if (typeof setSelectedChat === "function") {
          setSelectedChat(chatId);
        } else {
          console.error("setSelectedChat is not a function");
        }
      }
    } catch (error) {
      console.log("Error checking chat existence: ", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // function for fetching avatars from storage
  const fetchAvatars = async () => {
    const listRef = ref(storage);
    const res = await listAll(listRef);
    const storageData = [];
    for (let item of res.items) {
      const uid = item.name.split(".")[0];
      const url = await getDownloadURL(item);
      storageData[uid] = url;
    }
    console.log("STORAGE DATA IS : ", storageData);
    setAvatarList(storageData);
    const navAvatar = storageData[auth.currentUser.uid];
    localStorage.setItem("navAvatar", navAvatar);
  };

  useEffect(() => {
    fetchAvatars();
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
              // localStorage.setItem("chattingWith", user.name);
              // localStorage.setItem("selectedUserPic", avatarList[user.uid]);
              localStorage.setItem(
                "selectedUserDetails",
                JSON.stringify({
                  userName: user.name,
                  userPic: avatarList[user.uid],
                })
              );
            }}
          >
            <img
              src={avatarList[user.uid] ? avatarList[user.uid] : defaultAvatar}
              alt="img"
            />
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
