
/*
 * GET login page.
 */

exports.login = function(req, res){
  res.render('index', { title: 'Express' })
};
