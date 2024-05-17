require('dotenv').config(); // Laadt .env variabelen

const configs = require('../configurations'),
      helpers = require('../helpers'),
      request = require('superagent'),
      express = require('express'),
      router = express.Router();

module.exports = function () { // Verwijder 'appContext' als het niet gebruikt wordt

    /* GET /whoami
     * Returns the who am I information based on the currently authenticated user.
     */
    router.get('/whoami', function (req, res) {
        const apiPath = '/d2l/api/lp/1.9/users/whoami';
        const accessToken = process.env.ACCESS_TOKEN;
        if (accessToken) {
            console.log('Attempting to make the who am I call using OAuth 2.0 authentication.');
            const whoamiRoute = helpers.createUrl(apiPath, configs);
            request
                .get(whoamiRoute)
                .set('Authorization', `Bearer ${accessToken}`)
                .end(function(error, response) {
                    if (error) {
                        console.log('Error calling the who am I route', error);
                        res.status(500).send({ error: error });
                    } else if(response.statusCode !== 200) {
                        res.status(response.statusCode).send(response.error);
                    } else {
                        res.status(200).send(response.text);
                    }
                });
        } else {
            console.log('No access token provided.');
            res.status(401).send('Authentication required'); // Verstuurt een 401 Unauthorized status als er geen accessToken is
        }
    });

    return router;
};
