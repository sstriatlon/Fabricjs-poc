import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { Todo } from './model'
import { Circle, Layer, Line, Rect, Stage, Text, Transformer, Image } from 'react-konva'


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

type test = {

}
const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current?.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const App: React.FC = () => {

  const [formas ,setFormas]=useState<Array<circulo>>(INITIAL_STATE);
  const [selectedId, selectShape] = React.useState<string | null>(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

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
        <Stage 
        width={window.innerWidth} 
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
          <Layer>
            {formas.map((obj, rect)=>{
              return <Rectangle
              shapeProps={obj}
              isSelected={obj.id === selectedId}
              onSelect={() => {
                selectShape(obj.id);
              }}
              onChange={(newAttrs) => {
                const rects = formas.slice();
                rects[rect] = newAttrs;
                setFormas(rects);
                console.log(newAttrs);
              }}
              // id={obj.id} 
              // x={obj.x} 
              // y={obj.y} 
              // radius={obj.radius} 
              // fill={obj.fill} 
              // isDragging={obj.isDragging}
              key={obj.id}
              // onDragStart={handleDragStart}
              // onDragEnd={handleDragEnd}
              //draggable
            />
            })}

          </Layer>
        </Stage>
    </div>
  )
}

export default App
