/**
 * A simple miner.
 *
 * Moves to a source and collects the energy,
 * then returns to base when full.
 *
 * Really you should only make one of this, wait until it's phased out by miners and haulers.
 */
module.exports = function() {
    var harvester = {
            parts: [
                [MOVE, WORK, CARRY, CARRY]
            ],

            costs: [
                200
            ]
    };

    harvester.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

    harvester.getParts = function() {
        return this.getPartsForExtensionCount(0)
    },

    harvester.getCostForExtensionCount = function(count) {
        return this.costs[count]
    },

    harvester.getCost = function() {
        return this.getCostForExtensionCount(0)
    },

    harvester.performRole = function(CreepRole, creep) {
        if(creep.memory.harvesting == undefined || creep.memory.harvesting == null) {
            creep.memory.harvesting = true
        }

        if(creep.memory.target == undefined || creep.memory.target == null) {
            if(creep.carry.energy >= creep.carryCapacity) {
                var Target = creep.pos.findClosestByRange(FIND_MY_SPAWNS, {
                    filter: function(object) {
                        return (object.energyCapacity - object.energy) >= creep.carryCapacity
                    }
                })
                if(Target != null && Target != undefined) {
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            } else {
                var Target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
                    filter: function(object) {
                        var Miners = CreepRole.getSourceMiners(object.id)
                        return (!(Miners == null || Miners == undefined) && Miners.length <= 1)
                    }
                })
                if(Target != null && Target != undefined) {
                    var Final = [];
                    if(CreepRole.getSourceMiners(Target.id).length == 0) {
                        console.log("Target has 0 miners")
                        Final = [ creep.id ];
                    } else {
                        console.log("Target has miners")
                        Final = CreepRole.getSourceMiners(Target.id).push(creep.id)
                    }
                    CreepRole.setSourceMiners(Target.id, Final)
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            }
        } else {
            var Target = Game.getObjectById(creep.memory.target)
            if(Target != null && Target != undefined) {
                //Yeah, turns out you run moveTo each iteration.
                creep.moveTo(Target)

                if(creep.carry.energy >= creep.carryCapacity && creep.memory.harvesting) {
                    //Reset the target, else it would be stuck at the source it was mining.
                    var Final = CreepRole.getSourceMiners(Target.id)
                    var FinalIndex = Final.indexOf(creep.id)
                    var Final2 = Final.splice(FinalIndex, 1)
                    console.log("From "+Final+", splice "+creep.id+"("+FinalIndex+")")
                    CreepRole.setSourceMiners(Target.id, Final2)
                    creep.memory.target = null
                    creep.memory.harvesting = false
                } else if (creep.carry.energy == 0 && !creep.memory.harvesting) {
                    //Reset the target, else it would be stuck at the spawn it dropped the energy off at.
                    creep.memory.target = null
                    creep.memory.harvesting = true
                } else if(creep.pos.isNearTo(Target)) {
                    if(creep.memory.harvesting) {
                        creep.harvest(Target)
                    } else {
                        creep.transferEnergy(Target)
                    }
                }
            }
        }
    }
    return harvester;
}