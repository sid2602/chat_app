import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import firebase from "firebase/app";
import ChatMessage from "../components/ChatMessage";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import LinkButton from "./LinkButton";

export default function ChatRoom() {
  const { id } = useParams();
  const [firstLoad, setFirstLoad] = useState(true);
  const chatRef = firestore.collection(`chat${id}`);
  const query = chatRef.orderBy("createdAt");
  const scrollRef = useRef(null);
  const [chat] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const { currentUser } = useAuth();

  const sentMessage = (e) => {
    e.preventDefault();

    const { uid, photoURL } = currentUser;

    chatRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  useEffect(() => {
    if (chat) {
      if (firstLoad) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
        });
        setFirstLoad(false);
      } else if (currentUser.uid === chat[chat.length - 1].uid) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [chat, firstLoad, currentUser]);

  return (
    <Card className="position-relative ">
      <Card.Header>
        <LinkButton src="/" small={true}>
          Go back
        </LinkButton>
      </Card.Header>
      <Card.Body style={{ height: "70vh", overflowY: "scroll" }}>
        <div>
          {!chat ? (
            <Spinner
              animation="border"
              variant="primary"
              className="position-absolute"
              style={{
                left: "45%",
                top: "47%",
              }}
            />
          ) : (
            chat.map((item) => <ChatMessage key={item.id} chat={item} />)
          )}
        </div>
        <div ref={scrollRef}></div>
      </Card.Body>

      <Card.Footer>
        <Form className="d-flex" onSubmit={sentMessage}>
          <Form.Control
            placeholder="Enter message"
            type="text"
            onChange={(e) => setFormValue(e.target.value)}
            value={formValue}
            className="w-100"
          />

          <Button type="submit">Send</Button>
        </Form>
      </Card.Footer>
    </Card>
  );
}
