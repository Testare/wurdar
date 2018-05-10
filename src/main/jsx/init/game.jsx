const _ = require('lodash/fp')
const map = require("./map")
const {initializeBehaviors} = require('./behaviors')

const initSpriteGroups = _.compose(
    _.head,
    _.reduce(
        ([obj,n], groupName) => (groupName === 'map') 
            ? [obj,n] 
            : [{...obj, [groupName]:n}, 0b10*n],
        [{"map":0b1},0b10]
    ),
)

const gameInit = assets => {
    const spriteGroups = initSpriteGroups(assets.config.spriteGroups || [])
    return initializeBehaviors(assets, {
        behaviors:[],
        data:{},
        ops:[],
        paused:false,
        defaultSaveLocation:"assets/saves",
        ...assets.config,
        spriteGroups,
        map: map.init(assets)(assets.maps[assets.config.map], spriteGroups),
        assetPath:assets.assetPath
        //Load assets and config and initialize from there
    })
}

module.exports.init = gameInit
