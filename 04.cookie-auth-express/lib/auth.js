import axios from 'axios';

// to tell it that will pass it to this cookie data
axios.defaults.withCredentials = true;
const WINDOW_USER_SCRIPT_VARIABLE = '__USER__';
// CSR
export const loginUser = async (email, password) => {
  // make a request to backend and send data emai, password
  const response = await axios.post('/login', { email, password });
  const { data } = response;
  console.log(data)
  /*
    {email: "test@test.com", password: "123456", success: true}
  */
  // if we are on SSR window will be undefined
  if (typeof window !== undefined) {
    window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
  }
}

// CSR
export const getUserProfile = async () => {
  const { data } = await axios.get("/profile");
  return data;
};

// SSR
// export const getServerSideToken = (req) => {
//   const { signedCookies = {} } = req;

//   if (!signedCookies) {
//     return {};
//   } else if (!signedCookies.token) {
//     return {};
//   }

//   return { user: signedCookies.token }
// }
export const getServerSideToken = req => {
  if (req === undefined) {
    return {};
  } else {
    const { signedCookies = {} } = req;

    if (!signedCookies) {
      return {};
    } else if (!signedCookies.token) {
      return {};
    }

    return { user: signedCookies.token };
  }
};

// CSR
export const getClientSideToken = () => {
  if (typeof window !== 'undefined') {
    // get the userData saved in window
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};

    return { user };
  }
  // if we are on server for some reason
  return { user: {} };
}


// the purpose of this HOF is how we should get our token
export const authInitialProps = () => ({ req }) => {
  // check if there is a request: is comming from server or client
  /*
    -if the page loads (or reloads), we are going to be sent user data from the server (getInitialProps will be executed on the server). However, if we go from one page to another (using the history API), getInitialProps will run on the client.
  */
  const auth = req ? getServerSideToken(req) : getClientSideToken;
  return { auth };
}

export const getUserScript = (user) => {
  // we add to window object this variable having the user data
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
}
