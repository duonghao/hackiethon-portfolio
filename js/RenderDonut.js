var donutNode;

document.addEventListener("DOMContentLoaded", function() {
    donutNode = document.getElementById("donut");
    render_frames();
});

// TODO: Adjust this based on the flexbox sizing
let thetaSteps = 0.05;
let rotationAngleYSteps = 0.05;
let rotationAngleXZSteps = 0.1;

let screenWidth = 20;
let screenHeight = 20;

let output;

let K2 = 5; // Scale factor of view from object
let R = 0.5;
let X = 2;
let Y = 0;

let K1 = screenWidth*K2*3/(8*(X+R)); // Scale factor of view from screen

function render_frame(rotationAngleX, rotationAngleZ) {

    output = new Array(screenHeight).fill(' ').map(() => new Array(screenWidth).fill(' '));

    // Rotations

    let sinX = math.sin(rotationAngleX);
    let cosX = math.cos(rotationAngleX);
    let sinZ = math.sin(rotationAngleZ);
    let cosZ = math.cos(rotationAngleZ);

    let rotationMatrixX = math.matrix([[1, 0, 0],[0, cosX, -sinX], [0, sinX, cosX]]);
    let rotationMatrixZ = math.matrix([[cosZ, -sinZ, 0],[sinZ, cosZ, 0], [0, 0, 1]]);

    // Rotating circle
    for(let theta=0; theta<2*math.pi; theta+=thetaSteps) {
        for(let rotationAngleY = 0; rotationAngleY<2*math.pi; rotationAngleY+=rotationAngleYSteps) {

            // Generate 2-D Circle
            let circleThirdDim = math.matrix([X+R*math.cos(theta), Y+R*math.sin(theta), 0]);

            // Rotate 2-D Circle to create 3-D circle (donut)
            let sinRotationY = math.sin(rotationAngleY);
            let cosRotationY = math.cos(rotationAngleY);
            let rotationMatrixY = math.matrix([[cosRotationY, 0, sinRotationY], [0, 1, 0], [-sinRotationY, 0, cosRotationY]]);
            let circleThirdDimRotateY = math.multiply(rotationMatrixY, circleThirdDim);

            // Rotate about X and Z to create 3-D effect
            let circleThirdDimRotateYX = math.multiply(rotationMatrixX, circleThirdDimRotateY);
            let circleThirdDimRotateYXZ = math.multiply(rotationMatrixZ, circleThirdDimRotateYX);

            let x2 = circleThirdDimRotateYXZ.subset(math.index(0));
            let y2 = circleThirdDimRotateYXZ.subset(math.index(1));
            let z2 = circleThirdDimRotateYXZ.subset(math.index(2));

            // 3-D circle projected to 2-D
            let circleSecondDim = [K1*x2/(K2+z2),
                                    K1*y2/(K2+z2)]

            let xPrime2 = math.round(screenWidth/2 + circleSecondDim[0]);
            let yPrime2 = math.round(screenHeight/2 + circleSecondDim[1]);

            output[xPrime2][yPrime2] = 'H';
        }

        /* console.log(math.size(circleThirdDimRotateY))
        circleThirdDimRotateY.forEach(function(value, index, matrix) {
            console.log('value: ', value, "index: ", index);
        }) */        
    }
}

async function render_frames() {
    while(true) {
        for(let rotationAngleXZ=0; rotationAngleXZ<2*math.pi; rotationAngleXZ += rotationAngleXZSteps) {
            render_frame(rotationAngleXZ, rotationAngleXZ);
            await sleep(100);
            donutRenderOnDocument(print_frame());
        }
    }
}

function donutRenderOnDocument(text) {
    donutNode.textContent = text;
}

function print_frame() {
    let frame = "";
    for(let i=0; i<screenHeight; i++) {
        for(let j=0; j<screenWidth; j++) {
            frame += output[i][j];
        }
        frame += "\n";
    }
    return frame;
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

