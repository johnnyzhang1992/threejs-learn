import * as THREE from "three";

console.log(THREE);
const main = () => {
  const canvas = document.querySelector("#webgl");
  canvas.width = 300;
  canvas.height = 150;

    // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  // 摄像机 观察者视角
  const fov = 75;
  const aspect = 2; // 相机默认值
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  camera.position.z = 2;
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  // 创建一个包含盒子信息的立方几何体
  const boxWidth = 1;0.
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // 创建一个材质并设置颜色
  // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

  // 创建一个网格：包含几何体和材质
  // const cube = new THREE.Mesh(geometry, material);

  // scene.add(cube);

  // 灯光信息
  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    // 网格模型Mesh：几何形状 + 材质material
        const cube = new THREE.Mesh(geometry, material);
        // 添加到场景
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  // renderer.render(scene, camera);
  function render(time) {
    time *= 0.001; // 将时间单位变为秒

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.05;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    // cube.rotation.x = time;
    // cube.rotation.y = time;

    // 渲染场景和相机
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
     const pixelRatio = window.devicePixelRatio;
     const width = Math.floor(canvas.clientWidth * pixelRatio);
     const height = Math.floor(canvas.clientHeight * pixelRatio);
     const needResize = canvas.width !== width || canvas.height !== height;
     if (needResize) {
       renderer.setSize(width, height, false);
     }
    return needResize;
  }

  requestAnimationFrame(render);
};

main();
