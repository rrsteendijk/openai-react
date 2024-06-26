require('dotenv').config(); // Voeg dit toe aan de top van je bestand om .env variabelen te laden

module.exports = {
    applicationId: process.env.APPLICATION_ID,
    applicationKey: process.env.APPLICATION_KEY,
    authCodeScope: process.env.AUTH_SCOPE,
    authEndpoint: process.env.AUTH_ENDPOINT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    configuredPort:  process.env.TOKEN_CONFIGURED_PORT,
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: { httpOnly: true, secure: true },
    instanceScheme: process.env.INSTANCE_SCHEME,
    instancePort: process.env.INSTANCE_PORT,
    instanceUrl: process.env.INSTANCE_URL,
    ltiSecret: process.env.LTI_SECRET,
    state: process.env.STATE,
    tokenEndpoint: process.env.TOKEN_ENDPOINT,
    apiVersion: process.env.API_VERSION
};
