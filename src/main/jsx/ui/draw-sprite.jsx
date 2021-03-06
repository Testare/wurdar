const React = require('react')
const path = require('path')

const pAnimation = ({actor,animation}) => actor[animation]

const playerStyle = (assetPath, {currentFrame,...player}) => ({
    backgroundImage: `url('${path.join(assetPath,'animations',pAnimation(player).src)}')`,
    backgroundPositionX: -currentFrame * (1+ pAnimation(player).width), //The 1+ gives room for dividing lines
    width: pAnimation(player).width,
    height: pAnimation(player).height,
    transform: (player.flipped)?"scaleX(-1)":"none"
})

const spriteStyle = (props) => ({
        left: props.physics.posX,
        top: props.physics.posY,
        zIndex : props.zFrame,
        ...playerStyle(props.assetPath,props.player)
    }
)

const DrawCollisionFrame = ({player}) => (
    <svg>
        {
            pAnimation(player).frames[player.currentFrame].collisionData.map(
                (collisionFrame, i) => {
                    coords = collisionFrame.coords.split(",")
                    switch(collisionFrame.shape) {
                        case "circle":
                            return <circle
                                key={i}
                                cx={coords[0]}
                                cy={coords[1]}
                                r={coords[2]}
                                stroke="blue"
                                fill="none"
                            />
                        case "vector":
                            return <line
                                key={i}
                                x1={coords[0]}
                                y1={coords[1]}
                                x2={coords[2]}
                                y2={coords[3]}
                                stroke="blue"
                                fill="none"
                            />
                        default:
                    }

                }
            )
        }
    </svg>

)

const DrawSprite = props => (
    <span
        className="drawsprite"
        style={spriteStyle(props)}
    >
    {(props.debug && props.debug['drawCollision'])?<DrawCollisionFrame {...props} /> : null }
    </span>
)

module.exports = DrawSprite
