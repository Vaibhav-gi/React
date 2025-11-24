import { useState } from "react";

export function MouseMove(){
  const [styleObj, setStyleObj] = useState({position:'fixed', top:0, left:0});

  function handleMouseMove(e){
    setStyleObj({position:'fixed', top: e.clientY + 'px', left: e.clientX + 'px', transform:'translate(-50%,-50%)', pointerEvents:'none'});
  }

  return(
    <div onMouseMove={handleMouseMove} className="container-fluid" style={{height:'100vh'}}>
      <div style={{height:'1000px'}}>Move mouse pointer to test.</div>
      <img style={styleObj} src="/flag.gif" width={50} height={50} alt="flag" />
    </div>
  )
}
