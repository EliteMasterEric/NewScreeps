/**
 * Methods involving spawning creeps.
 */

Spawner.prototype.createRole = function(role, memory) {
    var CreepRoles = require('creep_role')

    var nameCount = null
    var name = null
    while(name == null) {
        nameCount++
        var tryName = role + nameCount
        if(Game.creeps[tryName] == undefined)
            name = tryName
    }

    if(memory == undefined)
        memory = {}

    memory['role'] = role

    this.createCreep(CreepRoles.getRoleParts(role), name, memory)
}