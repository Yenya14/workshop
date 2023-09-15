import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(event.target.username.value);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <button>submit</button>
    </form>
  );
};

export default Login;