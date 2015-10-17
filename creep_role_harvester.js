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
                [MOVE, WORK, CARRY]
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
                        return (!(Miners == null || Miners == undefined) && Miners <= 1)
                    }
                })
                if(Target != null && Target != undefined) {
                    CreepRole.getSourceMiners(Target.id).push(this.id)
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            }
        } else {
            var Target = Game.getObjectById(creep.memory.target)
            if(Target != null && Target != undefined) {
                if(creep.carry.energy >= creep.carryCapacity && creep.memory.harvesting) {
                    //Reset the target, else it would be stuck at the source it was mining.
                    CreepRole.getSourceMiners(object.id).splice(CreepRole.getSourceMiners(object.id).indexOf(creep.id), 1)
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