import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(event.target.username.value);
    navigate("/");
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" />
          <Button variant="primary" type="submit">
            submit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;