// Three.js setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20
// camera.position.z = 2000; //added

var renderer = new THREE.WebGLRenderer();



renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up raycaster for mouse events
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Function to handle mouse move events
function onMouseMove(event) {
    // Normalize mouse position from -1 to +1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Set up cubes for elements
var geometry = new THREE.BoxGeometry(.5, .5, .5);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});


// for (var i = 0; i < table.length; i += 5) {
//     var item = table[i];

//     var object = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: colors[item]}));
//     object.position.x = (table[i + 3] * 140) - 1330; // position based on group
//     object.position.y = - (table[i + 4] * 180) + 900; // position based on period
//     object.position.z = 0;

//     // Set name to the object
//     object.name = table[i] + " (" + table[i + 1] + ")"; // Symbol (Element Name)

//     scene.add(object);
// }

for(var i = 0; i < table.length; i += 5) {
    var element = new THREE.Mesh(geometry, material);
    element.position.x = table[i+3];
    element.position.y = table[i+4] * -1;
    element.userData = {
        symbol: table[i],
        name: table[i+1],
        atomic_weight: table[i+2]
    };
    scene.add(element);
}

// camera.position.z = 5;

camera.position.set(9, -3.5, 20);

// Function to render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Event listeners
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', function() {
    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    if(intersects.length > 0) {
        // Handle click event on object here
        console.log('Clicked on: ', intersects[0].object.userData);
    }
}, false);
