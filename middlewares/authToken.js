const express = require('express');
const jwt = require('jsonwebtoken');

const privateRoutes = express.Router();

privateRoutes.use((req, res, next) => {
  const cookies = req.headers.cookie;
  console.log("ESTO ES HEADERS", req.headers);
  if (cookies) {
    const cookieArray = cookies.split("=");
    const token = cookieArray[1];

      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
          if (err) {
              return res.status(401).send({
                message: "User not authenticated"
              });
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
});


module.exports = privateRoutes;