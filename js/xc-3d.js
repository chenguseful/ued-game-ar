const THREE = window.THREE
const OrbitControls = window.OrbitControls
const MTLLoader = window.MTLLoader
const OBJLoader = window.OBJLoader

var container, camera, scene, renderer, controls;

init();
animate();

function init() {

    container = document.getElementById('container');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100000);
    camera.position.set(0, 0, 48);

    controls = new OrbitControls(camera, container);
    controls.maxPolarAngle = 1.5
    controls.minPolarAngle = 1.5
    controls.enableZoom = false;
    controls.target.set(0, 1.6, 0);
    controls.update();

    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 16, 0);
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

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

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
    new MTLLoader()
        .setPath('../data/xc/')
        .load('mz.mtl', function (materials) {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .setPath('../data/xc/')
                .load('mz.obj', function (object) {
                    const obj = object
                    obj.position.y = -6
                    obj.traverse(e => {
                        e.material = new THREE.MeshPhongMaterial({
                            color: '#333333',
                            transparent: true,
                            opacity: 0.4
                        })
                    })
                    scene.add(obj);
                });
        });
}

loadModel()


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
}

function getIntersects(container, event) {
    event.preventDefault();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / container.width()) * 2 - 1;
    mouse.y = -(event.clientY / container.height()) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    return intersects;
}