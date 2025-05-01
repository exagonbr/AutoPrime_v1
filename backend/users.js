const bcrypt = require('bcrypt');

const users = [
  // This is a simple in-memory user store for demonstration.
  // In production, use a database.
  {
    id: 1,
    username: 'master',
    passwordHash: '', // to be set after hashing
    role: 'master',
  },
  {
    id: 2,
    username: 'professional',
    passwordHash: '', // to be set after hashing
    role: 'professional',
  },
];

// Hash passwords for the initial users
async function initializeUsers() {
  const masterPassword = 'masterpassword'; // Change to secure password
  const professionalPassword = 'professionalpassword'; // Change to secure password

  users[0].passwordHash = await bcrypt.hash(masterPassword, 10);
  users[1].passwordHash = await bcrypt.hash(professionalPassword, 10);
}

initializeUsers();

async function findUserByUsername(username) {
  return users.find((user) => user.username === username);
}

async function verifyUserCredentials(username, password) {
  const user = await findUserByUsername(username);
  if (!user) {
    return null;
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (match) {
    return { id: user.id, username: user.username, role: user.role };
  }
  return null;
}

module.exports = {
  users,
  findUserByUsername,
  verifyUserCredentials,
};
