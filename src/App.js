import React from 'react'
import Sketch from 'react-p5'

function clampedUpdate(p5, value, delta, low, high) {
    return Math.min(high, Math.max(low, value + Math.round(p5.random(-delta, delta))));
}

function App() {
    let coefficients = [];
    let r,g,b;
    const resolution = 200;
    const minCoefficient = 0.001;
    const maxCoefficient = 5;
    const maxDelta = 0.1;
    const canvasWidth = 400;
    const setup = (p5, canvasParentRef) => {

        console.debug("running setup")
        p5.createCanvas(500, canvasWidth, p5.WEBGL).parent(canvasParentRef);
        const degree = p5.floor(p5.random(2,6));
        const maxDelta = p5.random(p5.round( 0.1,2 ), 4)
        coefficients = [];
        for(let i = 0; i <= degree; i++){
            coefficients.push(p5.round(p5.random(minCoefficient, maxCoefficient), precision));
        }
        
        r = p5.floor(p5.random(256));
        g = p5.floor(p5.random(256));
        b = p5.floor(p5.random(256));
        p5.background(0);
    };
    
    const precision = 4;
    const colorDelta = 2;
    const draw = p5 => {
        p5.stroke(r,g,b, p5.random(255));
        p5.noFill();

        p5.beginShape();
        const xMin = -10;
        const xMax = 10;
        let numPoints = p5.round(p5.random(resolution/2, 3*resolution/2));
        for(let i = 0; i <= resolution; i++){
            let x = p5.map(i, 0, numPoints, xMin, xMax)
            let y = 0;
            for (let j = 0; j < coefficients.length; j++) {
                y += coefficients[j] * x ** j;
            }
            x = p5.map(x, xMin, xMax, -canvasWidth/2, canvasWidth/2);
            p5.curveVertex(x,y);
        }
        p5.endShape();

        r = clampedUpdate(p5, r, colorDelta, 0, 256);
        g = clampedUpdate(p5, g, colorDelta, 0, 256);
        b = clampedUpdate(p5, b, colorDelta, 0, 256);
        coefficients = coefficients.map(x => x + p5.round(p5.random(-maxDelta, maxDelta),precision));

    };
    
    return <Sketch setup={setup} draw={draw} />
}

export default App


