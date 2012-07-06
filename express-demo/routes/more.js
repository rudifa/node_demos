
/*
 * GET test page.
 */

exports.more = function(req, res){
  console.log('more...')
  res.render('test', { title: 'MoreTest', more:'even more tests for you' })
};