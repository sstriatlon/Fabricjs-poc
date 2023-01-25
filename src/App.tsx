import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { fabric } from 'fabric';




interface circulo {
  id: string,
  x: number,
  y: number,
  radius: number,
  fill: string,
  isDragging: boolean
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function generateShapes(){
  return [...Array(10)].map((_, i) => ({
      id: i.toString(),
      x: getRandomInt(Math.random() * window.innerWidth),
      y: getRandomInt(Math.random() * window.innerHeight),
      radius: getRandomInt(100),
      fill: 'blue',
      isDragging: false
    }));
}

const INITIAL_STATE = generateShapes()

const App: React.FC = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [imgURL, setImgURL] = useState<string>("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
       height: 800,
       width: 800,
       backgroundColor: 'pink'
    })
 );
 
const addRect = (canvi: fabric.Canvas) => {
  const rect = new fabric.Rect({
    height: 100,
    width: 100,
    fill: 'yellow'
  });
  canvi.add(rect);
  canvi.renderAll();
};

const addImg = (e: React.FormEvent<HTMLFormElement>,
   url: string, canvi: fabric.Canvas) => {
  e.preventDefault();
  
  new fabric.Image.fromURL(url, img => {
    img.scale(0.25);
    canvi.add(img);
    canvi.renderAll();
    setImgURL('');  
  });
}

 return (
    <div className="App">
        <h1>Fabric.js on React - fabric.Canvas('...')</h1>
        <button onClick={() => addRect(canvas)}>Rectangle</button>
        <br/><br/>
        <form onSubmit={e => addImg(e, imgURL, canvas)}>
          <div>
            <input 
                type="text" 
                value={imgURL} 
                onChange={ e => setImgURL(e.target.value)} 
            />
            <button type="submit">Add Image</button>
          </div>
        </form>
        <br/><br/>
        <canvas id="canvas"/>
    </div>
  )
}

export default App
