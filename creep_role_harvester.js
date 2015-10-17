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
                [Game.MOVE, Game.WORK, Game.CARRY]
            ],

            costs: [
                200
            ]
    };

    harvester.getPartsForExtensionCount = function(count) {
        return parts[count]
    },

    harvester.getParts = function() {
        getPartsForExtensionCount(0)
    },

    harvester.getCostForExtensionCount = function(count) {
        return costs[count]
    },

    harvester.getCost = function() {
        return getCostForExtensionCount(0)
    },

    harvester.performRole = function(creep) {
        if(creep.memory.target == undefined || creep.memory.target == null) {
            if(creep.carry.energy >= creep.carryCapacity) {
                var Target = creep.pos.findClosest(FIND_MY_SPAWNS, {
                    filter: function(object) {
                        return (object.energyCapacity - object.energy) >= creep.carryCapacity
                    }
                })
                if(Target != null) {
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            } else {
                var Target = creep.pos.findClosest(FIND_SOURCES_ACTIVE, {
                    filter: function(object) {
                        return (!(Memory.sources[Target.id].miners == null
                                || Memory.sources[Target.id].miners == undefined)
                              && Memory.sources[object.id].miners.length <= 1)
                    }
                })
                if(Target != null) {
                    Memory.sources[object.id].miners.push(this.id)
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            }
        } else {
            var Target = Game.getObjectById(creep.memory.target)

            if(creep.carry.energy >= creep.carryCapacity && creep.memory.harvesting) {
                //Reset the target, else it would be stuck at the source it was mining.
                Memory.sources[Target.id].miners.splice(Memory.sources[Target.id].miners.indexOf(creep.id), 1)
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
    return harvester;
}