const gridLength = 60;
const root3 = Math.sqrt(3);
const verticalGridLength = gridLength * root3 / 2;
const longSide = gridLength / 2;
const shortSide = gridLength / (2 * root3);
const shapes = [];
let canvasWidth, canvasHeight;

function draw() {
}

function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth, canvasHeight);
    background(240);
    noLoop();
    shapes.push(new Vertex(1, 1), new Vertex(1, 3), new Vertex(3, 1));
    update();
}

function mouseMoved() {
    update();
}

function mouseClicked() {
    shapes.push(new Point(mouseX, mouseY).toVertex().alignToGrid());
    update();
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
        drawShape(shape);
    }
    const nearestVertex = new Point(mouseX, mouseY).toVertex().alignToGrid();
    drawShape(nearestVertex);
}

function drawShape(initialVertex) {
    stroke(color(0, 15, 85));
    strokeWeight(4);
    beginShape();
    const initialPoint = initialVertex.toPoint();
    vertex(initialPoint.x, initialPoint.y);
    const p1 = move(initialPoint, longSide, 0);
    vertex(p1.x, p1.y);
    const p2 = move(p1, shortSide, 3 * TAU / 4);
    vertex(p2.x, p2.y);
    const p3 = move(p2, shortSide, 11 * TAU / 12);
    vertex(p3.x, p3.y);
    const p4 = move(p3, longSide, 2 * TAU / 3);
    vertex(p4.x, p4.y);
    const p5 = move(p4, longSide, TAU / 2);
    vertex(p5.x, p5.y);
    const p6 = move(p5, shortSide, 3 * TAU / 4);
    vertex(p6.x, p6.y);
    const p7 = move(p6, shortSide, 7 * TAU / 12);
    vertex(p7.x, p7.y);
    const p8 = move(p7, longSide, TAU / 3);
    vertex(p8.x, p8.y);
    const p9 = move(p8, longSide, TAU / 6);
    vertex(p9.x, p9.y);
    const p10 = move(p9, shortSide, 5 * TAU / 12);
    vertex(p10.x, p10.y);
    const p11 = move(p10, shortSide, TAU / 4);
    vertex(p11.x, p11.y);
    const p12 = move(p11, shortSide, TAU / 4);
    vertex(p12.x, p12.y);
    const p13 = move(p12, shortSide, TAU / 12);
    vertex(p13.x, p13.y);
    const p14 = move(p13, longSide, 5 * TAU / 6);
    vertex(p14.x, p14.y);
    endShape();
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
