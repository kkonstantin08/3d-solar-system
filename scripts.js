// Solar System Data
const solarSystemData = {
  sun: {
    name: "Sun",
    type: "Star",
    radius: "696,340 km",
    distance: "0 AU",
    period: "N/A",
    temp: "5,778 K",
    moons: "N/A",
    color: 0xffd700,
    emissive: 0xffaa00,
    size: 4,
    realRadius: 696340,
  },
  mercury: {
    name: "Mercury",
    type: "Terrestrial Planet",
    radius: "2,439 km",
    distance: "0.39 AU",
    period: "88 days",
    temp: "167°C",
    moons: "0",
    color: 0x8c8c8c,
    size: 0.8,
    distanceAU: 8,
    speed: 4.1,
    realRadius: 2439,
  },
  venus: {
    name: "Venus",
    type: "Terrestrial Planet",
    radius: "6,051 km",
    distance: "0.72 AU",
    period: "225 days",
    temp: "464°C",
    moons: "0",
    color: 0xe6b800,
    size: 1.2,
    distanceAU: 12,
    speed: 1.6,
    realRadius: 6051,
  },
  earth: {
    name: "Earth",
    type: "Terrestrial Planet",
    radius: "6,371 km",
    distance: "1.00 AU",
    period: "365.25 days",
    temp: "15°C",
    moons: "1",
    color: 0x2233ff,
    size: 1.3,
    distanceAU: 16,
    speed: 1,
    realRadius: 6371,
  },
  mars: {
    name: "Mars",
    type: "Terrestrial Planet",
    radius: "3,389 km",
    distance: "1.52 AU",
    period: "687 days",
    temp: "-65°C",
    moons: "2",
    color: 0xff4500,
    size: 1.0,
    distanceAU: 22,
    speed: 0.53,
    realRadius: 3389,
  },
  jupiter: {
    name: "Jupiter",
    type: "Gas Giant",
    radius: "69,911 km",
    distance: "5.20 AU",
    period: "11.9 years",
    temp: "-110°C",
    moons: "79",
    color: 0xd4a373,
    size: 2.8,
    distanceAU: 35,
    speed: 0.08,
    realRadius: 69911,
  },
  saturn: {
    name: "Saturn",
    type: "Gas Giant",
    radius: "58,232 km",
    distance: "9.58 AU",
    period: "29.5 years",
    temp: "-140°C",
    moons: "82",
    color: 0xf4d03f,
    size: 2.4,
    distanceAU: 50,
    speed: 0.03,
    hasRings: true,
    realRadius: 58232,
  },
  uranus: {
    name: "Uranus",
    type: "Ice Giant",
    radius: "25,362 km",
    distance: "19.22 AU",
    period: "84 years",
    temp: "-195°C",
    moons: "27",
    color: 0x4fd0e7,
    size: 1.8,
    distanceAU: 70,
    speed: 0.01,
    realRadius: 25362,
  },
  neptune: {
    name: "Neptune",
    type: "Ice Giant",
    radius: "24,622 km",
    distance: "30.05 AU",
    period: "165 years",
    temp: "-200°C",
    moons: "14",
    color: 0x1e3a8a,
    size: 1.7,
    distanceAU: 90,
    speed: 0.006,
    realRadius: 24622,
  },
};

// Three.js Setup
let scene, camera, renderer, controls;
let planets = [];
let orbits = [];
let timeSpeed = 1;
let isPaused = false;
let selectedPlanet = null;
let trackedPlanet = null;
let cameraOffset = new THREE.Vector3();
let raycaster, mouse;
let pointerDownPosition = null;
let isDraggingScene = false;

// Initialize
function init() {
  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0002);

  // Camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 60, 120);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 10;
  controls.maxDistance = 300;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight(0xffffff, 2, 300);
  sunLight.position.set(0, 0, 0);
  sunLight.castShadow = true;
  scene.add(sunLight);

  // Raycaster for mouse interaction
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Create Solar System
  createStars();
  createSolarSystem();

  // Event Listeners
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("mousedown", onPointerDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onPointerUp);
  window.addEventListener("click", onMouseClick);
  renderer.domElement.addEventListener("wheel", onZoomInput, {
    passive: true,
  });

  // UI Controls
  setupUIControls();

  // Remove loading screen
  setTimeout(() => {
    document.getElementById("loading").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
    }, 500);
  }, 1000);

  // Start animation
  animate();
}

function createStars() {
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 2000;
  const posArray = new Float32Array(starsCount * 3);

  for (let i = 0; i < starsCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 600;
  }

  starsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3),
  );
  const starsMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  });

  const starMesh = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starMesh);
}

function createSolarSystem() {
  // Create Sun
  const sunGeometry = new THREE.SphereGeometry(
    solarSystemData.sun.size,
    32,
    32,
  );
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: solarSystemData.sun.color,
    emissive: solarSystemData.sun.emissive,
    emissiveIntensity: 0.8,
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.userData = { ...solarSystemData.sun, angle: 0 };
  scene.add(sun);
  planets.push(sun);

  // Sun glow effect
  const glowGeometry = new THREE.SphereGeometry(
    solarSystemData.sun.size * 1.2,
    32,
    32,
  );
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.3,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glow);

  // Create Planets
  Object.keys(solarSystemData).forEach((key) => {
    if (key === "sun") return;

    const data = solarSystemData[key];
    createPlanet(key, data);
  });
}

function createPlanet(key, data) {
  // Orbit path
  const orbitGeometry = new THREE.RingGeometry(
    data.distanceAU - 0.1,
    data.distanceAU + 0.1,
    128,
  );
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.2,
  });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  scene.add(orbit);
  orbits.push(orbit);

  // Planet
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);

  let material;
  if (key === "earth") {
    material = new THREE.MeshPhongMaterial({
      color: data.color,
      emissive: 0x001133,
      shininess: 25,
    });
  } else if (key === "mars") {
    material = new THREE.MeshPhongMaterial({
      color: data.color,
      emissive: 0x330000,
      emissiveIntensity: 0.2,
    });
  } else {
    material = new THREE.MeshPhongMaterial({
      color: data.color,
      shininess: 10,
    });
  }

  const planet = new THREE.Mesh(geometry, material);
  planet.castShadow = true;
  planet.receiveShadow = true;
  planet.userData = { ...data, key: key, angle: Math.random() * Math.PI * 2 };

  // Initial position
  updatePlanetPosition(planet, data.distanceAU, planet.userData.angle);

  scene.add(planet);
  planets.push(planet);

  // Add rings for Saturn
  if (data.hasRings) {
    const ringGeometry = new THREE.RingGeometry(
      data.size * 1.4,
      data.size * 2.2,
      64,
    );
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xc9b896,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    planet.add(ring);
  }

  // Add atmosphere for some planets
  if (key === "earth" || key === "venus") {
    const atmGeometry = new THREE.SphereGeometry(data.size * 1.1, 32, 32);
    const atmMaterial = new THREE.MeshBasicMaterial({
      color: key === "earth" ? 0x88ccff : 0xffcc88,
      transparent: true,
      opacity: 0.2,
    });
    const atmosphere = new THREE.Mesh(atmGeometry, atmMaterial);
    planet.add(atmosphere);
  }
}

function updatePlanetPosition(planet, distance, angle) {
  planet.position.x = Math.cos(angle) * distance;
  planet.position.z = Math.sin(angle) * distance;
}

function animate() {
  requestAnimationFrame(animate);

  if (!isPaused) {
    // Update planet positions
    planets.forEach((planet) => {
      if (planet.userData.distanceAU) {
        planet.userData.angle += planet.userData.speed * 0.005 * timeSpeed;
        updatePlanetPosition(
          planet,
          planet.userData.distanceAU,
          planet.userData.angle,
        );

        // Rotate planet on its axis
        planet.rotation.y += 0.01 * timeSpeed;
      } else {
        // Rotate sun
        planet.rotation.y += 0.002 * timeSpeed;
      }
    });
  }

  // Camera tracking - follow tracked planet
  if (trackedPlanet) {
    const planet = trackedPlanet.distanceAU
      ? planets.find((p) => p.userData.key === trackedPlanet.key)
      : planets[0]; // Sun is first

    if (planet) {
      // Smoothly interpolate camera position to follow planet
      const targetPosition = planet.position.clone().add(cameraOffset);
      camera.position.lerp(targetPosition, 0.05);
      controls.target.lerp(planet.position, 0.05);
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  if (pointerDownPosition) {
    const dragDistance = Math.hypot(
      event.clientX - pointerDownPosition.x,
      event.clientY - pointerDownPosition.y,
    );

    if (dragDistance > 5) {
      isDraggingScene = true;
    }
  }

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);

  document.body.style.cursor = intersects.length > 0 ? "pointer" : "default";
}

function onPointerDown(event) {
  pointerDownPosition = {
    x: event.clientX,
    y: event.clientY,
  };
  isDraggingScene = false;
}

function onPointerUp() {
  setTimeout(() => {
    pointerDownPosition = null;
    isDraggingScene = false;
  }, 0);
}

function onZoomInput() {
  if (trackedPlanet) {
    stopTracking();
  }
}

function onMouseClick(event) {
  if (isDraggingScene) {
    return;
  }

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);

  if (intersects.length > 0) {
    const planet = intersects[0].object;
    selectPlanet(planet.userData);
    focusOnPlanet(planet.userData);
  }
}

function selectPlanet(data) {
  selectedPlanet = data;

  // Update info panel
  document.getElementById("planetName").textContent = data.name;
  document.getElementById("planetType").textContent = data.type;
  document.getElementById("planetDistance").textContent = data.distance;
  document.getElementById("planetPeriod").textContent = data.period;
  document.getElementById("planetRadius").textContent = data.radius;
  document.getElementById("planetTemp").textContent = data.temp;
  document.getElementById("planetMoons").textContent = data.moons;

  const colorHex = "#" + data.color.toString(16).padStart(6, "0");
  document.getElementById("planetColorIndicator").style.backgroundColor =
    colorHex;
  document.getElementById("planetColorIndicator").style.boxShadow =
    `0 0 20px ${colorHex}`;

  // Show panel
  const panel = document.getElementById("planetInfo");
  panel.classList.remove("hidden");
  setTimeout(() => {
    panel.classList.remove("translate-y-full", "opacity-0");
  }, 10);
}

function focusOnPlanet(planetData) {
  let targetPlanet;

  if (!planetData.distanceAU) {
    // It's the sun
    targetPlanet = planets[0];
    cameraOffset.set(0, 20, 40);
  } else {
    // Find the planet mesh
    targetPlanet = planets.find((p) => p.userData.key === planetData.key);
    if (targetPlanet) {
      const offset = planetData.size * 6;
      cameraOffset.set(offset, offset, offset);
    }
  }

  if (targetPlanet) {
    // Start tracking
    trackedPlanet = planetData;

    // Initial camera position
    const targetPosition = targetPlanet.position.clone().add(cameraOffset);
    camera.position.lerp(targetPosition, 0.3);
    controls.target.copy(targetPlanet.position);

    // Show stop tracking button
    document.getElementById("stopTracking").classList.remove("hidden");
  }

  controls.update();
}

function stopTracking() {
  trackedPlanet = null;
  document.getElementById("stopTracking").classList.add("hidden");
}

function setupUIControls() {
  // Play/Pause
  document.getElementById("playPause").addEventListener("click", () => {
    isPaused = !isPaused;
    const icon = document.getElementById("playIcon");
    if (isPaused) {
      icon.setAttribute("data-lucide", "play");
    } else {
      icon.setAttribute("data-lucide", "pause");
    }
    lucide.createIcons();
  });

  // Reset View
  document.getElementById("resetView").addEventListener("click", () => {
    stopTracking();
    camera.position.set(0, 60, 120);
    controls.target.set(0, 0, 0);
    controls.update();
  });

  // Speed Slider
  document.getElementById("speedSlider").addEventListener("input", (e) => {
    timeSpeed = parseFloat(e.target.value);
  });

  // Close Planet Info
  document.getElementById("closePlanetInfo").addEventListener("click", () => {
    const panel = document.getElementById("planetInfo");
    panel.classList.add("translate-y-full", "opacity-0");
    setTimeout(() => {
      panel.classList.add("hidden");
    }, 300);
    selectedPlanet = null;
  });

  document.getElementById("stopTracking").addEventListener("click", () => {
    stopTracking();
  });

  // Focus Planet Button
  const focusPlanetButton = document.getElementById("focusPlanet");
  if (focusPlanetButton) {
    focusPlanetButton.addEventListener("click", () => {
      if (selectedPlanet) {
        focusOnPlanet(selectedPlanet);
      }
    });
  }

  // Quick Select Buttons
  document.querySelectorAll(".planet-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const planetKey = btn.dataset.planet;
      const planetData = solarSystemData[planetKey];
      if (planetData) {
        selectPlanet(planetData);
        focusOnPlanet(planetData);
      }
    });
  });
}

// Start
init();
