import axios from 'axios';

export const registerUser = async(data) => {
  const result = await axios.post("http://fwh-backend.vercel.app/api/users/signup", data);
  return result;
};

