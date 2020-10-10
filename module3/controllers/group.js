import { Container } from 'typedi';
import { Permission } from "../db/config/constants";

const logs = (serviceMethod, args) => {
    return console.log(`Invoked ${serviceMethod} method of Group Service with ${args} args`)
}

const createGroup = async (req, res) => {
    logs('Create', req.body)
    const groupService = await Container.get('GroupService')
    const group = {
        name: req.body.name,
        permissions: req.body.permissions,
    }
    group.permissions.forEach(item => {
        if (Permission.indexOf(item) === -1) {
            res.status(400).json("Permission item doesn't exist in enums = 'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'")
        }
    })
    groupService.createGroup(group)
        .then(serviceRes => {
            if (!serviceRes) {
                res.status(200).json(group)
            } else {
                res.status(400).json(serviceRes.data)
            }
        })
        .catch(e => {
            console.log(e)
        })
}


const updateGroup = async (req, res) => {
    logs('Update', req.body)
    if (req.body.id) {
        const groupService = await Container.get('GroupService')
        const getGroup = await groupService.getGroupById(req.body.id)
        if (getGroup.id) {
            let group = {}
            group.id = getGroup.id
            group.name = req.body.name ? req.body.name : getGroup.name;
            group.permissions = req.body.permissions ? req.body.permissions : getGroup.permissions;

            groupService.updateGroup(group)
            res.status(200).json(group)
        } else {
            res.status(404).json('Group not found')
        }
    } else {
        res.status(400).json('Id not valid')
    }
}


const deleteGroup = async (req, res) => {
    logs('Delete', req.params)
    const groupService = await Container.get('GroupService')
    if (req.params.id) {
        groupService.deleteGroup(req.params.id)
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

const getGroup = async (req, res) => {
    logs('Get Group', req.params)
    const groupService = await Container.get('GroupService')
    if (req.params.id) {
        const group = await groupService.getGroupById(req.params.id)
        if (group) {
            res.status(200).json(group)
        } else {
            res.status(404).json('Group not found')
        }
    } else {
        res.status(400).json('Login not valid')
    }
}

const getAllGroups = async (req, res) => {
    logs('Get All Groups', 'without')
    const groupService = await Container.get('GroupService')
    res.status(200).json(await groupService.getGroups())
}


const addUserToGroup = async (req, res) => {
    logs('Add User To Group', req.body)
    const groupId = req.body.groupId
    const userIds = req.body.userIds

    if (userIds && groupId) {
        const groupService = await Container.get('GroupService')
        await groupService.addUsersToGroup(groupId, userIds)
        const group = await groupService.getGroupById(groupId)
        if (group) {
            res.status(200).json(group)
        } else {
            res.status(404).json(" doesn't exist")
        }
    } else {
        res.status(400).json('Group Id and/or User Ids not provided')
    }
}


const delUserFromGroup = async (req, res) => {
    logs('Del User From Group', req.body)
    const groupId = req.body.groupId
    const userId = req.body.userId

    if (userId && groupId) {
        const groupService = await Container.get('GroupService')
        const created = await groupService.delUserFromGroup(groupId, userId)
        const group = await groupService.getGroupById(groupId)
        if (created.group_id && group) {
            res.status(200).json(group)
        } else {
            res.status(404).json(" doesn't exist")
        }
    } else {
        res.status(400).json('Group Id and/or User Ids not provided')
    }
}


module.exports = {
    createGroup,
    updateGroup,
    getAllGroups,
    getGroup,
    deleteGroup,
    addUserToGroup,
    delUserFromGroup
}