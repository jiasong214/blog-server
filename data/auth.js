import { config } from '../config.js';

let admin = {
  username: config.admin.username,
  password: config.admin.password,
};

export async function checkByUsername(username) {
  if(username === admin.username) return admin;
}