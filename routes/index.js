
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

/*
 * GET login page.
 */

exports.login = function(req, res){
  res.render('index', { title: 'Express' })
};

/*
 * GET user page.
 */

exports.user = function (req, res) {
	res.render('user', { title: 'USER', uName: req.user.username });
};
