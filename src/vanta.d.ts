declare module 'vanta/dist/vanta.fog.min' {
  type FogFactory = (options: Record<string, unknown>) => { destroy: () => void };
  const fog: FogFactory | { default: FogFactory };
  export default fog;
}

declare module 'three';
