import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { type CSSProperties, type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react';

export const photographyImages = [
  '/images/beside-work/photography.webp',
  '/images/photography/img_8310.webp',
  '/images/photography/_dsc1819.webp',
  '/images/photography/img_7918.webp',
  '/images/photography/img_8125.webp',
  '/images/photography/_dsc2093.webp',
  '/images/photography/_dsc2162.webp',
  '/images/photography/_dsc0522.webp',
  '/images/photography/_dsc1838.webp',
  '/images/photography/img_8300.webp',
  '/images/photography/_dsc0612.webp',
  '/images/photography/_dsc2295.webp',
  '/images/photography/_dsc2048.webp',
  '/images/photography/img_1539.webp',
  '/images/photography/_dsc0351.webp',
  '/images/photography/_dsc0226.webp',
  '/images/photography/img_1722.webp',
  '/images/photography/_dsc2256.webp',
  '/images/photography/_dsc0323.webp',
  '/images/photography/_dsc1377.webp',
  '/images/photography/img_8307.webp',
  '/images/photography/_dsc0211.webp',
  '/images/photography/_dsc1791.webp',
  '/images/photography/_dsc0248.webp',
  '/images/photography/_dsc0315.webp',
  '/images/photography/_dsc2055.webp',
  '/images/photography/_dsc1761.webp',
  '/images/photography/_dsc2753.webp',
  '/images/photography/img_8170.webp',
  '/images/photography/_dsc0626.webp',
  '/images/photography/_dsc0389.webp',
  '/images/photography/img_7271.webp',
  '/images/photography/_dsc1369.webp',
  '/images/photography/img_8037.webp',
  '/images/photography/_dsc0046.webp',
  '/images/photography/img_7823.webp',
  '/images/photography/img_8030.webp',
  '/images/photography/img_0543.webp',
  '/images/photography/_dsc0156.webp',
  '/images/photography/_dsc0146.webp',
  '/images/photography/_dsc2983.webp',
  '/images/photography/img_8106.webp',
  '/images/photography/_dsc1807.webp',
  '/images/photography/_dsc1698.webp',
  '/images/photography/img_8288.webp',
  '/images/photography/_dsc0313.webp',
  '/images/photography/_dsc0200.webp',
  '/images/photography/_dsc0484.webp',
  '/images/photography/_dsc2073.webp',
  '/images/photography/_dsc2101.webp',
  '/images/photography/_dsc2207.webp',
  '/images/photography/_dsc0354.webp',
  '/images/photography/_dsc0135.webp',
  '/images/photography/_dsc2001.webp',
  '/images/photography/_dsc1414.webp',
  '/images/photography/img_8309.webp',
  '/images/photography/a72013bfa529e2cdd088ab0eb6f3d22e.webp',
  '/images/photography/_dsc0098.webp',
];

const renderedOffsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

export function PhotographyGallery({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<-1 | 0 | 1>(0);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const activeImage = useRef<HTMLImageElement>(null);
  const dragStart = useRef<number | null>(null);
  const count = photographyImages.length;
  const move = (step: number) => {
    setDirection(step < 0 ? -1 : 1);
    setActive((current) => (current + step + count) % count);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const step = event.key === 'ArrowLeft' ? -1 : 1;
        setDirection(step);
        setActive((current) => (current + step + count) % count);
      }
      if (event.key === 'Tab') {
      const controls = [
        ...(dialog.current?.querySelectorAll<HTMLButtonElement>('button:not([aria-hidden="true"])') ?? []),
      ];
        if (!controls.length) return;
        const current = controls.indexOf(document.activeElement as HTMLButtonElement);
        const next = event.shiftKey
          ? (current - 1 + controls.length) % controls.length
          : (current + 1) % controls.length;
        event.preventDefault();
        controls[next].focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const measure = () => stage.current?.style.setProperty('--active-half', `${(activeImage.current?.getBoundingClientRect().width ?? 0) / 2}px`);
    const frame = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
    };
  }, [active]);

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart.current !== null && Math.abs(event.clientX - dragStart.current) > 45) {
      move(event.clientX < dragStart.current ? 1 : -1);
    }
    dragStart.current = null;
  };

  return (
    <div ref={dialog} className="photo-gallery" role="dialog" aria-modal="true" aria-label="Photography gallery">
      <button ref={closeButton} type="button" className="photo-gallery__close" aria-label="Close gallery" onClick={onClose}>
        <X aria-hidden="true" />
      </button>
      <div
        className="photo-gallery__carousel"
        role="group"
        aria-roledescription="carousel"
        aria-label="Photography depth carousel"
        onPointerDown={(event) => { dragStart.current = event.clientX; }}
        onPointerUp={finishDrag}
        onPointerCancel={() => { dragStart.current = null; }}
      >
        <div ref={stage} className="photo-gallery__stage" data-direction={direction < 0 ? 'previous' : direction > 0 ? 'next' : 'idle'}>
          {renderedOffsets.map((offset) => {
            const index = (active + offset + count) % count;
            const isBuffer = Math.abs(offset) === 4;
            return (
              <button
                type="button"
                className="photo-gallery__card"
                data-active={offset === 0}
                data-buffer={isBuffer}
                data-offset={offset}
                data-side={offset < 0 ? 'left' : offset > 0 ? 'right' : 'center'}
                style={{ '--depth': Math.abs(offset) } as CSSProperties}
                aria-hidden={isBuffer || undefined}
                tabIndex={isBuffer ? -1 : undefined}
                aria-label={isBuffer ? undefined : offset === 0 ? `Photo ${index + 1} of ${count}` : `Go to photo ${index + 1}`}
                onClick={() => offset && move(offset)}
                key={index}
              >
                <img
                  ref={offset === 0 ? activeImage : undefined}
                  src={photographyImages[index]}
                  alt={offset === 0 ? `Photography gallery image ${index + 1}` : ''}
                  draggable="false"
                  decoding="async"
                  onLoad={() => stage.current?.style.setProperty('--active-half', `${(activeImage.current?.getBoundingClientRect().width ?? 0) / 2}px`)}
                />
              </button>
            );
          })}
        </div>
        <button type="button" className="photo-gallery__arrow photo-gallery__arrow--previous" aria-label="Previous photo" onClick={() => move(-1)}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" className="photo-gallery__arrow photo-gallery__arrow--next" aria-label="Next photo" onClick={() => move(1)}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
      <p className="photo-gallery__counter" aria-live="polite">{active + 1} / {count}</p>
    </div>
  );
}
