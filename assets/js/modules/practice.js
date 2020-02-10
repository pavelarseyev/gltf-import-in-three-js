import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// let GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader.js");
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {TimelineMax} from "gsap/gsap-core";
import * as dat from "dat.gui";

THREE.OrbitControls = OrbitControls;
THREE.GLTFLoader = GLTFLoader;


export function functionName() {
  let container = document.getElementById("container");
  let scene;
  let camera;
  let controls;
  let renderer;
  let car;
  
  
  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.z = 2000;
    
    
    let hlight = new THREE.AmbientLight(0x404040, 100);
    scene.add(hlight);
    
    
    let directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    
    let light = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 300, 500);
    scene.add(light);
    
    let light1 = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(500, 100, 0);
    scene.add(light1);
    
    let light2 = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 100, -500);
    scene.add(light2);
    
    let light3 = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(-500, 300, 0);
    scene.add(light3);
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
  
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    let loader = new THREE.GLTFLoader();
    //test_01.gltf
    //scene.gltf
    loader.load("../../3DObjects/scene.gltf", function(gltf) {
          car = gltf.scene.children[0];
          car.scale.set(0.5, 0.5, 0.5);
          
          scene.add(gltf.scene);
          animate();
          
        }, function(xhr) {
          
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          
        },
        // called when loading has errors
        function(error) {
          
          console.log('An error happened');
          
        });
  
    window.addEventListener("resize", onWindowResize, false);
  }
  
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  let angle = 0.5/180*Math.PI;
  
  function animate() {
    car.rotation.z -= angle;
    // camera.rotation.y += angle;
    // camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
  }
  
  init()
}