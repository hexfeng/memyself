declare module 'vanta/dist/vanta.fog.min' {
  type FogFactory = (options: Record<string, unknown>) => { destroy: () => void };
  const fog: FogFactory | { default: FogFactory };
  export default fog;
}

declare module 'vanta/dist/vanta.net.min' {
  type NetFactory = (options: Record<string, unknown>) => { destroy: () => void };
  const net: NetFactory | { default: NetFactory };
  export default net;
}

declare module 'three';
