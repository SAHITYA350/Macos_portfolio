import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      el.style.display = "block";
      gsap.fromTo(
        el, 
        {
        scale: 0.9,
        opacity: 0,
        y: 40,
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    }, [isOpen])

    useGSAP(() => {
  const el = ref.current;
  if (!el || !isOpen) return;

  const drag = Draggable.create(el, {
    type: "x,y",
    onPress: () => focusWindow(windowKey),
  });

  return () => {
    drag[0]?.kill();
  };
}, [isOpen]);


    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      // <section
      //   id={windowKey}
      //   ref={ref}
      //   style={{ zIndex }}
      //   className="absolute"
      //   onMouseDown={() => focusWindow(windowKey)}
      // >
      //   <Component {...props} />
      // </section>

      <section
  id={windowKey}
  ref={ref}
  style={{
    zIndex,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }}
  // focus window on click
  onMouseDown={() => focusWindow(windowKey)}
>
  <Component {...props} />
</section>

    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
