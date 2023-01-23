import axios from "axios";

const login = async (formData) => {
  const res = await axios.post("http://localhost:8000/userLogin", formData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

const signUp = async (formData) => {
  const res = await axios.post("http://localhost:8000/registerUser", formData);
  console.log(res.data);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

const logout = async () => {
  const res = await axios.get("http://localhost:8000/logout");
  console.log(res.data);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const checkAuth = async () => {
  const authItem = localStorage.getItem("token");
  if (authItem) {
    const authResponse = await axios.post("http://localhost:8000/check", {
      token: authItem,
    });
    return authResponse.data.isLoggidIn;
  }
  return null;
};
const passwordReset = async (formData) => {
  const res = await axios.post("http://localhost:8000/resetPassword", formData);
  console.log(res.data);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

const emailValidate = async (email) => {
  const res = await axios.post("http://localhost:8000/emailValidate", {
    email: email,
  });
  return res;
};

const userActions = {
  signUp,
  login,
  logout,
  checkAuth,
  passwordReset,
  emailValidate,
};
export default userActions;
