import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';


function createJwtToken(username) {
  return jwt.sign(
    { username }, 
    config.jwt.secretKey, 
    { expiresIn: config.jwt.expiresInSec }
  );
}

export async function login(req, res) {
  const { username, password } = req.body;

  //check if username is matched with admin username
  const user = await userRepository.checkByUsername(username);
  if (!user) {
    return res.status(401).json({ message: `Invalid user or password` });
  }

  //check if password is matched
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  //if everything was okay, create a token, send it to client
  const token = createJwtToken(user.username);
  //send cookie for web
  res.cookie('token', token, {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  });
  //send json for mobile
  res.status(200).json({ token });
}

//to check authorization
export async function me(req, res) {
  //check if user id is matched
  const user = await userRepository.checkByUsername(req.username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  //if there is the user, send a token
  res.status(200).json({ token: req.token  });
}