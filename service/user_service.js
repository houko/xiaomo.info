const allServices = require('../db/mysqlConfig');

let userService = {
    findAllUser: function () {
        let _sql = `select *
                    from users;`;
        return allServices.query(_sql)
    }, findUserData: function (name) {
        let _sql = `select * from users where name="${name}";`;
        return allServices.query(_sql)
    },
    addUserData: (obj) => {
        let _sql = "insert into users set name=?,pass=?,avatar=?;";
        return allServices.query(_sql, obj)
    },
};


module.exports = userService;