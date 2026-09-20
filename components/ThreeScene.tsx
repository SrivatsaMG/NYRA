"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const AMBER = 0xe8a33d;
const ROOF = 0xc9822e;
const WALL = 0xede7da;
const BLUEPRINT_LINE = 0x3a5170;
const NAVY = 0x1c2b3d;
const STONE = 0x8b8378;
const FOLIAGE = 0x3f6b4a;
const TRUNK = 0x5b4636;
const BG_BUILDING = 0x223349;

function buildHouse() {
  const house = new THREE.Group();

  // main structure
  const wallGeo = new THREE.BoxGeometry(4, 2.6, 3.4);
  const wallMat = new THREE.MeshStandardMaterial({
    color: WALL,
    roughness: 0.85,
    metalness: 0.03,
  });
  const walls = new THREE.Mesh(wallGeo, wallMat);
  walls.position.y = 1.3;
  house.add(walls);

  const wallEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(wallGeo),
    new THREE.LineBasicMaterial({ color: BLUEPRINT_LINE })
  );
  wallEdges.position.y = 1.3;
  house.add(wallEdges);

  // hip roof (square pyramid on a 4-sided cone)
  const roofGeo = new THREE.ConeGeometry(3.0, 1.7, 4);
  roofGeo.rotateY(Math.PI / 4);
  const roofMat = new THREE.MeshStandardMaterial({
    color: ROOF,
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true,
  });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 2.6 + 1.7 / 2;
  house.add(roof);

  const roofEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(roofGeo),
    new THREE.LineBasicMaterial({ color: 0x7a4f1e })
  );
  roofEdges.position.copy(roof.position);
  house.add(roofEdges);

  // door (front)
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 1.5, 0.08),
    new THREE.MeshStandardMaterial({ color: NAVY, roughness: 0.6 })
  );
  door.position.set(-0.9, 0.75, 1.74);
  house.add(door);

  // windows, lit amber — front, back and both sides so the house
  // reads well from every angle, not just the original "front" view
  const windowMat = new THREE.MeshStandardMaterial({
    color: AMBER,
    emissive: AMBER,
    emissiveIntensity: 0.55,
    roughness: 0.4,
  });

  [0.5, 1.4].forEach((x) => {
    const front = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.06), windowMat);
    front.position.set(x, 1.6, 1.74);
    house.add(front);

    const back = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.06), windowMat);
    back.position.set(x - 1.9, 1.6, -1.74);
    house.add(back);
  });

  [-0.6, 0.6].forEach((z) => {
    const right = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.55, 0.55), windowMat);
    right.position.set(2.03, 1.6, z);
    house.add(right);

    const left = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.55, 0.55), windowMat);
    left.position.set(-2.03, 1.6, z);
    house.add(left);
  });

  // chimney
  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 1.1, 0.4),
    new THREE.MeshStandardMaterial({ color: STONE, roughness: 0.9 })
  );
  chimney.position.set(-1.3, 3.55, -0.9);
  house.add(chimney);

  return house;
}

function buildTree(scale = 1) {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.6, 6),
    new THREE.MeshStandardMaterial({ color: TRUNK, roughness: 0.9 })
  );
  trunk.position.y = 0.3;
  tree.add(trunk);

  const foliage = new THREE.Mesh(
    new THREE.ConeGeometry(0.55, 1.1, 6),
    new THREE.MeshStandardMaterial({ color: FOLIAGE, roughness: 0.85, flatShading: true })
  );
  foliage.position.y = 1.15;
  tree.add(foliage);

  tree.scale.setScalar(scale);
  return tree;
}

function buildBackgroundBlock() {
  const geo = new THREE.BoxGeometry(1.8, 4.2, 1.8);
  const mat = new THREE.MeshStandardMaterial({
    color: BG_BUILDING,
    roughness: 0.9,
    metalness: 0.05,
  });
  const block = new THREE.Group();
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = 2.1;
  block.add(mesh);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({ color: AMBER })
  );
  edges.position.y = 2.1;
  block.add(edges);

  return block;
}

function buildCrane() {
  const craneGroup = new THREE.Group();
  const craneMat = new THREE.LineBasicMaterial({ color: AMBER });
  const craneLine = (points: [number, number, number][]) => {
    const geo = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(...p))
    );
    return new THREE.Line(geo, craneMat);
  };

  const mastTop = 6.4;
  craneGroup.add(craneLine([[0, 0, 0], [0, mastTop, 0]]));
  craneGroup.add(craneLine([[0, mastTop, 0], [3, mastTop, 0]]));
  craneGroup.add(craneLine([[0, mastTop, 0], [-1, mastTop - 0.8, 0]]));
  craneGroup.add(craneLine([[0, mastTop - 0.5, 0], [2.7, mastTop, 0]]));
  craneGroup.add(craneLine([[2.3, mastTop, 0], [2.3, mastTop - 1.8, 0]]));
  return craneGroup;
}

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const figure = figureRef.current;
    if (!canvas || !figure) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(6.8, 5.3, 9.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0x8a95a8, 1.1));
    const dirLight = new THREE.DirectionalLight(0xfff3e0, 1.0);
    dirLight.position.set(5, 10, 6);
    scene.add(dirLight);
    // a second, softer light from the opposite side so the far side of the
    // house still reads once it's rotated into view, not just the front
    const fillLight = new THREE.DirectionalLight(0x9fb4d8, 0.45);
    fillLight.position.set(-6, 4, -8);
    scene.add(fillLight);

    const world = new THREE.Group();
    scene.add(world);

    const grid = new THREE.GridHelper(14, 14, BLUEPRINT_LINE, BLUEPRINT_LINE);
    (grid.material as THREE.Material).opacity = 0.5;
    (grid.material as THREE.Material).transparent = true;
    world.add(grid);

    const house = buildHouse();
    house.position.set(-0.6, 0, 0.2);
    world.add(house);

    const treeA = buildTree(1);
    treeA.position.set(-2.9, 0, 1.6);
    world.add(treeA);

    const treeB = buildTree(0.75);
    treeB.position.set(-3.3, 0, 0.2);
    world.add(treeB);

    const bgBlock = buildBackgroundBlock();
    bgBlock.position.set(4.3, 0, -3.3);
    world.add(bgBlock);

    const crane = buildCrane();
    crane.position.set(5.6, 0, -1.2);
    world.add(crane);

    // orbit target: roughly the centre of the house, a little above ground
    const target = new THREE.Vector3(-0.3, 1.5, 0.2);
    camera.lookAt(target);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false; // keep page scroll working over the canvas
    controls.enablePan = false;
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 1.1;
    // keep the camera from dropping below ground level or flipping overhead
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI / 2 - 0.03;
    controls.update();

    function resize() {
      if (!figure) return;
      const w = figure.clientWidth;
      const h = figure.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener("resize", resize);
    resize();

    let frameId = 0;
    function animate() {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
    figure.classList.add("three-ready");

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      figure.classList.remove("three-ready");
      controls.dispose();
      scene.traverse((obj: THREE.Object3D) => {
        const withGeom = obj as THREE.Object3D & {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };
        if (withGeom.geometry) withGeom.geometry.dispose();
        if (withGeom.material) {
          if (Array.isArray(withGeom.material)) {
            withGeom.material.forEach((m: THREE.Material) => m.dispose());
          } else {
            withGeom.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-figure" id="heroFigure" ref={figureRef} aria-hidden="true">
      <canvas id="heroCanvas" ref={canvasRef} />
      <svg viewBox="0 0 480 560" className="blueprint-svg" id="heroSvgFallback">
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1.2" fill="rgba(251,250,247,0.18)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="480" height="560" fill="url(#dots)" />
        <polygon points="140,260 340,260 340,480 140,480" fill="none" stroke="#FBFAF7" strokeWidth="2" />
        <polygon points="120,260 240,150 360,260" fill="none" stroke="#F2A93B" strokeWidth="2" />
        <rect x="220" y="380" width="40" height="100" fill="none" stroke="#F2A93B" strokeWidth="2" />
        <rect x="165" y="300" width="35" height="35" fill="none" stroke="#FBFAF7" strokeWidth="1.5" />
        <rect x="280" y="300" width="35" height="35" fill="none" stroke="#FBFAF7" strokeWidth="1.5" />
        <line x1="60" y1="480" x2="420" y2="480" stroke="#FBFAF7" strokeWidth="2" />
      </svg>
    </div>
  );
}
