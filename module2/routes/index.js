import {
    createUser,
    updateUser,
    getUser,
    getAllUsers,
    deleteUser,
    getAutoSuggestUsers
} from "../controllers/user"
import { userSchema, validateSchema } from '../validator'


module.exports = function (router) {
    router.post('/user', validateSchema(userSchema), createUser)
    router.get('/users', getAllUsers)
    router.get('/user', getAutoSuggestUsers)
    router.get('/user/:id', getUser)
    router.put('/user/:id', updateUser)
    router.delete('/user/:id', deleteUser)
}
