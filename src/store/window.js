import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    // openWindow: (windowKey, data = null) =>
    //   set((state) => {
    //     const win = state.windows[windowKey];
    //     if (!win) return;

    //     win.isOpen = true;
    //     win.zIndex = state.nextZIndex;
    //     win.data = data ?? win.data;
    //     state.nextZIndex++;
    //   }),

    openWindow: (windowKey, data = null) =>
  set((state) => {
    const win = state.windows[windowKey];
    if (!win) return;

    win.isOpen = true;
    win.isMinimized = false;
    win.isMaximized = false;
    win.zIndex = state.nextZIndex++;
    win.data = data ?? win.data;
    win.prevPosition = win.prevPosition || { top: null, left: null, width: null, height: null };
  }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win || !win.isOpen) return;

        win.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),

      minimizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMinimized = true;
      }),

      // toggleMaximize: (windowKey) =>
      //   set((state) => {
      //     const win = state.windows[windowKey];
      //     if (!win) return;

      //     win.isMaximized = !win.isMaximized;
      //     win.zIndex = state.nextZIndex++;
      //   }),

  toggleMaximize: (windowKey) =>
  set((state) => {
    const win = state.windows[windowKey];
    if (!win) return;

    if (!win.isMaximized) {
      // Save current position/size
      const el = document.getElementById(windowKey);
      if (el) {
        win.prevPosition = {
          top: el.style.top,
          left: el.style.left,
          width: el.style.width,
          height: el.style.height,
        };
      }
    }

    win.isMaximized = !win.isMaximized;
    win.zIndex = state.nextZIndex++;
  }),

      restoreWindow: (windowKey) =>
        set((state) => {
          const win = state.windows[windowKey];
          if (!win) return;
          win.isMinimized = false;
          win.zIndex = state.nextZIndex++;
        }),

  }))
);

export default useWindowStore;

