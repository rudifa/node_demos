
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log('index...')
  res.render('index', { title: 'Express', more:'at your service' })
};

exports.test = function(req, res){
  console.log('test...')
  res.render('test', { title: 'Test', more:'for you' })
};