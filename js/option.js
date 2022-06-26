import * as THREE from '../plugins/Three/build/three.module.js';
import {
    OrbitControls
} from '../plugins/Three/module/jsm/controls/OrbitControls.js';
import {
    MTLLoader
} from '../plugins/Three/module/jsm/loaders/MTLLoader.js';
import {
    OBJLoader
} from '../plugins/Three/module/jsm/loaders/OBJLoader.js';
import {
    CSS2DRenderer,
    CSS2DObject
} from '../plugins/Three/module/jsm/renderers/CSS2DRenderer.js';
window.THREE = THREE
window.OrbitControls = OrbitControls
window.MTLLoader = MTLLoader
window.OBJLoader = OBJLoader
window.CSS2DRenderer = CSS2DRenderer
window.CSS2DObject = CSS2DObject