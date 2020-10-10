import {Container} from 'typedi';
const db = require('../db/models/index')

export default class GroupService {

    userModel = Container.get('userModel')
    groupModel = Container.get('groupModel')
    usersGroupsModel = Container.get('usersGroupsModel')

    createGroup = async (group) => {
        const exist = await this.getGroup(group.name)
        if (exist) {
            if (exist.name === group.name) {
                return {
                    data: "Group with this name exist. Please choose another group's name.."
                }
            }
        }
        await this.groupModel.create(group)
    }

    getGroup = async (group) => {
        try {
            return this.groupModel.findOne({where: {name: group}})
        } catch (e) {
            console.log(e)
        }
    }

    getGroupById = async (id) => {
        try {
            return this.groupModel.findByPk(id, {
                include: [
                    {
                        model: this.userModel,
                        as: 'users'
                    }]
            })
        } catch (e) {
            console.log(e)
        }
    }

    addUsersToGroup = async (groupId, userIds) => {
        try {
            return db.sequelize.transaction(async t => {
                userIds.map(async userId => {
                    const item = {
                        user_id: userId,
                        group_id: groupId
                    }
                    await this.usersGroupsModel.create(item, {transaction: t, returning: true})
                });
            })
        } catch (e) {
            console.log(e)
        }
    }

    delUsersFromGroup = async (groupId, userId) => {
        try {
            const item = {
                user_id: userId,
                group_id: groupId
            }
            return await this.usersGroupsModel.destroy(item, {w: 1}, {returning: true})
        } catch (e) {
            console.log(e)
        }
    }

    updateGroup = async (group) => {
        try {
            return this.groupModel.update(
                {...group},
                {where: {id: group.id}})
        } catch (e) {
            console.log(e)
        }
    }

    deleteGroup = async (group) => {
        const exist = await this.getGroupById(group)
        if (!exist) {
            return {
                data: "Group doesn't exist. Please choose another group id.."
            }
        }
        return await this.groupModel.destroy(
            {where: {id: group}}
        )
    }

    getGroups = async () => {
        try {
            return this.groupModel.findAll({
                include: [
                    {
                        model: this.userModel,
                        as: 'users'
                    }]
            })
        } catch (e) {
            console.log(e)
        }
    }

};