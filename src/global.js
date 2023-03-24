
function radToDeg(r) {
    return r * 180 / Math.PI;
}

function degToRad(d) {
    return d * Math.PI / 180;
}

var canvas = document.getElementById("canvas");
console.log(canvas)
var gl = canvas.getContext("webgl");

var isShade = false;
var objVertices = [];
var objColors = [];
var objNormals = [];
var centerobjectmin = [0,0,0];
var centerobjectmax = [0,0,0];

var translation = [0, 0, 0];
var rotation = [degToRad(15), degToRad(30), degToRad(0)];
var camrotation = [degToRad(0), degToRad(0), degToRad(0)];
var zoom = 1.0;
var scale = [1, 1, 1];