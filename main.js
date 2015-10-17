/**
 * The main module for the Screeps project.
 *
 * This module runs once every CPU "tick".
 *
 */

var CreepSpawning = require('creep_spawner')
var CreepRole = require('creep_role')()

// Notes to self:
// -Game.rooms accesses only rooms you have presence in.
// -For arrays, shift removes and returns the first item,
//    pop removes and returns the last item,
//    array[array.length - 1] gets the last item,
//    and array[0] gets the first item,


if(Memory.spawnQueue == undefined) {
    //Create the array of creeps that need to be spawned.
    Memory.spawnQueue = [
            'harvester', 'guard',
            'miner', 'hauler', 'hauler',
            //'guard', 'healer', 'builder',
            //'guard', 'guard', 'archer',
            //'guard', 'healer', 'archer',
            //'guard', 'healer', 'archer',
            'guard', 'guard'
        ]
}

if(Memory.spawnInfinite == undefined) {
    //The creep that the spawn creates infinitely after the queue is done.
    Memory.spawnInfinite = 'archer'
}

if(Memory.sources == undefined) {
    Memory.sources = {}
}

//Add memory to sources.
//From StackExchange: http://stackoverflow.com/questions/30324353/screeps-memory-adding-how

//Lets first add a shortcut prototype to the sources memory:
Source.prototype.memory = undefined;

for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
    var room = Game.rooms[roomName];
    if(!room.memory.sources){//If this room has no sources memory yet
        room.memory.sources = {}; //Add it
        var sources = room.find(FIND_SOURCES);//Find all sources in the current room
        for(var i in sources){
            var source = sources[i];
            source.memory = room.memory.sources[source.id] = {}; //Create a new empty memory object for this source
            //Now you can do anything you want to do with this source
            source.memory.miners = [];
        }
    }else{ //The memory already exists so lets add a shortcut to the sources its memory
        var sources = room.find(FIND_SOURCES);//Find all sources in the current room
        for(var i in sources){
            var source = sources[i];
            source.memory = room.memory.sources[source.id]; //Set the shortcut
        }
    }
}

// MAIN UPDATE LOOP
// Stuff outside this loop only executes when a new global is created.
module.exports.loop = function() {
    //Have each of our creeps do its job.
    for(var i in Game.creeps) {
        var CreepCurrent = Game.creeps[i]

        if(CreepCurrent.spawning || CreepCurrent.memory.role == undefined || CreepCurrent.memory.role == null)
            continue;

        CreepCurrent.doJob()
    }

    //Have each of our spawns create creeps.
    for(var i in Game.spawns) {
        var SpawnCurrent = Game.spawns[i]

        if(SpawnCurrent.spawning == null || SpawnCurrent.spawning == undefined) {
            console.log("    - Spawn has "+SpawnCurrent.energy+"/"+CreepRole.getRoleCost(Memory.spawnQueue[0])+" needed energy")
            if(SpawnCurrent.energy >= CreepRole.getRoleCost(Memory.spawnQueue[0])) {
                SpawnCurrent.createRole(CreepRole, Memory.spawnQueue.shift())
            }
        }
    }
}

//Print status to the console.
console.log("MasterEric's Screeps v2.0")
console.log("-------------------------")
console.log(" - Current Rooms: "+Object.keys(Game.rooms).length)
console.log(" - Current Creeps: "+Object.keys(Game.creeps).length)
console.log("   - Next Creep: "+Memory.spawnQueue[0]+" ("+CreepRole.getRoleCost(Memory.spawnQueue[0])+")")
console.log(" - Current Spawns: "+Object.keys(Game.spawns).length)
