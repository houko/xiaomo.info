const allServices = require('../db/query');

let concatService = {
    list: function () {
        let _sql = `select *
                    from concat
                    where is_show = 1
                    order by sort desc;`;
        return allServices.query(_sql)
    }
};


module.exports = concatService;