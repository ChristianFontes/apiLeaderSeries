var bcrypt = require('bcrypt');

module.exports = {

    attributes: {
        username: {
            type: 'string',
            required: 'true',
            unique: true
        },
        email: {
            type: 'email',
            required: 'true',
            unique: true
        },
        password: {
            type: 'string',
            required: 'true'
        },
        avatar: {
            type: 'string'
        },
        deviceToken: {
            type: 'string'
        },
        series: {
          collection: 'series',
          via: 'owners',
          dominant: true
        },
        progressSeries: {
          collection: 'progressSeries',
          via: 'owners',
          dominant: true
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },

    beforeUpdate: function (values, next) {
        if(!values.password){
          return next(null, values);
        }else{
            bcrypt.genSalt(10, function (err, salt) {
                if (err) return next(err);
                bcrypt.hash(values.password, salt, function (err, hash) {
                    if (err) return next(err);
                    values.password = hash;
                    next();
                })
            })
        }
    },

    // Encriptar Password antes de Guardar en la BD.
    beforeCreate: function (values, next) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(values.password, salt, function (err, hash) {
                if (err) return next(err);
                values.password = hash;
                next();
            })
        })
    },

    comparePassword: function (password, user, cb) {
        bcrypt.compare(password, user.password, function (err, match) {
            if (err) cb(err);
            if (match) {
                cb(null, true);
            } else {
                cb(err);
            }
        })
    },
    ,
    seedData:[
      {
        username: 'Guest',
        email:'guest@email.com',
        password:'123456',
        avatar: './img/avatar5.png'
      },
      {
        username: 'christianf',
        email:'christianfontes82@gmail.com',
        password:'qqqqqq',
        avatar: 'Daniel'
      },
      {
        username: 'dummie',
        email:'dummie@gmail.com',
        password:'qqqqqq',
        avatar: 'Daniel'
      }
    ]
};

