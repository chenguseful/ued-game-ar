const THREE = window.THREE
const OrbitControls = window.OrbitControls
const MTLLoader = window.MTLLoader
const OBJLoader = window.OBJLoader

var container;
var camera, scene, renderer, labelRenderer;
var controls, group;

var init = function() {
    container = document.getElementById('container');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100000);
    camera.position.set(0, 0, 48);

    controls = new OrbitControls(camera, container);
    controls.target.set(0, 1.6, 0);
    controls.update();

    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 6, 0);
    light.castShadow = true;
    light.shadow.camera.top = 2;
    light.shadow.camera.bottom = -2;
    light.shadow.camera.right = 2;
    light.shadow.camera.left = -2;
    light.shadow.mapSize.set(4096, 4096);
    scene.add(light);

    var point = new THREE.PointLight(0xffffff, 1, 100);
    point.position.set(0, 0, 0);
    scene.add(point);

    group = new THREE.Group();
    scene.add(group);

    loadLabel()

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    container.appendChild(labelRenderer.domElement);

    animate()
    window.addEventListener('resize', onWindowResize, false);
}

window.init = init

function loadModel() {
    new MTLLoader()
        .setPath('../data/xc/')
        .load('xc.mtl', function (materials) {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .setPath('../data/xc/')
                .load('xc.obj', function (object) {
                    const obj = object
                    obj.position.y = -6
                    scene.add(obj);
                });
        });
}

function loadLabel() {
    var text = document.getElementById('xc');
    var label = new CSS2DObject(text);
    label.position.set(0, 0, -10);
    scene.add(label);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}
