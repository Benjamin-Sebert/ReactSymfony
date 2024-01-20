import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let isFontLoaded = false;
    let textMesh;

    const loader = new FontLoader();
    const scene = new THREE.Scene();

    loader.load(
      'https://unpkg.com/three@0.77.0/examples/fonts/droid/droid_serif_bold.typeface.json',
      (font) => {
        const textGeometry = new TextGeometry('Stare iT', {
          font: font,
          size: 10,
          height: 1.5,
          curveSegments: 30,
          bevelEnabled: true,
          bevelThickness: 0.5,
          bevelSize: 0.1,
          bevelSegments: 20,
        });

        const material = new THREE.MeshStandardMaterial({
          color: '#4d4dff', // Couleur du plastique
          roughness: 0.5, // Rugosité du plastique
          metalness: 0.1, // Métallique du plastique
          emissive: '#000000', // Couleur émissive (noire pour simuler le plastique non lumineux)
          side: THREE.DoubleSide, // Double face pour voir à l'intérieur
        });        

        textMesh = new THREE.Mesh(textGeometry, material);
        textMesh.position.set(-30, -5, 2);
        scene.add(textMesh);

        isFontLoaded = true;
      }
    );

    function checkFontLoad() {
      if (isFontLoaded) {
        animate();
      } else {
        requestAnimationFrame(checkFontLoad);
      }
    }

    checkFontLoad();

    const camera = new THREE.PerspectiveCamera(45, 300 / 100, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 100);


    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff0f0, 0.7);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.DirectionalLight(0xf0f0ff, 0.3);
    pointLight.position.set(-2, 0, 0);
    scene.add(pointLight);

    camera.position.z = 1000;
    camera.position.x = 0;
    camera.position.y = 20;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 30;

    function animate() {
      controls.update();

      const targetRotationX = mouseY * Math.PI / 4;
      const targetRotationY = mouseX * Math.PI / 4;

      textMesh.rotation.x += (targetRotationX - textMesh.rotation.x) * 0.05;
      textMesh.rotation.y += (targetRotationY - textMesh.rotation.y) * 0.05;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const mount = mountRef.current;
    mount.appendChild(renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = false;

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
