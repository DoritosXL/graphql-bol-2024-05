export function getToken(req) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  return token;
}

export async function tradeTokenForUser(token) {
  // Plugin external auth library like Passport.js

  if (token !== '12345') {
    return null;
  }

  return { id: 2, username: 'Bo', role: 'ADMIN' };
}