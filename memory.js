/**
 * Adds and creates memory where needed.
 */

if(Memory.spawnQueue == undefined) {
    //The queue of creeps to spawn.
    Memory.spawnQueue = [
            'harvester', 'guard',
            'miner', 'hauler', 'hauler',
            'guard', 'healer', 'builder',
            'guard', 'guard', 'archer',
            'guard', 'healer', 'archer',
            'guard', 'healer', 'archer',
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
            //for example you could add a worker counter:
            source.memory.workers = 0;
        }
    }else{ //The memory already exists so lets add a shortcut to the sources its memory
        var sources = room.find(FIND_SOURCES);//Find all sources in the current room
        for(var i in sources){
            var source = sources[i];
            source.memory = this.memory.sources[source.id]; //Set the shortcut
        }
    }
}