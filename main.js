/**
 * The main module for the Screeps project.
 *
 * This module runs once every CPU "tick".
 *
 */

var CreepRoles = require('creep_role')
var CreepSpawning = require('creep_spawner')
var Memory = require('memory')

// Notes to self:
// -Game.rooms accesses only rooms you have presence in.
// -For arrays, shift removes and returns the first item,
//    pop removes and returns the last item,
//    array[array.length - 1] gets the last item,
//    and array[0] gets the first item,


//Main code! WOO!
//For each room we own...
for(var CreepCurrent in Game.creeps) {
    if(CreepCurrent.spawning || CreepCurrent.memory.role == undefined || CreepCurrent.memory.role == null)
        continue;

    CreepCurrent.doJob()
}

//Have each spawn create creeps.
for(var SpawnCurrent in Game.spawns) {
    if(SpawnCurrent.spawning == null || SpawnCurrent.spawning == undefined) {
        if(SpawnCurrent.energy >= CreepRoles.getRoleCost(Memory.spawnQueue[0])) {
            SpawnCurrent.createRole(Memory.spawnQueue.shift())
        }
    }
}


//Print status.
console.log("MasterEric's Screeps v2.0")
console.log("-------------------------")
console.log(" - Current Rooms: "+Game.rooms.length)
console.log(" - Current Creeps: "+Game.creeps.length)
console.log(" - Current Spawns: "+Game.spawns.length)