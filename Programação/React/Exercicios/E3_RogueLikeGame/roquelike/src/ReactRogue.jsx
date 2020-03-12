import React, {useRef, useEffect} from "react";

const ReactRogue = ({width, height, tilesize}) =>{
    const canvasRef = React.useRef();
    useEffect(()=>{
        console.log("Draw a troll");
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, width * tilesize, height * tilesize);
        ctx.fillStyle = "#000";
        ctx.fillRect(12, 22, 16, 16);
    });
    return(
    <canvas ref={canvasRef} width = {width * tilesize} height = {height * tilesize} style={{border:"1px solid black"}}>
        
    </canvas>
)};

export default ReactRogue;