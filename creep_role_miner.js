/**
 * A more advanced miner.
 *
 * Moves to a source and drops the energy on the ground when a miner helper is nearby.
 */

var miner = {
    parts: [
        [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.WORK]
    ],

    costs: [
        450
    ],

    getPartsForExtensionCount: function(count) {
        return parts[count]
    },

    getParts: function() {
        getPartsForExtensionCount(0)
    },

    getCostForExtensionCount: function(count) {
        return costs[count]
    },

    getCost: function() {
        getCostForExtensionCount(0)
    },

    performRole: function(creep) {
        if(creep.memory.target == undefined || creep.memory.target == null) {
            var Target = creep.pos.findClosest(FIND_SOURCES_ACTIVE, {
                filter: function(object) {
                    return (!(Memory.sources[Target.id].miners == null
                              || Memory.sources[Target.id].miners == undefined)
                            && Memory.sources[object.id].miners.length <= 1)
                }
            })
            if(Target != null) {
                if(Memory.sources[Target.id].miners == null || )
                Memory.sources[Target.id].miners.push(this.id)
                creep.memory.target = Target.id
                creep.moveTo(Target)
            }
        } else {
            var Target = Game.getObjectById(creep.memory.target)
            if(creep.pos.isNearTo(Target)) {
                creep.harvest(Target)
                creep.dropEnergy()
            }
        }
    }
}

module.export = miner