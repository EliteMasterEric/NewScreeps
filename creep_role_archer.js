/**
 * An attacker.
 */

module.exports = function() {
    var archer = {
        parts: [
	        [Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.MOVE],
            [Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.MOVE, Game.MOVE]
        ],

        costs: [
            400,
            600
        ]
    }

	archer.getPartsForExtensionCount = function(count) {
		return this.parts[0];
	},

	archer.getParts = function() {
	    return this.getPartsForExtensionCount(0);
	},

	archer.getCostForExtensionCount = function(count) {
        return this.costs[count]
    },

    archer.getCost = function() {
        return this.getCostForExtensionCount(0)
    },

    archer.performRole = function(creep) {

	}

    return archer;
};