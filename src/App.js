import React from 'react'
import Sketch from 'react-p5'

function clamped_update(p5, value, delta, low, high) {
    const num = Math.min(high, Math.max(low, value + p5.random(-delta, delta)));
    return Math.floor(num);
}

function App() {
    let degree = 3;
    let coefficients = [];
    let r,g,b;
    const min_coefficient = 0.001;
    const max_coefficient = 5;
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 400).parent(canvasParentRef);
        for(let i = 0; i < degree; i++){
            coefficients.push(p5.random(min_coefficient, max_coefficient));
        }
        p5.background(255, 130, 20);
        r = p5.floor(p5.random(256));
        g = p5.floor(p5.random(256));
        b = p5.floor(p5.random(256));
    }
    
    const color_delta = 2;
    const draw = p5 => {
        p5.stroke(r,g,b);
        p5.noFill();
        p5.circle(100,100,100);


        console.log(r)
        r = clamped_update(p5, r, color_delta, 0, 256);
        g = clamped_update(p5, g, color_delta, 0, 256);
        b = clamped_update(p5, b, color_delta, 0, 256);
    }
    
    return <Sketch setup={setup} draw={draw} />
}

export default App


