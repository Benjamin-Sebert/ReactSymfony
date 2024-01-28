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

    const scene = new THREE.Scene();

    const setupFont = (font) => {
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

      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
      textGeometry.translate(-textWidth / 2, 0, 0);

      const material = new THREE.MeshStandardMaterial({
        color: '#4d4dff',
        roughness: 0.5,
        metalness: 0.1,
        emissive: '#000000',
        side: THREE.DoubleSide,
      });

      textMesh = new THREE.Mesh(textGeometry, material);
      textMesh.position.set(0, -5, 2);
      scene.add(textMesh);

      isFontLoaded = true;
    };

    const loadFont = () => {
      const loader = new FontLoader();
      loader.load(
        'https://unpkg.com/three@0.77.0/examples/fonts/droid/droid_serif_bold.typeface.json',
        setupFont
      );
    };

    const checkFontLoad = () => {
      if (isFontLoaded) {
        animate();
      } else {
        requestAnimationFrame(checkFontLoad);
      }
    };

    const setupLights = () => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 3);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xfff0f0, 0.7);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      const pointLight = new THREE.DirectionalLight(0xf0f0ff, 0.3);
      pointLight.position.set(-2, 0, 0);
      scene.add(pointLight);
    };

    const setupCamera = () => {
      const camera = new THREE.PerspectiveCamera(45, 300 / 100, 0.1, 1000);
      camera.position.z = 1000;
      camera.position.x = 0;
      camera.position.y = 20;
      return camera;
    };

    const setupRenderer = () => {
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(300, 100);
      return renderer;
    };

    const setupControls = (camera, renderer) => {
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 20;
      controls.maxDistance = 30;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableRotate = false;
      return controls;
    };

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const animate = () => {
      controls.update();

      const targetRotationX = mouseY * Math.PI / 4;
      const targetRotationY = mouseX * Math.PI / 4;

      textMesh.rotation.x += (targetRotationX - textMesh.rotation.x) * 0.05;
      textMesh.rotation.y += (targetRotationY - textMesh.rotation.y) * 0.05;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    document.addEventListener('mousemove', handleMouseMove);

    const mount = mountRef.current;
    const camera = setupCamera();
    const renderer = setupRenderer();
    const controls = setupControls(camera, renderer);

    setupLights();
    loadFont();
    checkFontLoad();

    mount.appendChild(renderer.domElement);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
