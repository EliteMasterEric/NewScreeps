/**
 * A module for managing creep jobs.
 */

module.exports = function() {
    var creep_role = { }

    creep_role.getRole = function(name) {
        try {
            if(this[name] == null || this[name] == undefined) {
                this[name] = require("creep_role_"+name)()
            }
            //console.log("Role method:"+this[name])
            return this[name]
        } catch (e) {
            console.log("Role "+name+" not found! Returning null.")
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
        var r = this.getRole(name)
        if(r == null || r == undefined) {
            return null
        } else {
            try {
                return r.getCost()
            } catch(e) {
                console.log("Cost method not found.")
                console.log(e)
                console.log(Object.keys(r))
                return null;
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