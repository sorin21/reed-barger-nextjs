const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';

const AUTH_USER_TYPE = "authenticated";
const COOKIE_SECRET = 'ddsakjh934isadhjkas87j';
const COOKIE_OPTIONS = {
  // ensure that cookies are for only domains
  httpOnly: true,
  // cookie is set only for https
  secure: !dev,
  signed: true
}

const authenticate = async (email, password) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  // from this users array find the given user 
  return data.find(user => {
    if (user.email === email && user.website === password) {
      return user;
    }
  })
}

const port = process.env.PORT || 3000;
const app = next({ dev });
// let next handle all the requests
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // initialize express
  const server = express();

  // in order to tell express how to handle the json data that's comming, 
  // in order to parse it, we need a middleware
  // from express we have json method in this direction
  // before we used bodyParser()
  server.use(express.json());
  // another middleware
  // if we want to provide signed cookies
  server.use(cookieParser(COOKIE_SECRET));

  server.post('/login', async (req, res) => {
    // take the data from body
    const { email, password } = req.body;
    // send back to our client json data
    // res.json({ email, password, success: true })
    const user = await authenticate(email, password);

    if (!user) {
      // if we don't have a user, return a status code, that the credentials are not correct
      return res.status(403).send("Invalid email or password");
    }
    // otherwise if we get back a user
    const userData = {
      name: user.name,
      email: user.email,
      // this will be passed to all our user data, for user that are authenticated
      // this is good if you want to separe authenticated users from admin
      type: AUTH_USER_TYPE
    }
    // we want to store the user session as a cookie
    // 1st arg is the name, 2nd is the value, 3rd is options obj
    res.cookie('token', userData, COOKIE_OPTIONS)
    res.json(userData);

  })

  server.get('/profile', async (req, res) => {
    // from req we can get auth cookie
    // is possible to not have signedCookie, if someone who not auth will 
    // make a req to this profile route, so we give a default value {}
    const { signedCookies = {} } = req;
    const { token } = signedCookies;

    if (token && token.email) {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
      const userProfile = data.find(user => (user.email === token.email));
      return res.json({ user: userProfile });
    }
    // if there is no token
    res.sendStatus(404);
  })


  // .get is our route method
  // here we provide the default behavior of the next server:
  // for any get request, to any route, we will handle with getRequestHandler()
  server.get('*', (req, res) => {
    return handle(req, res);
  })

  // start the express server
  server.listen(port, (error) => {
    if (error) throw error;
    console.log(`Listening on PORT ${port}`);
  });
})