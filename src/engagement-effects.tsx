import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

export type DriftWallItem = {
  image: string;
};

export type LogoLoopItem = {
  height: number;
  name: string;
  offsetY?: number;
  preserveDetail?: boolean;
  slotWidth: number;
  src: string;
  width: number;
};

function useViewportAnimation(ref: RefObject<HTMLElement | null>) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: '220px 0px', threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return { isNearViewport, reducedMotion };
}

function getWallGeometry(width: number) {
  if (width < 460) return { columns: 2, gap: 14, tileHeight: 108, tileWidth: 138 };
  if (width < 680) return { columns: 3, gap: 16, tileHeight: 124, tileWidth: 158 };
  return { columns: 4, gap: 18, tileHeight: 146, tileWidth: 180 };
}

export function DriftWall({ items, theme }: { items: DriftWallItem[]; theme: Theme }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<Array<HTMLDivElement | null>>([]);
  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColumnRef = useRef(-1);
  const lastTimestampRef = useRef<number | null>(null);
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ height: 540, width: 760 });
  const { isNearViewport, reducedMotion } = useViewportAnimation(containerRef);
  const geometry = getWallGeometry(containerSize.width);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const update = () => setContainerSize({ height: node.clientHeight || 540, width: node.clientWidth || 760 });
    update();
    if (!('ResizeObserver' in window)) return;
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const columnItems = useMemo(() => {
    const columns = Array.from({ length: geometry.columns }, () => [] as DriftWallItem[]);
    items.forEach((item, index) => columns[index % geometry.columns].push(item));
    return columns;
  }, [geometry.columns, items]);

  const columnMeta = useMemo(() => {
    const unit = geometry.tileHeight + geometry.gap;
    return columnItems.map((column) => {
      const copyHeight = Math.max(unit, column.length * unit);
      return {
        copies: Math.max(3, Math.ceil((containerSize.height * 1.6) / copyHeight) + 2),
        copyHeight,
      };
    });
  }, [columnItems, containerSize.height, geometry.gap, geometry.tileHeight]);

  const baseVelocities = useMemo(() => {
    const speed = geometry.columns === 2 ? 22 : geometry.columns === 3 ? 28 : 32;
    return columnItems.map((_, index) => {
      const variance = (((index * 0.6180339887 + 0.35) % 1) * 2 - 1) * 0.15;
      return speed * (1 + variance) * (index % 2 === 0 ? 1 : -1);
    });
  }, [columnItems, geometry.columns]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, index) => meta.copyHeight * ((index * 0.37) % 1));
    velocitiesRef.current = columnMeta.map(() => 0);
  }, [columnMeta]);

  useEffect(() => {
    if (!isNearViewport || reducedMotion) return;

    let frame = 0;
    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const delta = Math.min(0.05, Math.max(0, timestamp - lastTimestampRef.current) / 1000);
      lastTimestampRef.current = timestamp;

      columnMeta.forEach((meta, index) => {
        const target = hoveredColumnRef.current === index ? 0 : baseVelocities[index];
        const easing = 1 - Math.exp(-delta / (target === 0 ? 0.16 : 0.28));
        velocitiesRef.current[index] += (target - velocitiesRef.current[index]) * easing;
        const next = ((offsetsRef.current[index] + velocitiesRef.current[index] * delta) % meta.copyHeight + meta.copyHeight) % meta.copyHeight;
        offsetsRef.current[index] = next;
        if (trackRefs.current[index]) trackRefs.current[index]!.style.transform = `translate3d(0, ${-next}px, 0)`;
      });

      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      lastTimestampRef.current = null;
    };
  }, [baseVelocities, columnMeta, isNearViewport, reducedMotion]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const target = (event.target as Element).closest<HTMLElement>('[data-drift-tile]');
    const id = target?.dataset.driftTile ?? null;
    if (id === activeTile) return;
    setActiveTile(id);
    hoveredColumnRef.current = target ? Number(target.dataset.column) : -1;
  }, [activeTile]);

  const style = {
    '--drift-dim': theme === 'dark' ? 0.72 : 0.84,
    '--drift-gap': `${geometry.gap}px`,
    '--drift-overlay': theme === 'dark' ? '#0b0c0f' : '#f1f4fa',
    '--drift-radius': geometry.columns === 2 ? '10px' : '14px',
    '--drift-tile-height': `${geometry.tileHeight}px`,
    '--drift-tile-width': `${geometry.tileWidth}px`,
  } as CSSProperties;

  if (reducedMotion) {
    return (
      <div ref={containerRef} className="engagement-drift-wall engagement-drift-wall--reduced" style={style} role="img" aria-label="Engagement moments">
        <div className="engagement-drift-wall__static" aria-hidden="true">
          {items.slice(0, 8).map((item) => <img key={item.image} src={item.image} alt="" decoding="async" />)}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="engagement-drift-wall"
      style={style}
      role="img"
      aria-label="Engagement moments"
      onPointerLeave={() => {
        hoveredColumnRef.current = -1;
        setActiveTile(null);
      }}
      onPointerMove={handlePointerMove}
    >
      <div className="engagement-drift-wall__plane" aria-hidden="true">
        {columnItems.map((column, columnIndex) => (
          <div className="engagement-drift-wall__column" key={`column-${columnIndex}`}>
            <div
              className="engagement-drift-wall__track"
              ref={(node) => { trackRefs.current[columnIndex] = node; }}
            >
              {Array.from({ length: columnMeta[columnIndex].copies }, (_, copyIndex) => (
                column.map((item, itemIndex) => {
                  const id = `${columnIndex}-${copyIndex}-${itemIndex}`;
                  return (
                    <div
                      className={`engagement-drift-wall__tile${activeTile === id ? ' is-active' : ''}`}
                      data-column={columnIndex}
                      data-drift-tile={id}
                      key={id}
                    >
                      <span><img src={item.image} alt="" decoding="async" draggable={false} /></span>
                    </div>
                  );
                })
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoLoop({ logos, theme }: { logos: LogoLoopItem[]; theme: Theme }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const lastTimestampRef = useRef<number | null>(null);
  const [copyCount, setCopyCount] = useState(2);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const { isNearViewport, reducedMotion } = useViewportAnimation(containerRef);

  const measure = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const width = sequenceRef.current?.getBoundingClientRect().width ?? 0;
    if (!width) return;
    setSequenceWidth(Math.ceil(width));
    setCopyCount(Math.max(2, Math.ceil(containerWidth / width) + 2));
  }, []);

  useLayoutEffect(() => {
    measure();
    if (!('ResizeObserver' in window)) return;
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    if (sequenceRef.current) observer.observe(sequenceRef.current);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    const images = sequenceRef.current?.querySelectorAll('img') ?? [];
    images.forEach((image) => image.addEventListener('load', measure, { once: true }));
    return () => images.forEach((image) => image.removeEventListener('load', measure));
  }, [measure]);

  useEffect(() => {
    if (!isNearViewport || reducedMotion || sequenceWidth <= 0) return;
    let frame = 0;
    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const delta = Math.min(0.05, Math.max(0, timestamp - lastTimestampRef.current) / 1000);
      lastTimestampRef.current = timestamp;
      offsetRef.current = (offsetRef.current + 54 * delta) % sequenceWidth;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      lastTimestampRef.current = null;
    };
  }, [isNearViewport, reducedMotion, sequenceWidth]);

  const style = {
    '--logo-loop-fade': theme === 'dark' ? '#191c23' : '#f1f4fa',
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`engagement-logo-loop${reducedMotion ? ' engagement-logo-loop--reduced' : ''}`}
      style={style}
      role="group"
      aria-label="Selected ecosystem"
    >
      <div ref={trackRef} className="engagement-logo-loop__track">
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            ref={copyIndex === 0 ? sequenceRef : undefined}
            className="engagement-logo-loop__list"
            aria-hidden={copyIndex > 0}
            key={`logo-copy-${copyIndex}`}
          >
            {logos.map((logo) => (
              <li
                className="engagement-logo-loop__item"
                data-preserve-detail={logo.preserveDetail || undefined}
                key={`${copyIndex}-${logo.name}`}
                style={{
                  '--logo-height': `${Math.round((logo.height * 2) / 3 * 100) / 100}px`,
                  '--logo-offset-y': `${logo.offsetY ?? 0}px`,
                  '--logo-slot-width': `${logo.slotWidth}px`,
                  '--logo-width': `${Math.round((logo.width * 2) / 3 * 100) / 100}px`,
                } as CSSProperties}
              >
                <img src={logo.src} alt={copyIndex === 0 ? logo.name : ''} decoding="async" draggable={false} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
