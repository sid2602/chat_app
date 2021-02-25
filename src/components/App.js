import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import LogIn from "./Login";
import ForgotPassword from "./ForgotPassword";
import ChatRoom from "./ChatRoom";
function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/chatRoom/:id" component={ChatRoom} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
