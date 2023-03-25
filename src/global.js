
function radToDeg(r) {
    return r * 180 / Math.PI;
}

function degToRad(d) {
    return d * Math.PI / 180;
}

var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl");

var isShade = false;
var objVertices = [];
var objColors = [];
var objNormals = [];
var centerobjectmin = [0,0,0];
var centerobjectmax = [0,0,0];
var lightPosition = [300, 300, 300];
var lightColor = [1, 1, 1];
/**
 * 0 = perspective
 * 1 = orthographic
 * 2 = oblique
 */
let drawingType = 0;

var translation = [325, 225, 0];
var rotation = [degToRad(0), degToRad(0), degToRad(0)];
var camrotation = [degToRad(0), degToRad(0), degToRad(0)];
var zoom = 1.0;
var scale = [1, 1, 1];