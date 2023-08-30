import axios from "axios";

const baseUrl = "/api/login";

const login = async (user) => {
  let loggedinUser = await axios.post(baseUrl, user);
  return loggedinUser.data;
};

const loggedIn = {login}

export default loggedIn;