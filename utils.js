const PI = () => Math.PI
function abs(x) {return Math.abs(x)}
function acos(x) {return Math.acos(x)}
function asin(x) {return Math.asin(x)}
function ceil(x) {return Math.ceil(x)}
function cos(x) {return Math.cos(x)}
function diff(a, b) {return a - b}
function isInt(x) {return Number.isInteger(x)}
function trunc(x) {return Math.trunc(x)}
function sin(x) {return Math.sin(x)}
function sqrt(x) {return Math.sqrt(x)}
function tan(x) {return Math.sin(x)}

function mapRange(x, inMin, inMax, outMin, outMax) {
    return (x - inMin) / (inMax - inMin) * (outMax - outMin) + outMin
}
