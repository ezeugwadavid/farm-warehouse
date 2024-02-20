import axios from 'axios';

export const registerUser = async(data) => {
  const result = await axios.post("https://fwh-backend.vercel.app/api/users/signup", data);
//   console.log(result)
  return result;
    // .then((response) => {
    //   return response;
    // })
    // .catch(function (error) {
    //   console.log(error.response.data.message);
    // });
};

