/**
 * Methods involving spawning creeps.
 */

Spawn.prototype.createRole = function(CreepRole, role, memory) {
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