import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { Todo } from './model'
import { Circle, Layer, Line, Rect, Stage, Text } from 'react-konva'


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

  const [formas ,setFormas]=useState<Array<circulo>>(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setFormas(
      formas.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setFormas(
      formas.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

 return (
    <div className="App">
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
          
            {formas?.map((obj)=>{
              return <Circle
              id={obj.id} 
              x={obj.x} 
              y={obj.y} 
              radius={obj.radius} 
              fill={obj.fill} 
              isDragging={obj.isDragging}
              key={obj.id}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              draggable
            />
            })}

          </Layer>
        </Stage>
    </div>
  )
}

export default App
