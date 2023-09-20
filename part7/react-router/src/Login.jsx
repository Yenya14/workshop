import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

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
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="username" name="username" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            submit
          </Button>
        </div>
      </form>
    </>
  );
};
export default Login;