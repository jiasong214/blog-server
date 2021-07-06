let admin = {
  id: '1',
  username: 'jia',
  password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
  // abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
};

export async function checkByUsername(username) {
  if(username === admin.username) return admin;
}

export async function checkById(id) {
  if(parseInt(id) === parseInt(admin.id)) return admin;
}