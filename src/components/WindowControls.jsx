import useWindowStore from "#store/window.js";

const WindowControlls = ({ target }) => {
  const { closeWindow, minimizeWindow, toggleMaximize } = useWindowStore();
  return (
    <div id="window-controls">
        <div className="close" onClick={() => closeWindow(target)} />
        <div className="minimize" onClick={() => minimizeWindow(target)} />
        <div className="maximize" onClick={() => toggleMaximize(target)}  />
           
        </div>
  )
}

export default WindowControlls;