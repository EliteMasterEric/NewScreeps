/**
 * An attacker.
 */

var guard = {
    parts: [
        [Game.TOUGH, Game.TOUGH, Game.MOVE, Game.MOVE, Game.ATTACK, Game.ATTACK]
    ],

    costs: [
        280
    ],

    getPartsForExtensionCount: function(count) {
        return parts[0];
    },

    getParts: function() {
        getPartsForExtensionCount(0);
    },

    getCostForExtensionCount: function(count) {
        return costs[count]
    },

    getCost: function() {
        return getCostForExtensionCount(0)
    },

    performRole: function(creep) {
        if(creep.memory.target == null || creep.memory.target == undefined) {
            var targets = creep.room.find(Game.HOSTILE_CREEPS);
            if (targets.length) {
                var Target = targets[0];
                creep.memory.target = Target.id;

                creep.moveTo(Target);
                creep.attack(Target);
            }
        } else {
            creep.attack(Target);
        }
    }
};

module.export = guard;