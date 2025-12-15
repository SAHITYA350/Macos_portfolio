import { dockApps } from '#constants';
import { Tooltip } from 'react-tooltip';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Dock = () => {
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current; 
    if (!dock) return;

    const icons = dock.querySelectorAll('.dock-icon');

    const animation = (mouseX) => {

      const { left } = dock.getBoundingClientRect();

   icons.forEach((icon) => {
  const { left: iconLeft, width } = icon.getBoundingClientRect();
  const center = iconLeft - left + width / 2;
  const distance = Math.abs(mouseX - center);

  // macOS-like falloff
  const intensity = Math.exp(-(distance ** 2.7) / 20000);

  // ✅ STOP far icons from moving
  if (intensity < 0.02) {
    gsap.to(icon, {
      scale: 1,
      y: 0,
      duration: 0.15,
      ease: 'power2.out',
    });
    return;
  }

  gsap.to(icon, {
    scale: 1 + 0.35 * intensity,
    y: -18 * intensity,
    duration: 0.18,
    ease: 'power2.out',
  });
});

    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animation(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
        })
      );
    };

    // ✅ EVENTS IN CORRECT SCOPE
    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', resetIcons);

    // ✅ CLEANUP (IMPORTANT)
    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', resetIcons);
    };
  }, []);

  const toggleApp = (app) => {
    // TODO Implement app opening logic
    console.log(`Toggling app: ${app.id}`);
    
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? '' : 'opacity-60'}
                draggable={false}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
