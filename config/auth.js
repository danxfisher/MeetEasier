// expose our config directly to our application using module.exports
module.exports = {
  // this user MUST have full access to all the room accounts
  'exchange' : {
    'username'  : process.env.USERNAME || 'SVCACCT_EMAIL@DOMAIN.COM',
    'password'  : process.env.PASSWORD || 'PASSWORD',
    'uri'       : 'https://outlook.office365.com/EWS/Exchange.asmx'
  },
  // Ex: CONTOSO.COM, Contoso.com, Contoso.co.uk, etc.
  'domain' : process.env.DOMAIN || 'DOMAIN.COM'
};
