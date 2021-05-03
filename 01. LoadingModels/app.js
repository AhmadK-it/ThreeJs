
let container , camera , renderer , scene , house , field;

function init(){
    container = document.querySelector('.scene');

    //. Create Scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;
    
    //. Camera setup
    camera = new THREE.PerspectiveCamera(fov ,aspect , near, far);
    camera.position.set(3 , 50 ,70);
    camera.lookAt(0,0, 0);

    //* we add lights to let us see the model 
    
    const ambient = new THREE.AmbientLight(0x404040 , 3);
    scene.add(ambient);
    
    const light = new THREE.DirectionalLight(0xffffff ,5);
    light.position.set(10,10,10);
    //. Renderer
    renderer = new THREE.WebGLRenderer({antialias : true , alpha : true});
    renderer.setSize(container.clientWidth , container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
    
    //. load model 
    let loader = new THREE.GLTFLoader();
    loader.load('./3D/soccer_ball/scene.gltf', gltf =>{
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        house.position.set(0,1,-10);
        animation();
    });
    
    let loader2 = new THREE.GLTFLoader();
    loader2.load('./3D/soccer_field/scene.gltf', gltf =>{
        scene.add(gltf.scene);
        field = gltf.scene.children[0];
        field.scale.set(3,3,3);
        animation2();
    });
    
}
function animation(){
    requestAnimationFrame(animation);
    house.rotation.x -= 0.095;
    house.position.z -= 0.095;
    if(Math.floor(house.position.z) == -62 )house.position.z = -1;
    renderer.render(scene , camera);
}

function animation2(){
    requestAnimationFrame(animation2);
    //field.rotation.z += 0.005;
    renderer.render(scene , camera);   
}

init();

function onWindowResixe(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth , container.clientHeight);
}

window.addEventListener('resize', onWindowResixe);