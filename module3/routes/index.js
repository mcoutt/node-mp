import UserRouter from "./user"
import GroupRouter from "./group"


module.exports = function (router) {
    UserRouter(router)
    GroupRouter(router)
};
