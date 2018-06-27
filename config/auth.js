// expose our config directly to our application using module.exports
module.exports = {
  // this user MUST have full access to all the room accounts
  exchange: {
    username: process.env.EMAIL,
    password: process.env.PASSWORD,
    uri: process.env.URI
  },
  // Ex: CONTOSO.COM, Contoso.com, Contoso.co.uk, etc.
  domain: process.env.DOMAIN
};
