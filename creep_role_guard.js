/**
 * An attacker.
 */

module.exports = function() {
    var guard = {
        parts: [
            [Game.TOUGH, Game.TOUGH, Game.MOVE, Game.MOVE, Game.ATTACK, Game.ATTACK]
        ],

        costs: [
            280
        ]
    };

    guard.getPartsForExtensionCount = function(count) {
        return parts[0];
    };

    guard.getParts = function() {
        getPartsForExtensionCount(0);
    };

    guard.getCostForExtensionCount = function(count) {
        return costs[count]
    };

    guard.getCost = function() {
        return getCostForExtensionCount(0)
    };

    guard.performRole = function(creep) {
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