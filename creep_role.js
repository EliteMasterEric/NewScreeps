/**
 * A module for managing creep jobs.
 */

module.exports = function() {
    var creep_role = function() { }

    creep_role.getRole = function(name) {
        try {
            return require("creep_role_"+name)
        } catch (e) {
            console.log("Role not found! Returning null.")
            console.log(e)
            return null
        }
    }

    creep_role.getRoleParts = function(name) {
        var r = getRole(name)
        if(r == null) {
            return null
        } else {
            return r.getParts()
        }
    }

    creep_role.getRoleCost = function(name) {
        var r = getRole(name)
        if(r == null || r == undefined) {
            return null
        } else {
            try {
                return r.getCost.call()
            } catch(e) {
                console.log("Cost method not found.")
                console.log(e)
                console.log(Object.keys(r))
            }
        }
    }

    creep_role.getCreepsWithRoleInRoom= function(role, room) {
        room.find(FIND_MY_CREEPS, {
           filter: function(creep) {
               return (creep.memory.role == role)
           }
        })
    }

    Creep.prototype.performRole = function() {
        getRole(memory.role).performRole(this)
    }

    return creep_role

}