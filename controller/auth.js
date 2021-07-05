import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/auth.js';

function createJwtToken(id) {
  return jwt.sign(
    { id }, 
    "F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z", 
    { expiresIn: 86400 }
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
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

//to check authorization
export async function me(req, res) {
  //check if user id is matched
  const user = await userRepository.checkById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  //if there is the user, send a token and username
  res.status(200).json({ token: req.token, username: user.username });
}