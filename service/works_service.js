const allServices = require('../db/mysqlConfig');

let worksService = {
    list: function () {
        let _sql = `select *
                    from works
                    where is_show = 1
                    order by sort desc;`;
        return allServices.query(_sql)
    }
};


module.exports = worksService;