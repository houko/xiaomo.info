const allServices = require('../db/mysqlConfig');

let selfIntroduceService = {
    list: function () {
        let _sql = `select *
                    from self_introduce
                    where is_show = 1
                    order by sort desc;`;
        return allServices.query(_sql)
    }
};


module.exports = selfIntroduceService;