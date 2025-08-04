import * as THREE from "three";
// 引入轨道控制器扩展库OrbitControls.js（必须）
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

console.log(THREE);
const main = () => {
  // main.js
  const canvas = document.querySelector("#webgl");
  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // 创建场景
	const scene = new THREE.Scene();
	// scene.background = new THREE.Color(0xaaaaaa);

  // 创建轨道控制器
  // 2个参数：要控制的摄像机，用于事件侦听器的 HTML 元素
  const controls = new OrbitControls(camera, canvas);

  // 添加阻尼
  controls.enableDamping = true;
  controls.dampingFactor = 0.01;

  // 自动旋转
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  // 将轨道控制器添加到场景中
  scene.add(controls);

  // 创建一个立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 添加网格
  // 4个参数分别为：网格的大小(默认值为 `10`),网格中的分区数(默认值为 `10`),中心线的颜色(可选)，网格线颜色（可选）
  const gridHelper = new THREE.GridHelper(10, 10, 0x00ff00, "red");
  scene.add(gridHelper);

  // 监听相机变化事件
  controls.addEventListener("change", () => {
    renderer.render(scene, camera);
  });

  // 动画循环
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update(); // 更新轨道控制器

    renderer.render(scene, camera);
  }

  animate();
};

main();
