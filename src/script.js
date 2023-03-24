function setGeometry(gl, vertices) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
        );
}

function setColors(gl, colors) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array(colors),
        gl.STATIC_DRAW
        );
}

function setNormals(gl, normals) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
        );
}

const webglUtils = {
    resizeCanvasToDisplaySize : function(canvas) {
        const displayWidth  = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        
        const needResize = canvas.width  !== displayWidth ||
                            canvas.height !== displayHeight;
        
        if (needResize) {
            canvas.width  = displayWidth;
            canvas.height = displayHeight;
        }
        
        return needResize;
    },
  
    compileShader : function(gl, shaderSource, shaderType) {
        var shader = gl.createShader(shaderType);
        
        gl.shaderSource(shader, shaderSource);
        
        gl.compileShader(shader);
        
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            throw "could not compile shader:" + gl.getShaderInfoLog(shader);
        }
        
        return shader;
    },
  
    createShaderFromScript : function(gl, scriptId, opt_shaderType) {
        var shaderScript = document.getElementById(scriptId);
        if (!shaderScript) {
            throw("*** Error: unknown script element" + scriptId);
        }
        
        var shaderSource = shaderScript.text;
        
        if (!opt_shaderType) {
            if (shaderScript.type == "x-shader/x-vertex") {
                opt_shaderType = gl.VERTEX_SHADER;
            } else if (shaderScript.type == "x-shader/x-fragment") {
                opt_shaderType = gl.FRAGMENT_SHADER;
            } else if (!opt_shaderType) {
                throw("*** Error: shader type not set");
            }
        }
        
        return this.compileShader(gl, shaderSource, opt_shaderType);
    },
  
    createProgram : function(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        
        gl.linkProgram(program);
        
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            throw ("program failed to link:" + gl.getProgramInfoLog (program));
        }
        
        return program;
    },

    createProgramFromScripts : function(gl, shaderScriptIds) {
        var vertexShader = this.createShaderFromScript(gl, shaderScriptIds[0], gl.VERTEX_SHADER);
        var fragmentShader = this.createShaderFromScript(gl, shaderScriptIds[1], gl.FRAGMENT_SHADER);
        return this.createProgram(gl, vertexShader, fragmentShader);
    }
}

function main() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById("canvas");
    console.log(canvas)
    var gl = canvas.getContext("webgl");
    if (!gl) {
      return;
    }
  
    var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-3d", "fragment-shader-3d"]);
  
    var positionLocation = gl.getAttribLocation(program, "aPos");
    var colorLocation = gl.getAttribLocation(program, "aColor");
    var normalLocation = gl.getAttribLocation(program, "aNormal");
  
    var matrixLocation = gl.getUniformLocation(program, "projection");
    
    var lightPositionLocation = gl.getUniformLocation(program, "lightPos");
    var lightColorLocation = gl.getUniformLocation(program, "lightColor");

    var shininessLocation = gl.getUniformLocation(program, "shininess");
  
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl, objVertices);
  
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setColors(gl, objColors);
  
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    setNormals(gl, objNormals);
  
    drawScene();

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        gl.enable(gl.CULL_FACE);
    
        gl.enable(gl.DEPTH_TEST);
    
        gl.useProgram(program);
    
        gl.enableVertexAttribArray(positionLocation);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
        var size = 3;          
        var type = gl.FLOAT;  
        var normalize = false; 
        var stride = 0;        
        var offset = 0;        
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset);
    
        gl.enableVertexAttribArray(colorLocation);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

        
        var size = 3;                 
        var type = gl.UNSIGNED_BYTE; 
        var normalize = true;         
        var stride = 0;               
        var offset = 0;               
        gl.vertexAttribPointer(
            colorLocation,
            size,
            type,
            normalize,
            stride,
            offset
            );
            
        if (isShade) {
            const shadingFlagLocation = gl.getUniformLocation(program, "shading");
            gl.uniform1i(shadingFlagLocation, true);
            gl.enableVertexAttribArray(normalLocation);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
            
            var size = 3;                 
            var type = gl.FLOAT;           
            var normalize = false;         
            var stride = 0;               
            var offset = 0;               
            gl.vertexAttribPointer(
                normalLocation,
                size,
                type,
                normalize,
                stride,
                offset
                );
                
                var normalMatrix = calculateNormalMatrix();
                
                gl.uniformMatrix4fv(
                    gl.getUniformLocation(program, 'model'),
                    false,
                    normalMatrix
                    );
                gl.uniform3fv(lightPositionLocation, lightPosition);
                gl.uniform3fv(lightColorLocation, lightColor);
                gl.uniform1f(shininessLocation, 5);
        } else {
            gl.disableVertexAttribArray(normalLocation);
        }

        const matrix = calculateMatrix();
        
        gl.uniformMatrix4fv(matrixLocation, false, matrix);
        
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = objVertices.length / 3;
        gl.drawArrays(primitiveType, offset, count);
    }

    function calculateNormalMatrix() {
        var normalMatrix = matrixCalculator.create();
        normalMatrix = matrixCalculator.xRotate(normalMatrix, rotation[0]);
        normalMatrix = matrixCalculator.yRotate(normalMatrix, -rotation[1]);
        normalMatrix = matrixCalculator.zRotate(normalMatrix, -rotation[2]);
        return normalMatrix;
    }
    
    function calculateMatrix() {
        let diffx = (centerobjectmax[0]-centerobjectmin[0])/2*scale[0]*zoom+centerobjectmin[0];
        let diffy = (centerobjectmax[1]-centerobjectmin[1])/2*scale[1]*zoom+centerobjectmin[1];
        let diffz = (centerobjectmax[2]-centerobjectmin[2])/2*scale[2]*zoom+centerobjectmin[2];

        var matrix;

        matrix = makeZToWMatrix(1);
        matrix = matrixCalculator.multiply(matrix, matrixCalculator.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400));
    
        matrix = matrixCalculator.translate(matrix, gl.canvas.clientWidth/2, gl.canvas.clientHeight/2, 0);
        matrix = matrixCalculator.xRotate(matrix, camrotation[0]);
        matrix = matrixCalculator.yRotate(matrix, camrotation[1]);
        matrix = matrixCalculator.zRotate(matrix, camrotation[2]);
        matrix = matrixCalculator.translate(matrix, 0-gl.canvas.clientWidth/2, 0-gl.canvas.clientHeight/2, 0);
    
        matrix = matrixCalculator.translate(matrix, translation[0], translation[1], translation[2]);
        matrix = matrixCalculator.translate(matrix, diffx, diffy, diffz);
        matrix = matrixCalculator.xRotate(matrix, rotation[0]);
        matrix = matrixCalculator.yRotate(matrix, rotation[1]);
        matrix = matrixCalculator.zRotate(matrix, rotation[2]);
        matrix = matrixCalculator.translate(matrix, -diffx, -diffy, -diffz);
        matrix = matrixCalculator.scale(matrix, scale[0], scale[1], scale[2]);
    
        matrix = matrixCalculator.scale(matrix, zoom, zoom, zoom);

        return matrix;
    }
}

window.onload = function(){
    main();
}