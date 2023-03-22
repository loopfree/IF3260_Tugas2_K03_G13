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

    //manage shading
    isShade = false;
    shading.value = false;
}