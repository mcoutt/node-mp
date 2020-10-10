import UserController from "../controllers/user"
import { userSchema, validateSchema } from '../validator'

const userController = new UserController()

module.exports = function (router) {
    router.post('/user', validateSchema(userSchema), userController.createUser)
    router.get('/user/:suggest/:limit', userController.getAutoSuggestUsers)
    router.get('/user/:id', userController.getUser)
    router.get('/user-list', userController.getAllUsers)
    router.put('/user', userController.updateUser)
    router.delete('/user/:id', userController.deleteUser)
}
