import React from "react";
import { Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function ChatMessage(props) {
  const { text, photoURL, uid } = props.chat;

  const { currentUser } = useAuth();

  const justify =
    uid === currentUser.uid ? "flex-row-reverse" : "justify-content-left";
  const paragraf =
    uid === currentUser.uid ? "bg-primary text-light" : " bg-light text-dark";

  return (
    <div className={`d-flex align-items-end mt-3 ${justify}`}>
      <Image
        src={photoURL || process.env.PUBLIC_URL + "/unkown.png"}
        alt="ProfilePhoto"
        roundedCircle
        style={{ width: 30, height: 30 }}
      />
      <p
        className={`m-0 mx-2 px-4 py-2 ${paragraf}`}
        style={{ borderRadius: "20px" }}
      >
        {text}
      </p>
    </div>
  );
}
