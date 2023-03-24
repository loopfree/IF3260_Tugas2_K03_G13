const zoomSlider = document.getElementById('zoom');
const zoomValue = document.getElementById("zoom-value");


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
}