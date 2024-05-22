import { getToken, tradeTokenForUser } from './authHelpers.js';
import db from './db.js';

export default async (req) => {
  let token = null;
  let currentUser = null;

  try {
    token = getToken(req);
    currentUser = await tradeTokenForUser(token);
    console.log(token, currentUser);
  } catch (err) {
    console.error(`Unable to authenticate using auth token: ${token}.`);
  }

  return { token, currentUser, db };
};