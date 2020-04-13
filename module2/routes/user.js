import {
    createUser,
    updateUser,
    getUser,
    getAllUsers,
    deleteUser,
    getAutoSuggestUsers
} from "../controllers/user"
import { userSchema, validateSchema } from '../validator'


export default (router) => {
    router.post('/user', validateSchema(userSchema), createUser)
    router.get('/users', getAllUsers)
    router.get('/user', getAutoSuggestUsers)
    router.get('/user/:id', getUser)
    router.put('/user', updateUser)
    router.delete('/user/:id', deleteUser)
}