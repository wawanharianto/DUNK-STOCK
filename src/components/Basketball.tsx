import { useRef, useState, Suspense, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-black">
          <div className="w-32 h-32 rounded-full bg-red-accent/20 animate-pulse border border-red-accent/50" />
        </div>
      );
    }
    return this.props.children;
  }
}

export interface BasketballProps {
  color?: string;
  lineColor?: string;
  initialScale?: number;
  hoverScale?: number;
  rotationSpeed?: number;
  textureType?: 'classic' | 'street' | 'tech' | 'cross';
  position?: [number, number, number];
  view?: 'hero' | 'info' | 'spec' | 'customize';
}

function ProceduralBasketball({ 
  color = "#E60000", 
  lineColor = "#050505",
  initialScale = 2.2, 
  hoverScale = 1.2,
  rotationSpeed = 0.005,
  textureType = 'classic',
  position = [0, 0, 0],
  view = 'hero'
}: BasketballProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const [scale, setScale] = useState(0);
  const [hovered, setHover] = useState(false);
  const currentPos = useRef(new THREE.Vector3(...position));
  const lastView = useRef(view);
  const spinFactor = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth Scale
    const targetScale = hovered ? hoverScale : initialScale;
    setScale(prev => THREE.MathUtils.lerp(prev, targetScale, 0.08));
    
    // Smooth Position
    const targetPos = new THREE.Vector3(...position);
    currentPos.current.lerp(targetPos, 0.08);
    meshRef.current.position.copy(currentPos.current);

    // View-based target rotations
    let targetRotX = 0;
    let targetRotY = 0;
    let targetRotZ = 0;

    if (view !== lastView.current) {
      spinFactor.current = 1.0; // Trigger a spin burst
      lastView.current = view;
    }
    
    // Decay spin burst
    spinFactor.current = THREE.MathUtils.lerp(spinFactor.current, 0, 0.05);

    if (view === 'info') {
      targetRotY = Math.PI * 0.5;
      targetRotX = 0.2;
    } else if (view === 'spec') {
      targetRotY = Math.PI;
      targetRotX = -0.3;
    } else if (view === 'customize') {
      targetRotY = Math.PI * 1.5;
    }

    // Add mouse influence
    const mouseRotX = mouse.y * (hovered ? 1.2 : 0.5);
    const mouseRotY = mouse.x * (hovered ? 1.2 : 0.5);
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX + mouseRotX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY + mouseRotY + (spinFactor.current * Math.PI * 2), 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.05);
    
    meshRef.current.rotation.y += hovered ? rotationSpeed * 4 : rotationSpeed;
  });

  return (
    <group 
      ref={meshRef} 
      scale={scale}
      onPointerOver={() => {
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Main Sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color={color} 
          roughness={textureType === 'street' ? 0.4 : textureType === 'tech' ? 0.05 : 0.15} 
          metalness={textureType === 'tech' ? 0.8 : 0.4} 
          emissive={new THREE.Color(color).multiplyScalar(0.2)}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Basketball Seams */}
      <group>
        {/* Equator */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.002, 0.008, 16, 100]} />
          <meshBasicMaterial color={lineColor} />
        </mesh>
        
        {/* Meridian 1 */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.002, 0.008, 16, 100]} />
          <meshBasicMaterial color={lineColor} />
        </mesh>

        {/* Meridian 2 */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.002, 0.008, 16, 100]} />
          <meshBasicMaterial color={lineColor} />
        </mesh>

        {/* Side Curves */}
        {textureType !== 'tech' && (
          <>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[1.002, 0.006, 16, 100]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <torusGeometry args={[1.002, 0.006, 16, 100]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
          </>
        )}

        {textureType === 'cross' && (
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.005, 0.004, 16, 100]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
        )}
      </group>
    </group>
  );
}

export default function BasketballScene(props: BasketballProps) {
  return (
    <div className="w-full h-full">
      <ErrorBoundary>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
              <ProceduralBasketball {...props} />
            </Float>
            <Environment preset="studio" />
            <ContactShadows 
              position={[0, -2.2, 0]} 
              opacity={0.4} 
              scale={8} 
              blur={2} 
              far={4} 
            />
          </Suspense>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color={props.color || "#E60000"} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
