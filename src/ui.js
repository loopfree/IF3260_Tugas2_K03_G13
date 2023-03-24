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

        console.log(objVertices.length);

        reset_ui();
        main();
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
    translation = [0, 0, 0];
    xTranslation.value = translation[0];
    yTranslation.value = translation[1];
    zTranslation.value = translation[2];
    xTranslationValue.innerHTML = xTranslation.value;
    yTranslationValue.innerHTML = yTranslation.value;
    zTranslationValue.innerHTML = zTranslation.value;

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