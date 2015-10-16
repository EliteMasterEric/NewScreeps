/**
 * An attacker.
 */

var archer = {
	parts: [
	    [Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.MOVE],
        [Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.MOVE, Game.MOVE]
    ],

    costs: [
        400,
        600
    ],

	getPartsForExtensionCount: function(count) {
		return parts[0];
	},

	getParts: function() {
	    getPartsForExtensionCount(0);
	},

	performRole: function(creep) {

	}
};

module.export = archer;