import {Container, Inject, Service} from 'typedi';

const {Sequelize} = require('sequelize')
const Op = Sequelize.Op;

@Service()
export default class UserService {

    @Inject('userModel') userModel
    @Inject('groupModel') groupModel

    // userModel = Container.get('userModel')
    // groupModel = Container.get('groupModel')
    // usersGroupsModel = Container.get('usersGroupsModel')

    createUser = async (user) => {
        const exist = await this.getUser(user.id)
        if (exist) {
            if (exist.id === user.id) {
                return {
                    data: "User with this login exist. Please choose another login name.."
                }
            }
        }
        await this.userModel.create(user)
    }

    getUser = async (user) => {
        try {
            return this.userModel.findByPk(
                user, {
                    include: [
                        {
                            model: this.groupModel,
                            as: 'groups'
                        }]
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    getUserById = async (id) => {
        try {
            return this.userModel.findByPk(id)
        } catch (e) {
            console.log(e)
        }
    }

    getSuggestUser = async (login, limit) => {
        try {
            return this.userModel.findAll({
                where: {
                    login: {
                        [Op.like]: `%${login}%`
                    }
                },
                limit: limit
            });
        } catch (e) {
            console.log(e)
        }
    }

    updateUser = async (user) => {
        try {
            return this.userModel.update(
                {...user},
                {where: {id: user.id}})
        } catch (e) {
            console.log(e)
        }
    }

    deleteUser = async (user) => {
        const exist = await this.getUserById(user)
        if (!exist) {
            return {
                data: "User doesn't exist. Please choose another user id.."
            }
        }
        await this.usersGroupsModel.destroy({where: {user_id: user}})
        const updated = await this.userModel.update(
            {isDeleted: true},
            {where: {id: user}}
        )
        return updated[0]
    }

    getUsers = async () => {
        try {
            return this.userModel.findAll()
        } catch (e) {
            console.log(e)
        }
    }

};
