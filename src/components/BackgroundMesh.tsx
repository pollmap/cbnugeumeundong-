"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 220;
const MAX_EDGE_DIST = 150;
const HIGHLIGHT = new THREE.Color(0xffffff);
const BASE_COLOR = new THREE.Color(0x1a1a2e);
const MOUSE_RADIUS = 200;

export default function BackgroundMesh() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Nodes
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 800,
          (Math.random() - 0.5) * 600,
          (Math.random() - 0.5) * 400
        )
      );
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.1
        )
      );
    }

    // Points geometry
    const pointsGeo = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(NODE_COUNT * 3);
    const pointColors = new Float32Array(NODE_COUNT * 3);
    pointsGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(pointPositions, 3)
    );
    pointsGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(pointColors, 3)
    );

    const pointsMat = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    // Edges geometry
    const maxEdges = NODE_COUNT * 6;
    const linePositions = new Float32Array(maxEdges * 6);
    const lineColors = new Float32Array(maxEdges * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Mouse
    const mouse = new THREE.Vector2(9999, 9999);

    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouseMove);

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    // Animation loop
    let frameId: number;
    const tempVec = new THREE.Vector3();

    function animate() {
      frameId = requestAnimationFrame(animate);

      // Project mouse to 3D
      const mouseWorld = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      mouseWorld.unproject(camera);
      const dir = mouseWorld.sub(camera.position).normalize();
      const mousePos3D = camera.position
        .clone()
        .add(dir.multiplyScalar(500));

      // Update node positions
      for (let i = 0; i < NODE_COUNT; i++) {
        positions[i].add(velocities[i]);

        // Bounce
        if (Math.abs(positions[i].x) > 400)
          velocities[i].x *= -1;
        if (Math.abs(positions[i].y) > 300)
          velocities[i].y *= -1;
        if (Math.abs(positions[i].z) > 200)
          velocities[i].z *= -1;

        pointPositions[i * 3] = positions[i].x;
        pointPositions[i * 3 + 1] = positions[i].y;
        pointPositions[i * 3 + 2] = positions[i].z;

        // Color based on mouse proximity
        const distToMouse = positions[i].distanceTo(mousePos3D);
        const t = Math.max(0, 1 - distToMouse / MOUSE_RADIUS);
        const color = BASE_COLOR.clone().lerp(HIGHLIGHT, t * 0.8);
        pointColors[i * 3] = color.r;
        pointColors[i * 3 + 1] = color.g;
        pointColors[i * 3 + 2] = color.b;
      }

      // Update edges
      let edgeIdx = 0;
      for (let i = 0; i < NODE_COUNT && edgeIdx < maxEdges; i++) {
        for (let j = i + 1; j < NODE_COUNT && edgeIdx < maxEdges; j++) {
          const dist = positions[i].distanceTo(positions[j]);
          if (dist < MAX_EDGE_DIST) {
            const midpoint = tempVec
              .copy(positions[i])
              .add(positions[j])
              .multiplyScalar(0.5);
            const distToMouse = midpoint.distanceTo(mousePos3D);
            const t = Math.max(0, 1 - distToMouse / MOUSE_RADIUS);
            const edgeColor = BASE_COLOR.clone().lerp(HIGHLIGHT, t * 0.6);

            const idx = edgeIdx * 6;
            linePositions[idx] = positions[i].x;
            linePositions[idx + 1] = positions[i].y;
            linePositions[idx + 2] = positions[i].z;
            linePositions[idx + 3] = positions[j].x;
            linePositions[idx + 4] = positions[j].y;
            linePositions[idx + 5] = positions[j].z;

            lineColors[idx] = edgeColor.r;
            lineColors[idx + 1] = edgeColor.g;
            lineColors[idx + 2] = edgeColor.b;
            lineColors[idx + 3] = edgeColor.r;
            lineColors[idx + 4] = edgeColor.g;
            lineColors[idx + 5] = edgeColor.b;

            edgeIdx++;
          }
        }
      }

      // Zero out remaining edges
      for (let i = edgeIdx * 6; i < maxEdges * 6; i++) {
        linePositions[i] = 0;
        lineColors[i] = 0;
      }

      lineGeo.setDrawRange(0, edgeIdx * 2);
      pointsGeo.attributes.position.needsUpdate = true;
      pointsGeo.attributes.color.needsUpdate = true;
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // Slow rotation
      scene.rotation.y += 0.0005;
      scene.rotation.x += 0.0002;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
