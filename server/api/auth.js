const token = 'asdfghjkl';

const login = (req, res) => {
  return setTimeout(async () => {
    await res.send(token);
  }, 1000);
}

const logout = (req, res) => {
  return setTimeout(async () => {
    await res.send('Successfully Logged Out!');
  }, 1000);
}

const me = (req, res) => {
  return setTimeout(async () => {
    await res.send({
      user: {
        id: 1,
        name: 'Jone Doe',
        email: 'jone@doe.com',
      }
    });
  }, 500);
}

module.exports = {
  login,
  logout,
  me,
}
