const allServices = require('../db/mysqlConfig');

let abilityService = {
    list: function () {
        let _sql = `select *
                    from ability
                    where is_show = 1
                    order by sort desc;`;
        return allServices.query(_sql)
    }
};


module.exports = abilityService;