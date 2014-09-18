module.exports = function(user) {
  var users = {
    'staff': {
        username: 'csteele',
        password: 'password'
    }
  };
  return users[user];
};
