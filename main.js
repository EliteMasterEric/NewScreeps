/**
 * The main module for the Screeps project.
 *
 * This module runs once every CPU "tick".
 *
 */

var CreepRoles = require('creep_role')
var CreepSpawning = require('creep_spawner')

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

function getRoleCost(name) {
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
    getRole(memory.role).performRole(this)
}


//  MAIN UPDATE LOOP

//Have each of our creeps do its job.
for(var CreepCurrent in Game.creeps) {
    if(CreepCurrent.spawning || CreepCurrent.memory.role == undefined || CreepCurrent.memory.role == null)
        continue;

    CreepCurrent.doJob()
}

//Have each of our spawns create creeps.
for(var SpawnCurrent in Game.spawns) {
    if(SpawnCurrent.spawning == null || SpawnCurrent.spawning == undefined) {
        if(SpawnCurrent.energy >= getRoleCost(Memory.spawnQueue[0])) {
            SpawnCurrent.createRole(Memory.spawnQueue.shift())
        }
    }
}


//Print status to the console.
console.log("MasterEric's Screeps v2.0")
console.log("-------------------------")
console.log(" - Current Rooms: "+Game.rooms.length)
console.log(" - Current Creeps: "+Game.creeps.length)
console.log(" - Current Spawns: "+Game.spawns.length)