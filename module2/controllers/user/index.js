const {uuid} = require('uuidv4');
import Users from '../../models'
const _ = require('lodash');

const getOneUser = (id) => {
    return Users.find(u => u.id === id.toString())
}


const createUser = (req, res) => {
    const user = Users.find(u => u.login === req.body.login)
    if (!user) {
        let User = {
            id: uuid(),
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted: false
        }
        Users.push(User)
        res.status(200).json(User)
    } else {
        res.status(404).json({"error": "user exists"})
    }
}


const updateUser = (req, res) => {
    const user = getOneUser(req.params.id)
    if (user.id) {
        if (user) {
            user.login = req.body.login ? req.body.login : user.login;
            user.password = req.body.password ? req.body.password : user.password;
            user.age = req.body.age ? req.body.age : user.age;
            user.isDeleted = req.body.isDeleted ? req.body.isDeleted : user.isDeleted;

            res.status(200).json(user)
        } else {
            res.status(404).json('User not found')
        }
    } else {
        res.status(400).json('Id not valid')
    }
}


const deleteUser = (req, res) => {
    if (req.params.id) {
        const user = getOneUser(req.params.id)
        if (user) {
            user.isDeleted = true;
            res.status(200).json(user)
        } else {
            res.status(404).json('User not found')
        }
    } else {
        res.status(400).json('Id not valid')
    }
}

const getUser = (req, res) => {
    if (req.params.id) {
        const user = getOneUser(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json('User not found')
        }
    } else {
        res.status(400).json('Id not valid')
    }
}

const getAllUsers = (req, res) => {
    res.status(200).json(Users)
}


const getAutoSuggestUsers = (req, res) => {
    const loginSubstring = req.query.suggest
    const limit = req.query.limit

    if (loginSubstring && limit) {
        const filteredUsers = _.filter(Users, (user) => user.login.indexOf(loginSubstring) > -1)
        if (filteredUsers.length > 0) {
            const orderedUsers = _.orderBy(filteredUsers, ['login'], ['asc'])
            res.status(200).json(orderedUsers.splice(0, limit))
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
