import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';

//middleware to check authorization before return api results.
export const isAuth = async (req, res, next) => {
  //check if header include "Bearer ***"
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json({ message: 'Authentication Error' });
  }

  //if they have, extract token from header
  const token = authHeader.split(' ')[1];

  // veryfy token
  jwt.verify(
    token, 
    config.jwt.secretKey, 
    async (error, decoded) => {
      //check error
      if (error) res.status(401).json({ message: 'Authentication Error' });

      //check if user is exist
      const user = await userRepository.checkById(decoded.id);
      if (!user) res.status(401).json({ message: 'Authentication Error' });

      //if everything was okay, ???
      req.userId = user.id; // req.customData
      req.token = token;

      next();
    }
  );
};