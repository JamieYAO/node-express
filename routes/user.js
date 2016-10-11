
/*
 * GET user page.
 */

exports.user = function (req, res) {
	res.render('user', { title: 'USER', uName: req.user.username });
};
