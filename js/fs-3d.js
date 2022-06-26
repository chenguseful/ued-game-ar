const THREE = window.THREE
const OrbitControls = window.OrbitControls
const MTLLoader = window.MTLLoader
const OBJLoader = window.OBJLoader
const CSS2DRenderer = window.CSS2DRenderer
const CSS2DObject = window.CSS2DObject

var container, camera, scene, renderer, controls, labelRenderer, mesh;

var isUserInteracting = false,
    onMouseDownMouseX = 0,
    onMouseDownMouseY = 0,
    lon = 0,
    onMouseDownLon = 0,
    lat = 0,
    onMouseDownLat = 0,
    phi = 0,
    theta = 0;

init();
animate();

function init() {

    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.target = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    container.appendChild(labelRenderer.domElement);

    document.addEventListener('mousedown', onPointerStart, false);

    document.addEventListener('mousemove', onPointerMove, false);

    document.addEventListener('mouseup', onPointerUp, false);

    document.addEventListener('wheel', onDocumentMouseWheel, false);

    document.addEventListener('touchstart', onPointerStart, false);

    document.addEventListener('touchmove', onPointerMove, false);

    document.addEventListener('touchend', onPointerUp, false);

    document.addEventListener('dragover', function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }, false);

    document.addEventListener('dragenter', function () {
        document.body.style.opacity = 0.5;
    }, false);

    document.addEventListener('dragleave', function () {
        document.body.style.opacity = 1;
    }, false);

    document.addEventListener('drop', function (event) {
        event.preventDefault();
        var reader = new FileReader();
        reader.addEventListener('load', function (event) {
            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;
        }, false);
        reader.readAsDataURL(event.dataTransfer.files[0]);
        document.body.style.opacity = 1;
    }, false);
    window.addEventListener('resize', onWindowResize, false);
}

function loadFullScene(url) {
    var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    var texture = new THREE.TextureLoader().load(url);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

window.loadFullScene = loadFullScene

function loadText(id, position) {
    var text = document.getElementById(id);
    var label = new CSS2DObject(text);
    label.position.set(...position);
    scene.add(label);
}

window.loadText = loadText

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerStart(event) {
    isUserInteracting = true;
    var clientX = event.clientX || event.touches[0].clientX;
    var clientY = event.clientY || event.touches[0].clientY;
    onMouseDownMouseX = clientX;
    onMouseDownMouseY = clientY;
    onMouseDownLon = lon;
    onMouseDownLat = lat;
}

function onPointerMove(event) {
    if (isUserInteracting === true) {
        var clientX = event.clientX || event.touches[0].clientX;
        var clientY = event.clientY || event.touches[0].clientY;
        lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon;
        lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
    }
}

function onPointerUp() {
    isUserInteracting = false;
}

function onDocumentMouseWheel(event) {
    const fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);
    update();
}

function update() {
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.MathUtils.degToRad(90 - lat);
    theta = THREE.MathUtils.degToRad(lon);

    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(camera.target);
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}