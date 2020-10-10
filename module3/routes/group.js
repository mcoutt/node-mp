import {
    createGroup,
    updateGroup,
    getGroup,
    getAllGroups,
    deleteGroup,
    addUserToGroup,
    delUserFromGroup
} from "../controllers/group"


module.exports = function (router) {
    router.post('/group', createGroup)
    router.get('/group/:id', getGroup)
    router.get('/groups', getAllGroups)
    router.put('/group', updateGroup)
    router.delete('/group/:id', deleteGroup)
    router.post('/assign-to-group', addUserToGroup)
    router.post('/del-from-group', delUserFromGroup)
}