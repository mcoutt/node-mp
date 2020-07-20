import { Container } from 'typedi';

const logs = (serviceMethod, args) => {
    console.log(`Invoked ${serviceMethod} method of User Service with ${args} args`)
}

const userService = await Container.get('UserService')

const createUser = async (req, res) => {
    logs('Create', req.body)
    const User = {
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: false
    }
    userService.createUser(User)
        .then(serviceRes => {
            if (!serviceRes) {
                res.status(200).json(User)
            } else {
                res.status(400).json(serviceRes.data)
            }
        })
        .catch(e => {
            console.log(e)
        })
}


const updateUser = async (req, res) => {
    logs('Update', req.body)
    if (req.body.id) {
        const userService = await Container.get('UserService')
        const getUser = await userService.getUserById(req.body.id)
        if (getUser.id) {
            let user = {}
            user.id = getUser.id
            user.login = req.body.login ? req.body.login : getUser.login;
            user.password = req.body.password ? req.body.password : getUser.password;
            user.age = req.body.age ? req.body.age : getUser.age;
            user.isDeleted = req.body.isDeleted === false ? req.body.isDeleted : getUser.isDeleted;

            userService.updateUser(user)
            res.status(200).json(user)
        } else {
            res.status(404).json('User not found')
        }
    } else {
        res.status(400).json('Id not valid')
    }
}


const deleteUser = async (req, res) => {
    logs('Delete', req.params)
    const userService = await Container.get('UserService')
    if (req.params.id) {
        userService.deleteUser(req.params.id)
            .then(response =>{
                if (response === 1) {
                    res.status(200).json([])
                } else {
                    res.status(404).json(response)
                }
            })
    } else {
        res.status(400).json('Id not sent')
    }
}

const getUser = async (req, res) => {
    logs('Get User', req.params)
    const userService = await Container.get('UserService')
    if (req.params.id) {
        const user = await userService.getUser(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json('User not found')
        }
    } else {
        res.status(400).json('Login not valid')
    }
}

const getAllUsers = async (req, res) => {
    console.log(`Invoked serviceMethod} method of User Service with args} args`)
    // logs('Get All Users', 'without')
    const userService = await Container.get('UserService')
    res.status(200).json(await userService.getUsers())
}


const getAutoSuggestUsers = async (req, res) => {
    logs('Get Auto Suggest Users', req.params)
    const loginSubstring = req.params.suggest
    const limit = req.params.limit
    const num = parseInt(limit, 10)

    if (loginSubstring && limit) {
        const userService = await Container.get('UserService')
        const exists = await userService.getSuggestUser(loginSubstring, num)
        if (exists.length > 0) {
            res.status(200).json(exists)
        } else {
            res.status(404).json("Substring in logins doesn't exist")
        }
    } else {
        res.status(400).json('Login substring and/or valid not provided')
    }
}

module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,
    getAutoSuggestUsers
}