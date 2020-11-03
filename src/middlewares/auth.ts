import { Request, Response, NextFunction } from 'express';

import config from '../config/config';

interface Req extends Request {
  id: string;
}

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (request: Req, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({ error: "No token provided" });
  }

  const token = authHeader;

  let jwtPayload;
  
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    response.locals.jwtPayload = jwtPayload;
  } catch (err) {
    console.log(err);
    return response.status(401).send();;
  }

  const { id, email } = jwtPayload;
  const newToken = jwt.sign({ id, email }, config.jwtSecret, {
    expiresIn: "1h"
  });
  response.setHeader("token", newToken);

  next();
};