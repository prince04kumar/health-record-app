// src/components/ModelViewer.jsx
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const model = useGLTF('/scene.gltf'); // Path to your 3D model

  return<primitive
  object={model.scene}
  scale={1}
  rotation={[0,Math.PI / 2, 0]} // Rotate 90° on the X-axis
/>;
}

export default function ModelViewer() {
  const canvasRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    let start = null;

    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const x = Math.min((progress / 5000) * window.innerWidth, window.innerWidth);
      canvas.style.transform = `translateX(${x}px)`;

      if (progress < 5000) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Canvas ref={canvasRef} style={{ width: '200vw', height: '80vh', position: 'absolute', left: '-100vw' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableRotate={false} enableZoom={false} />
      </Canvas>
      <div style={{ position:"absolute", width: '70%', height: '20px', backgroundColor: '#ccc', marginTop: '',borderRadius: "20px ", left:"20vw" ,bottom:"44vh" }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#1b58fe' , borderRadius: "20px"}}></div>
        <div style={{ textAlign: 'center' }}>{progress}%</div>
      </div>
      
    </div>
  );
}
