const express = require('express');
const fs = require('fs');
const router = express.Router();



router.post('/text', (req, res) => {
    let data = req.body.message;

    fs.writeFile('editor.txt', data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('The file was saved!');
    });

    res.end();
});

module.exports = router;

