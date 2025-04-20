/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const Group = require('../models/CreateNewGroup')

const getcreatedGroup = (request, response) => {
    return Group.find({})
        .then((group) => {
            const modifyData = group.map((item) => {
                return {
                    id: item.id,
                    newGroupName: item.groupName,
                    feedsInGroup: JSON.parse(item.feedsInGroups),
                }
            })
            const formatted = {
                success: true,
                message: 'Data successfully loaded',
                data: modifyData,
                errors: [],
            }
            response.send(formatted)
        })
        .catch((err) => {
            return response.send(err)
        })
}
// eslint-disable-next-line require-await
const createGroup = async (request, response) => {
    const member = await Group.create({
        id: Math.floor(1000 + Math.random() * 9000),
        groupName: request.body.newGroupName,
        feedsInGroups: JSON.stringify(request.body.feedsInGroup),
    })
    const save = member.save()
    if (save) {
        const group = {
            id: member.id,
            newGroupName: member.groupName,
            feedsInGroup: JSON.parse(member.feedsInGroups),
        }
        const formatted = {
            success: true,
            message: 'Successfully saved your group',
            data: group,
            errors: [],
        }
        response.send(formatted)
    } else {
        const formatted = {
            success: false,
            message: 'Something is wrong. please try again later.!!',
            data: {},
            errors: [],
        }
        response.send(formatted)
    }
}


const getSingleGroup = async (request, response) => {
    const searchItem = await Group.findOne({
        id: request.params.id,
    })
    if (searchItem !== null) {
        const modifyData = {
            id: searchItem.id,
            newGroupName: searchItem.groupName,
            feedsInGroup: JSON.parse(searchItem.feedsInGroups),
        }
        const formatted = {
            success: true,
            message: 'Data Successfully loaded',
            data: modifyData,
            errors: [],
        }
        response.send(formatted)
    } else {
        const formatted = {
            success: false,
            message: 'Not Found',
            data: {},
            errors: [],
        }
        response.send(formatted)
    }
}

const updateGroup = async (request, response) => {
    if (request.body) {
        const formatted = {
            success: true,
            message: 'Successfully update your group',
            data: request.body,
            errors: [],
        }
        response.send(formatted)
    } else {
        const formatted = {
            success: false,
            message: 'Something is wrong. please try again later.!!',
            data: {},
            errors: [],
        }
        response.send(formatted)
    }
}

const deleteSelectedGroup = async (request, response) => {
    const searchItem = await Group.deleteOne({
        id: request.params.id,
    })
    if (searchItem !== null) {
        const formatted = {
            success: true,
            message: 'Successfully group deleted',
            data: {},
            errors: [],
        }
        response.send(formatted)
    } else {
        const formatted = {
            success: false,
            message: 'Something is wrong please try again later!!',
            data: {},
            errors: [],
        }
        response.send(formatted)
    }
}

module.exports = {
    // getSavedAlertSearches,
    // saveAlertSearch,
    // getSingleAlert,
    // updateAlertSearch,
    // deleteAlertSearch,
    // updateStatus,
    createGroup,
    getcreatedGroup,
    updateGroup,
    getSingleGroup,
    deleteSelectedGroup,
}
