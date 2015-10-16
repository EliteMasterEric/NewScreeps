/**
 * Methods involving creep roles.
 */

function getRole(name) {
    try {
        return require("creep_role_"+name)
    } catch (e) {
        return null
    }
}

function getRoleParts(name) {
    var r = getRole(name)
    if(r == null) {
        return null
    } else {
        return r.getParts()
    }
}

function getRoleCost() {
    var r = getRole(name)
    if(r == null) {
        return null
    } else {
        return r.getCost()
    }
}

function getCreepsWithRoleInRoom(role, room) {
    room.find(FIND_MY_CREEPS, {
       filter: function(creep) {
           return (creep.memory.role == role)
       }
    })
}

Creep.prototype.performRole = function() {
    getRole(this.memory.role).performRole(this)
}