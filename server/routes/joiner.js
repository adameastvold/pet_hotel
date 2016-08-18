var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pet_hotel';

router.get('/', function(req, res) {
    //retrieve books from database
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('SELECT * FROM pets ' +
            'JOIN owners ON owners.id = pets.owner_id',
            function(err, result) {
                done(); //this will close the conneciton since you have grabbed the information form the database

                if (err) {
                    res.sendStatus(500);
                }

                console.log('this is whatever it is:', result.rows);
                res.send(result.rows);

            });
    });
});



module.exports = router;
