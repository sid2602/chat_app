import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LinkButton from "./LinkButton";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { logOut } = useAuth();
  const history = useHistory();

  const handleLogOut = async () => {
    setError("");
    try {
      await logOut();
      history.push("/login");
    } catch {
      setError("can't logOut");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Select a chat room</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <LinkButton src="chatRoom/1">Chat room 1</LinkButton>
          <LinkButton src="chatRoom/2">Chat room 2</LinkButton>
          <LinkButton src="chatRoom/3">Chat room 3</LinkButton>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
}
