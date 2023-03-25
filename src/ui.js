const loadButton = document.getElementById("load-obj");
loadButton.onchange = function(event) {
        isShadingOn = false;
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
        if (e.target.readyState != 2) return;

        let rawJson = "{" + e.target.result.split("{")[1].split("}")[0] + "}";
        let data = JSON.parse(rawJson);
        objVertices = data.vertices;
        objColors = data.colors;
        objNormals = data.normals;

        centerobjectmax = [...objVertices];
        centerobjectmin = [...objVertices];

        for (let i = 3; i < objVertices.length; i++) {
            const axis = i % 3;
            
            if (centerobjectmax[axis] < objVertices[i]) {
                centerobjectmax[axis] = objVertices[i];
            }
            
            if (centerobjectmin[axis] > objVertices[i]) {
                centerobjectmin[axis] = objVertices[i];
            }
        }

        let xFlag = false;
        let yFlag = false;
        let zFlag = false;

        reset_ui();

        const firstAnimation = () => {
            if(!xFlag) {
                rotation[0] = (radToDeg(rotation[0]) + 1) % 360;
                if(rotation[0] < 1) {
                    rotation[0] = 0;
                    xFlag = true;
                }
                rotation[0] = degToRad(rotation[0]);
            }
            if(!yFlag) {
                rotation[1] = (radToDeg(rotation[1]) + 1) % 360;
                if(rotation[1] < 1) {
                    rotation[1] = 0;
                    yFlag = true;
                }
                rotation[1] = degToRad(rotation[1]);
            }
            if(!zFlag) {
                rotation[2] = (radToDeg(rotation[2]) + 1) % 360;
                if(rotation[2] < 1) {
                    rotation[2] = 0;
                    zFlag = true;
                }
                rotation[2] = degToRad(rotation[2]);
            }
            if(xFlag && yFlag && zFlag) {
                return;
            }
            requestAnimationFrame(firstAnimation);
            main();
        }
        requestAnimationFrame(firstAnimation);
    };
    reader.readAsText(file);
}

const zoomSlider = document.getElementById('zoom');
const zoomValue = document.getElementById("zoom-value");
zoomSlider.value = zoom;

zoomSlider.oninput = () => {
    zoomValue.innerHTML = zoomSlider.value;
    zoom = zoomSlider.value;
    main();
}

const xScaling = document.getElementById("x-scaling");
const xScalingValue = document.getElementById("x-scaling-value");
xScaling.value = scale[0];

xScaling.oninput = () => {
    xScalingValue.innerHTML = xScaling.value;
    scale[0] = xScaling.value;
    main();
}

const yScaling = document.getElementById("y-scaling");
const yScalingValue = document.getElementById("y-scaling-value");
yScaling.value = scale[1];

yScaling.oninput = () => {
    yScalingValue.innerHTML = yScaling.value;
    scale[1] = yScaling.value;
    main();
}

const zScaling = document.getElementById("z-scaling");
const zScalingValue = document.getElementById("z-scaling-value");
zScaling.value = scale[2];

zScaling.oninput = () => {
    zScalingValue.innerHTML = zScaling.value;
    scale[2] = zScaling.value;
    main();
}

const xTranslation = document.getElementById("x-translation");
const xTranslationValue = document.getElementById("x-translation-value");
xTranslation.value = translation[0];

xTranslation.oninput = () => {
    xTranslationValue.innerHTML = xTranslation.value;
    translation[0] = xTranslation.value;
    main();
}

const yTranslation = document.getElementById("y-translation");
const yTranslationValue = document.getElementById("y-translation-value");
yTranslation.value = translation[1];

yTranslation.oninput = () => {
    yTranslationValue.innerHTML = yTranslation.value;
    translation[1] = yTranslation.value;
    main();
}

const zTranslation = document.getElementById("z-translation");
const zTranslationValue = document.getElementById("z-translation-value");
zTranslation.value = translation[2];

zTranslation.oninput = () => {
    zTranslationValue.innerHTML = zTranslation.value;
    translation[2] = zTranslation.value;
    main();
}

const xCameraRotation = document.getElementById("x-camera-rotation");
const xCameraValue = document.getElementById("x-camera-value");
xCameraRotation.value = degToRad(camrotation[0]);

xCameraRotation.oninput = () => {
    xCameraValue.innerHTML = xCameraRotation.value;
    camrotation[0] = degToRad(xCameraRotation.value);
    main();
}

const yCameraRotation = document.getElementById("y-camera-rotation");
const yCameraValue = document.getElementById("y-camera-value");
yCameraRotation.value = degToRad(camrotation[1]);

yCameraRotation.oninput = () => {
    yCameraValue.innerHTML = yCameraRotation.value;
    camrotation[1] = degToRad(yCameraRotation.value);
    main();
}

const zCameraRotation = document.getElementById("z-camera-rotation");
const zCameraValue = document.getElementById("z-camera-value");
zCameraRotation.value = degToRad(camrotation[2]);

zCameraRotation.oninput = () => {
    zCameraValue.innerHTML = zCameraRotation.value;
    camrotation[2] = degToRad(zCameraRotation.value);
    main();
}

const shading = document.getElementById("shading");
shading.oninput = () => {
    isShade = shading.checked;
    main();
}

const xLightPos = document.getElementById("x-light-position");
const xLightPosValue = document.getElementById("x-light-position-value");

xLightPos.oninput = () => {
    xLightPosValue.innerHTML = xLightPos.value;
    lightPosition[0] = xLightPos.value;
    main();
}

const yLightPos = document.getElementById("y-light-position");
const yLightPosValue = document.getElementById("y-light-position-value");

yLightPos.oninput = () => {
    yLightPosValue.innerHTML = yLightPos.value;
    lightPosition[1] = yLightPos.value;
    main();
}

const zLightPos = document.getElementById("z-light-position");
const zLightPosValue = document.getElementById("z-light-position-value");

zLightPos.oninput = () => {
    zLightPosValue.innerHTML = zLightPos.value;
    lightPosition[2] = zLightPos.value;
    main();
}

const xRotation = document.getElementById("x-rotation");
const xRotationValue = document.getElementById("x-rotation-value");

xRotation.oninput = () => {
    xRotationValue.innerHTML = xRotation.value;
    rotation[0] = degToRad(xRotation.value);
    main();
}

const yRotation = document.getElementById("y-rotation");
const yRotationValue = document.getElementById("y-rotation-value");

yRotation.oninput = () => {
    yRotationValue.innerHTML = yRotation.value;
    rotation[1] = degToRad(yRotation.value);
    main();
}

const zRotation = document.getElementById("z-rotation");
const zRotationValue = document.getElementById("z-rotation-value");

zRotation.oninput = () => {
    zRotationValue.innerHTML = zRotation.value;
    rotation[2] = degToRad(zRotation.value);
    main();
}

const red = document.getElementById("red");
const redValue = document.getElementById("red-value");

red.oninput = () => {
    redValue.innerHTML = red.value;
    lightColor[0] = red.value;
    main();
}

const green = document.getElementById("green");
const greenValue = document.getElementById("green-value");

green.oninput = () => {
    greenValue.innerHTML = green.value;
    lightColor[1] = green.value;
    main();
}

const blue = document.getElementById("blue");
const blueValue = document.getElementById("blue-value");

blue.oninput = () => {
    blueValue.innerHTML = blue.value;
    lightColor[2] = blue.value;
    main();
}

const perspectiveBtn = document.getElementById("perspective");
perspectiveBtn.onclick = () => {
    drawingType = 0;
    main();
}

const ortographicBtn = document.getElementById("ortographic");
ortographicBtn.onclick = () => {
    drawingType = 1;
    main();
}

const obliqueBtn = document.getElementById("oblique");
obliqueBtn.onclick = () => {
    drawingType = 2;
    main();
}

const animateBtn = document.getElementById("animate");
let stopAnim = false;
let run = false
animateBtn.onclick = () => {
    if(run) {
        stopAnim = true;
        run = false;
        return;
    }
    let animation = undefined;
    animation = () => {
        run = true;
        rotation[0] = (radToDeg(rotation[0]) + 1) % 360;
        xRotation.value = rotation[0];
        xRotationValue.innerHTML = Math.trunc(rotation[0]);
        rotation[0] = degToRad(rotation[0]);
        rotation[1] = (radToDeg(rotation[1]) + 1) % 360;
        yRotation.value = rotation[1];
        yRotationValue.innerHTML = Math.trunc(rotation[1]);
        rotation[1] = degToRad(rotation[1]);
        rotation[2] = (radToDeg(rotation[2]) + 1) % 360;
        zRotation.value = rotation[2];
        zRotationValue.innerHTML = Math.trunc(rotation[2]);
        rotation[2] = degToRad(rotation[2]);
        if(stopAnim) {
            run = false;
            stopAnim = false;
            return;
        }
        requestAnimationFrame(animation);
        main();
    }
    requestAnimationFrame(animation);
}

const reset = document.getElementById("reset");
const reset_ui = () => {
    //manage scale
    scale = [1, 1, 1];
    xScaling.value = scale[0];
    yScaling.value = scale[1];
    zScaling.value = scale[2];
    xScalingValue.innerHTML = xScaling.value;
    yScalingValue.innerHTML = yScaling.value;
    zScalingValue.innerHTML = zScaling.value;

    //manage translation
    translation = [325, 225, 0];
    xTranslation.value = translation[0];
    yTranslation.value = translation[1];
    zTranslation.value = translation[2];
    xTranslationValue.innerHTML = xTranslation.value;
    yTranslationValue.innerHTML = yTranslation.value;
    zTranslationValue.innerHTML = zTranslation.value;

    //manage rotation
    rotation = [degToRad(0), degToRad(0), degToRad(0)];
    xRotation.value = rotation[0];
    yRotation.value = rotation[1];
    zRotation.value = rotation[2];
    xRotationValue.innerHTML = xRotation.value;
    yRotationValue.innerHTML = yRotation.value;
    zRotationValue.innerHTML = zRotation.value;

    // managing camera rotation
    camrotation = [degToRad(0), degToRad(0), degToRad(0)];
    xCameraRotation.value = camrotation[0];
    yCameraRotation.value = camrotation[1];
    zCameraRotation.value = camrotation[2];
    xCameraValue.innerHTML = xCameraRotation.value;
    yCameraValue.innerHTML = yCameraRotation.value;
    zCameraValue.innerHTML = zCameraRotation.value;

    //manage shading
    isShade = false;
    shading.value = false;
    shading.checked = false;

    //manage zoom
    zoom = 1.0;
    zoomSlider.value = zoom;
    zoomValue.innerHTML = zoomSlider.value;

    //manage light position
    lightPosition = [300, 300, 300];
    xLightPos.value = lightPosition[0];
    yLightPos.value = lightPosition[1];
    zLightPos.value = lightPosition[2];
    xLightPosValue.innerHTML = xLightPos.value;
    yLightPosValue.innerHTML = yLightPos.value;
    zLightPosValue.innerHTML = zLightPos.value;

    //manage light color
    lightColor = [1, 1, 1];
    red.value = lightColor[0];
    green.value = lightColor[1];
    blue.value = lightColor[2];
    redValue.innerHTML = red.value;
    greenValue.innerHTML = green.value;
    blueValue.innerHTML = blue.value;

    main();
}
reset.onclick = () => {
    reset_ui();
}

function help() {
    // var popup = document.getElementsByClassName("popuptext");
    [].forEach.call(document.querySelectorAll('.popuptext'), function (el) {
        el.classList.toggle("show");
    });
}
