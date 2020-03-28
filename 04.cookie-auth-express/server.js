const next = require('next');
const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
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
  server.use(express.json())

  server.post('/login', (req, res) => {
    // take the data from body
    const { email, password } = req.body;
    // send back to our client json data
    res.json({
      email,
      password,
      success: true
    })
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