import axios from 'axios';
export const loginUser = async (email, password) => {
  // make a request to backend
  const response = await axios.post('/login', { email, password });
  const { data } = response;
  console.log(data)
  /*
    {email: "test@test.com", password: "123456", success: true}
  */
}
