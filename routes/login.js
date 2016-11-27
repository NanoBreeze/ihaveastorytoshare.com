/**
 * Created by Lenny on 2016-11-25.
 */

module.exports = function(req, res) {
    console.log('inside login');
    // console.log('the value of req.session.hey is: ' + req.session.hey);
    res.render('login', {layout: 'main_public', redirectMessage: req.session.redirectMessage});
};

