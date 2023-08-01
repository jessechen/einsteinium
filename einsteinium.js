const gridLength = 60;
const root3 = Math.sqrt(3);
const verticalGridLength = gridLength * root3 / 2;
const longSide = gridLength / 2;
const shortSide = gridLength / (2 * root3);
const shapes = [];
let canvasWidth, canvasHeight;
let currentRotation = 0;

function draw() {
}

function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth, canvasHeight);
    background(240);
    noLoop();
    shapes.push(new Hat(new Vertex(1, 1), 0, false));
    shapes.push(new Hat(new Vertex(1, 3), 1/6 * TAU, false));
    shapes.push(new Hat(new Vertex(3, 1), 5/6 * TAU, false));
    update();
}

function mouseMoved() {
    update();
}

function mouseClicked() {
    shapes.push(new Hat(new Point(mouseX, mouseY).toVertex().alignToGrid(), currentRotation, false));
    update();
}

function keyTyped() {
    if (key === 'q') {
        // rotate left
        currentRotation += 1/6 * TAU;
        if (currentRotation > TAU) {
            currentRotation = 1/6 * TAU;
        }
        update();
    } else if (key === 'e') {
        // rotate right
        currentRotation -= 1/6 * TAU;
        if (currentRotation < 0) {
            currentRotation = 5/6 * TAU;
        }
        update();
    }
}

function update() {
    background(240);
    drawGrid();
    drawShapes();
}

function drawGrid() {
    strokeWeight(1);
    stroke(color(0, 144, 0));
    let x = nextMultiple(-canvasHeight / root3, gridLength);
    while (x < canvasWidth + canvasHeight / root3) {
        line(x, 0, x + canvasHeight / root3, canvasHeight);
        line(x, 0, x - canvasHeight / root3, canvasHeight);
        x += gridLength;
    }
    let y = 0;
    while (y < canvasHeight) {
        line(0, y, canvasWidth, y);
        y += verticalGridLength;
    }
}

function nextMultiple(value, stepSize) {
    if (value > 0) {
        return ceil(value / stepSize) * stepSize;
    } else {
        return floor(value / stepSize) * stepSize;
    }
}

function drawShapes() {
    for (let shape of shapes) {
        shape.draw();
    }
    const nearestVertex = new Point(mouseX, mouseY).toVertex().alignToGrid();
    new Hat(nearestVertex, currentRotation, false).draw();
}

function move(p0, distance, angle) {
    return new Point(p0.x + distance * cos(angle), p0.y - distance * sin(angle));
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toVertex() {
        const i = this.x - this.y / root3;
        const j = this.y * 2 / root3;
        return new Vertex(i / gridLength, j / gridLength);
    }
}

class Vertex {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    toPoint() {
        const x = this.i + this.j / 2;
        const y = this.j * root3 / 2;
        return new Point(gridLength * x, gridLength * y);
    }

    alignToGrid() {
        return new Vertex(round(this.i), round(this.j));
    }
}

class Vector {
    constructor(magnitude, direction) {
        this.magnitude = magnitude;
        this.direction = direction;
    }
}

class Hat {
    constructor(origin, rotation, isFlipped) {
        this.origin = origin;
        this.rotation = rotation;
        this.isFlipped = isFlipped;
    }

    sides() {
        if (this.isFlipped) {
            // TODO figure out how to mirror while staying on grid
            return [
                new Vector(longSide, 0 * TAU),
                new Vector(shortSide, 3/4 * TAU),
                new Vector(shortSide, 11/12 * TAU),
                new Vector(longSide, 2/3 * TAU),
                new Vector(longSide, 1/2 * TAU),
                new Vector(shortSide, 3/4 * TAU),
                new Vector(shortSide, 7/12 * TAU),
                new Vector(longSide, 1/3 * TAU),
                new Vector(longSide, 1/6 * TAU),
                new Vector(shortSide, 5/12 * TAU),
                new Vector(shortSide, 1/4 * TAU),
                new Vector(shortSide, 1/4 * TAU),
                new Vector(shortSide, 1/12 * TAU),
                new Vector(longSide, 5/6 * TAU),
            ];
        } else {
            return [
                new Vector(longSide, 0 * TAU),
                new Vector(shortSide, 3/4 * TAU),
                new Vector(shortSide, 11/12 * TAU),
                new Vector(longSide, 2/3 * TAU),
                new Vector(longSide, 1/2 * TAU),
                new Vector(shortSide, 3/4 * TAU),
                new Vector(shortSide, 7/12 * TAU),
                new Vector(longSide, 1/3 * TAU),
                new Vector(longSide, 1/6 * TAU),
                new Vector(shortSide, 5/12 * TAU),
                new Vector(shortSide, 1/4 * TAU),
                new Vector(shortSide, 1/4 * TAU),
                new Vector(shortSide, 1/12 * TAU),
                new Vector(longSide, 5/6 * TAU),
            ]
        }
    }
    
    points() {
        let currentPoint = this.origin.toPoint();
        const points = [currentPoint];
        for (let side of this.sides()) {
            currentPoint = move(currentPoint, side.magnitude, side.direction + this.rotation);
            points.push(currentPoint);
        }
        return points;
    }

    draw() {
        stroke(color(0, 15, 85));
        strokeWeight(4);
        beginShape();
        for (let point of this.points()) {
            vertex(point.x, point.y);
        }
        endShape();    
    }
}