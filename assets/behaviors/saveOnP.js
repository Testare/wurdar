const _ = require('lodash');

module.exports.update = 
    ({utils, state}) => (!ui.checkPress('KeyP')) 
        ? state 
        : utils.ops.logState(
            utils.ops.saveGameStateNamed(state,"testsav.json"),
            "Heyo"
        )
             //saveGameStateTo(state,"saveFile")