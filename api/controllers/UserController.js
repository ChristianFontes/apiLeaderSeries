var bcrypt = require('bcrypt');

module.exports = {

    login: function (req, res) {

        var email = req.body.email,
            password = req.body.password;

        if (!(email && password)) {
            return res.badRequest({ responseMsg: 'email_and_password_required' });
        }
        User.findOne({ email: email }).exec(function (err, user) {
            if (err) return res.serverError(err);
            if (!user) {
                return res.badRequest({ responseMsg: 'user_not_found' });
            }
            User.comparePassword(password, user, function (err, valid) {
                if (err) return res.serverError(err);
                if (!valid) return res.badRequest({ responseMsg: 'email_and_password_dont_match' });
                else
                    return res.ok({
                        user: user,
                        token: jwToken.issue({ id: user.id })
                    });

            });
        });
    },

    create: function (req, res) {
        var userObj = req.allParams();
        User.create(userObj, function (err, user) {
            if (err) {
                return res.negotiate(err);
            }
            if (user) {
                res.json(200, { user: user, token: jwToken.issue({ id: user.id }) });
            }
        })
    },

    checkExistence: function (req, res) {
        var email = req.body.email;
        console.log(email);
        if(!email) res.badRequest('Email field is mandatory');
        User.findOne({email:email}).exec(function (err, user) {
            if(err) return res.negotiate(err);
            if (!user) return res.notFound('user not found');
            return res.ok({ user });
        });
    },
};
