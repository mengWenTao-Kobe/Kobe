var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.send('test serve is running')
})

module.exports = router;
