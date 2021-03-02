let angle = 0;

let points = [];

const distance = 2;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    points.push(new P4Vector(0.316227766, 0.4082482905, 0.5773502692, 1));
    points.push(new P4Vector(0.316227766, 0.4082482905, 0.5773502692, -1));
    points.push(new P4Vector(0.316227766, 0.4082482905, -1.154700538, 0));
    points.push(new P4Vector(0.316227766, -1.224744871, 0, 0));
    points.push(new P4Vector(-1.264911064, 0, 0, 0));
}

function draw() {
    background(0);

    rotateX(-PI / 2)

    let projected3d = [];

    let rotationXY = [
        [cos(angle), -sin(angle), 0, 0],
        [sin(angle), cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    let rotationZW = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, cos(angle), -sin(angle)],
        [0, 0, sin(angle), cos(angle)]
    ];

    let rotationXW = [
        [cos(angle), 0, 0, -sin(angle)],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [sin(angle), 0, 0, cos(angle)] 
    ];

    for (let i = 0; i < points.length; i++) {
        let v = points[i];

        let rotated;
        rotated = matmul(rotationXY, v);
        rotated = matmul(rotationZW, rotated);
        //rotated = matmul(rotationXW, rotated)

        let w = 1 / (distance - rotated.w);

        let projection = [
        [w, 0, 0, 0],
        [0, w, 0, 0],
        [0, 0, w, 0]
        ];

        let projected = matmul(projection, rotated);
        projected.mult(width / 8);
        projected3d[i] = projected;

        stroke(255, 200);
        strokeWeight(10);
        noFill();

        
        point(projected.x, projected.y, projected.z);
    }

    //connect vertices
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (i != j) {
                connect(i, j, projected3d);
            }
        }
    }

    //make faces
    let val = angle / 10;
    fill(noise(val) * 255, noise(val + random(100, 102)) * 255, noise(val + random(200, 202)) * 255, 10);

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 5; k++) {
                if (i != j && i != k && j != k) {
                    beginShape();
                    vertex(projected3d[i].x, projected3d[i].y, projected3d[i].z);
                    vertex(projected3d[j].x, projected3d[j].y, projected3d[j].z);
                    vertex(projected3d[k].x, projected3d[k].y, projected3d[k].z);
                    endShape();
                }
            }
        }
    }

    //angle = map(mouseX, 0, width, 0, TWO_PI);
    angle += 0.02;
}

function connect(i, j, points) {
    let a = points[i];
    let b = points[j];

    let val = angle / 10;

    strokeWeight(3);
    stroke(noise(val) * 255, noise(val + random(100, 102)) * 255, noise(val + random(200, 202)) * 255);
    line(a.x, a.y, a.z, b.x, b.y, b.z);
}