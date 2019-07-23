const { AccessToken } = require('../../conn/sqldb/auth');
const { User } = require('../../conn/sqldb');

const attributes = [
  'id', 'email', 'name', 'mobile', 'client_id',
];

const oAuthModel = {
  getAccessToken(bearerToken, callback) {
    console.log(bearerToken)
    return AccessToken
      .findOne({
        where: { access_token: bearerToken.replace('h-', '') },
        attributes: ['access_token', 'expires', 'session_id', 'app_id', 'user_id'],
        raw: true,
      })
      .then((t) => {
        const token = t;
        console.log('token ', t)
        if (!token) return callback(null, false);

        return User.findByPk(token.user_id, {
            attributes,
            raw: true,
          })
          .then((user) => {
            token.user = user;
            delete token.User;
            callback(null, token);
            return token;
          });
      })
      .catch(callback);
  },
};

module.exports = oAuthModel;
