
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('Welcome');
});

// Dashboard
router.get('/dashboard', (req, res) =>
    res.render('dashboard', {
        // user: req.user
    })
);

module.exports = router;