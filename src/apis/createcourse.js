require('dotenv').config(); // Laadt .env variabelen

const configs = require('../configurations'),
      helpers = require('../helpers'),
      request = require('superagent'),
      express = require('express'),
      router = express.Router();

module.exports = function () { // Verwijder 'appContext' als het niet gebruikt wordt

    /* POST /createcourse
     * Creëert een nieuwe cursus met de opgegeven eigenschappen.
     */
    router.post('/createcourse', function (req, res) {
        const apiPath = `/d2l/api/lp/${configs.apiVersion}/courses/`; // Zorg dat 'apiVersion' correct is ingesteld in je 'configurations'
        const accessToken = process.env.ACCESS_TOKEN;
        const courseData = {
            "Name": req.body.Name,
            "Code": req.body.Code,
            "Path": req.body.Path,
            "CourseTemplateId": req.body.CourseTemplateId,
            "SemesterId": req.body.SemesterId,
            "StartDate": req.body.StartDate,
            "EndDate": req.body.EndDate,
            "LocaleId": req.body.LocaleId,
            "ForceLocale": req.body.ForceLocale,
            "ShowAddressBook": req.body.ShowAddressBook,
            "Description": req.body.Description,
            "CanSelfRegister": req.body.CanSelfRegister
        };

        if (accessToken) {
            console.log('Attempting to create a course with provided data.');
            const createCourseRoute = helpers.createUrl(apiPath, configs);
            request
                .post(createCourseRoute)
                .send(courseData) // Stuurt de cursusgegevens als JSON-body
                .set('Authorization', `Bearer ${accessToken}`)
                .set('Content-Type', 'application/json')
                .end(function(error, response) {
                    if (error) {
                        console.log('Error creating course', error);
                        res.status(500).send({ error: error });
                    } else if (response.statusCode !== 200) {
                        res.status(response.statusCode).send(response.error);
                    } else {
                        res.status(200).send(response.body);
                    }
                });
        } else {
            console.log('No access token provided.');
            res.status(401).send('Authentication required'); // Verstuurt een 401 Unauthorized status als er geen accessToken is
        }
    });

    return router;
};
