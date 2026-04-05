const J2000_JULIAN_DATE = 2451545.0;
const UNIX_EPOCH_JULIAN_DATE = 2440587.5;
const MILLISECONDS_PER_DAY = 86400000;
const ORBIT_SEGMENTS = 240;
const ORBIT_UPDATE_INTERVAL_DAYS = 30;
const ORBIT_DISTANCE_SCALE = 16;
const ORBIT_DISTANCE_EXPONENT = 0.52;
const FRAME_EPSILON = 1e-6;

const solarSystemData = {
  sun: {
    key: "sun",
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
    rotationSpeed: 0.002,
  },
  mercury: {
    key: "mercury",
    name: "Mercury",
    type: "Terrestrial Planet",
    radius: "2,439 km",
    distance: "0.39 AU",
    period: "88 days",
    temp: "167 C",
    moons: "0",
    color: 0x8c8c8c,
    size: 0.8,
    realRadius: 2439,
    rotationSpeed: 0.01,
    orbit: {
      a0: 0.38709927,
      aRate: 0.00000037,
      e0: 0.20563593,
      eRate: 0.00001906,
      i0: 7.00497902,
      iRate: -0.00594749,
      L0: 252.2503235,
      LRate: 149472.67411175,
      peri0: 77.45779628,
      periRate: 0.16047689,
      node0: 48.33076593,
      nodeRate: -0.12534081,
    },
  },
  venus: {
    key: "venus",
    name: "Venus",
    type: "Terrestrial Planet",
    radius: "6,051 km",
    distance: "0.72 AU",
    period: "225 days",
    temp: "464 C",
    moons: "0",
    color: 0xe6b800,
    size: 1.2,
    realRadius: 6051,
    rotationSpeed: 0.008,
    orbit: {
      a0: 0.72333566,
      aRate: 0.0000039,
      e0: 0.00677672,
      eRate: -0.00004107,
      i0: 3.39467605,
      iRate: -0.0007889,
      L0: 181.9790995,
      LRate: 58517.81538729,
      peri0: 131.60246718,
      periRate: 0.00268329,
      node0: 76.67984255,
      nodeRate: -0.27769418,
    },
  },
  earth: {
    key: "earth",
    name: "Earth",
    type: "Terrestrial Planet",
    radius: "6,371 km",
    distance: "1.00 AU",
    period: "365.25 days",
    temp: "15 C",
    moons: "1",
    color: 0x2233ff,
    size: 1.3,
    realRadius: 6371,
    rotationSpeed: 0.02,
    orbit: {
      a0: 1.00000261,
      aRate: 0.00000562,
      e0: 0.01671123,
      eRate: -0.00004392,
      i0: -0.00001531,
      iRate: -0.01294668,
      L0: 100.46457166,
      LRate: 35999.37244981,
      peri0: 102.93768193,
      periRate: 0.32327364,
      node0: 0,
      nodeRate: 0,
    },
  },
  mars: {
    key: "mars",
    name: "Mars",
    type: "Terrestrial Planet",
    radius: "3,389 km",
    distance: "1.52 AU",
    period: "687 days",
    temp: "-65 C",
    moons: "2",
    color: 0xff4500,
    size: 1.0,
    realRadius: 3389,
    rotationSpeed: 0.018,
    orbit: {
      a0: 1.52371034,
      aRate: 0.00001847,
      e0: 0.0933941,
      eRate: 0.00007882,
      i0: 1.84969142,
      iRate: -0.00813131,
      L0: -4.55343205,
      LRate: 19140.30268499,
      peri0: -23.94362959,
      periRate: 0.44441088,
      node0: 49.55953891,
      nodeRate: -0.29257343,
    },
  },
  jupiter: {
    key: "jupiter",
    name: "Jupiter",
    type: "Gas Giant",
    radius: "69,911 km",
    distance: "5.20 AU",
    period: "11.9 years",
    temp: "-110 C",
    moons: "79",
    color: 0xd4a373,
    size: 2.8,
    realRadius: 69911,
    rotationSpeed: 0.03,
    orbit: {
      a0: 5.202887,
      aRate: -0.00011607,
      e0: 0.04838624,
      eRate: -0.00013253,
      i0: 1.30439695,
      iRate: -0.00183714,
      L0: 34.39644051,
      LRate: 3034.74612775,
      peri0: 14.72847983,
      periRate: 0.21252668,
      node0: 100.47390909,
      nodeRate: 0.20469106,
    },
  },
  saturn: {
    key: "saturn",
    name: "Saturn",
    type: "Gas Giant",
    radius: "58,232 km",
    distance: "9.58 AU",
    period: "29.5 years",
    temp: "-140 C",
    moons: "82",
    color: 0xf4d03f,
    size: 2.4,
    hasRings: true,
    realRadius: 58232,
    rotationSpeed: 0.028,
    orbit: {
      a0: 9.53667594,
      aRate: -0.0012506,
      e0: 0.05386179,
      eRate: -0.00050991,
      i0: 2.48599187,
      iRate: 0.00193609,
      L0: 49.95424423,
      LRate: 1222.49362201,
      peri0: 92.59887831,
      periRate: -0.41897216,
      node0: 113.66242448,
      nodeRate: -0.28867794,
    },
  },
  uranus: {
    key: "uranus",
    name: "Uranus",
    type: "Ice Giant",
    radius: "25,362 km",
    distance: "19.22 AU",
    period: "84 years",
    temp: "-195 C",
    moons: "27",
    color: 0x4fd0e7,
    size: 1.8,
    realRadius: 25362,
    rotationSpeed: 0.022,
    orbit: {
      a0: 19.18916464,
      aRate: -0.00196176,
      e0: 0.04725744,
      eRate: -0.00004397,
      i0: 0.77263783,
      iRate: -0.00242939,
      L0: 313.23810451,
      LRate: 428.48202785,
      peri0: 170.9542763,
      periRate: 0.40805281,
      node0: 74.01692503,
      nodeRate: 0.04240589,
    },
  },
  neptune: {
    key: "neptune",
    name: "Neptune",
    type: "Ice Giant",
    radius: "24,622 km",
    distance: "30.05 AU",
    period: "165 years",
    temp: "-200 C",
    moons: "14",
    color: 0x1e3a8a,
    size: 1.7,
    realRadius: 24622,
    rotationSpeed: 0.02,
    orbit: {
      a0: 30.06992276,
      aRate: 0.00026291,
      e0: 0.00859048,
      eRate: 0.00005105,
      i0: 1.77004347,
      iRate: 0.00035372,
      L0: -55.12002969,
      LRate: 218.45945325,
      peri0: 44.96476227,
      periRate: -0.32241464,
      node0: 131.78422574,
      nodeRate: -0.00508664,
    },
  },
};

let scene;
let camera;
let renderer;
let controls;
let planets = [];
let timeSpeed = 1;
let isPaused = false;
let selectedPlanet = null;
let trackedPlanet = null;
let cameraOffset = new THREE.Vector3();
let raycaster;
let mouse;
let pointerDownPosition = null;
let isDraggingScene = false;
let simulationDate = new Date();
let lastAnimationTimestamp = 0;
let lastOrbitRefreshJulianDate = null;

const planetMeshes = new Map();
const orbitLines = new Map();
const validatedOrbitKeys = new Set();

function setDefaultCameraView() {
  camera.up.set(0, 0, -1);
  camera.position.set(0, 180, 0);
  controls.target.set(0, 0, 0);
  controls.update();
}

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0002);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1200,
  );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 10;
  controls.maxDistance = 300;
  setDefaultCameraView();

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight(0xffffff, 2, 300);
  sunLight.position.set(0, 0, 0);
  sunLight.castShadow = true;
  scene.add(sunLight);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  createStars();
  createSolarSystem();
  refreshSimulationUI();

  window.addEventListener("resize", onWindowResize);
  window.addEventListener("mousedown", onPointerDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onPointerUp);
  window.addEventListener("click", onMouseClick);
  renderer.domElement.addEventListener("wheel", onZoomInput, {
    passive: true,
  });

  setupUIControls();

  setTimeout(() => {
    document.getElementById("loading").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
    }, 500);
  }, 1000);

  lastAnimationTimestamp = performance.now();
  animate(lastAnimationTimestamp);
}

function createStars() {
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 2000;
  const posArray = new Float32Array(starsCount * 3);

  for (let i = 0; i < starsCount * 3; i += 1) {
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

  scene.add(new THREE.Points(starsGeometry, starsMaterial));
}

function createSolarSystem() {
  createSun();

  Object.keys(solarSystemData).forEach((key) => {
    if (key === "sun") {
      return;
    }

    createPlanet(key, solarSystemData[key]);
  });

  updatePlanetPositions();
  updateOrbitLines(true);
}

function createSun() {
  const data = solarSystemData.sun;
  const sunGeometry = new THREE.SphereGeometry(data.size, 32, 32);
  const sunMaterial = new THREE.MeshPhongMaterial({
    color: data.color,
    emissive: data.emissive,
    emissiveIntensity: 0.85,
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.userData = { ...data };
  scene.add(sun);
  planets.push(sun);
  planetMeshes.set(data.key, sun);

  const glowGeometry = new THREE.SphereGeometry(data.size * 1.2, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.3,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glow);
}

function createPlanet(key, data) {
  const orbitMaterial = new THREE.LineBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.35,
  });
  const orbitGeometry = new THREE.BufferGeometry();
  const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);
  scene.add(orbitLine);
  orbitLines.set(key, orbitLine);

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
  planet.userData = { ...data };

  scene.add(planet);
  planets.push(planet);
  planetMeshes.set(key, planet);

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

  if (key === "earth" || key === "venus") {
    const atmosphereGeometry = new THREE.SphereGeometry(data.size * 1.1, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: key === "earth" ? 0x88ccff : 0xffcc88,
      transparent: true,
      opacity: 0.2,
    });
    planet.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));
  }
}

function animate(timestamp) {
  requestAnimationFrame(animate);

  const deltaSeconds = Math.min((timestamp - lastAnimationTimestamp) / 1000, 0.1);
  lastAnimationTimestamp = timestamp;

  if (!isPaused) {
    advanceSimulationTime(deltaSeconds);
    updatePlanetPositions();
    updateOrbitLines();
    refreshSimulationUI();
  }

  if (!isPaused) {
    rotateBodies();
  }
  updateTracking();
  controls.update();
  renderer.render(scene, camera);
}

function advanceSimulationTime(deltaSeconds) {
  const daysPerSecond = getSimulationDaysPerSecond();
  if (daysPerSecond <= 0) {
    return;
  }

  simulationDate = new Date(
    simulationDate.getTime() + daysPerSecond * deltaSeconds * MILLISECONDS_PER_DAY,
  );
}

function rotateBodies() {
  planets.forEach((planet) => {
    const speed = planet.userData.rotationSpeed || 0.01;
    planet.rotation.y += speed;
  });
}

function updatePlanetPositions() {
  planetMeshes.forEach((planet, key) => {
    if (key === "sun") {
      planet.position.set(0, 0, 0);
      return;
    }

    const state = computePlanetState(planet.userData, simulationDate);
    planet.position.set(state.position.x, state.position.y, state.position.z);
    planet.userData.currentState = state;
  });

  if (selectedPlanet) {
    updatePlanetInfoPanel(selectedPlanet);
  }
}

function updateOrbitLines(force = false) {
  const julianDate = getJulianDate(simulationDate);
  if (
    !force &&
    lastOrbitRefreshJulianDate !== null &&
    Math.abs(julianDate - lastOrbitRefreshJulianDate) < ORBIT_UPDATE_INTERVAL_DAYS
  ) {
    return;
  }

  Object.keys(solarSystemData).forEach((key) => {
    if (key === "sun") {
      return;
    }

    const orbitLine = orbitLines.get(key);
    const data = solarSystemData[key];
    const elements = computeOrbitalElements(data, simulationDate);
    const frame = computeOrbitalFrame(elements, key);
    const points = [];

    for (let step = 0; step < ORBIT_SEGMENTS; step += 1) {
      const orbitalAngle = (step / ORBIT_SEGMENTS) * Math.PI * 2;
      const pointState = computeCartesianState(elements, frame, orbitalAngle);
      points.push(
        new THREE.Vector3(
          pointState.position.x,
          pointState.position.y,
          pointState.position.z,
        ),
      );
    }

    orbitLine.geometry.dispose();
    orbitLine.geometry = new THREE.BufferGeometry().setFromPoints(points);
  });

  lastOrbitRefreshJulianDate = julianDate;
}

function computePlanetState(data, date) {
  const elements = computeOrbitalElements(data, date);
  const frame = computeOrbitalFrame(elements, data.key);
  const meanAnomaly = normalizeRadians(
    elements.meanLongitude - elements.longitudeOfPerihelion,
  );

  return computeCartesianState(elements, frame, meanAnomaly, meanAnomaly);
}

function computeOrbitalElements(data, date) {
  const T = getJulianCenturies(date);
  const orbit = data.orbit;

  return {
    a: orbit.a0 + orbit.aRate * T,
    e: orbit.e0 + orbit.eRate * T,
    inclination: degToRad(orbit.i0 + orbit.iRate * T),
    meanLongitude: degToRad(orbit.L0 + orbit.LRate * T),
    longitudeOfPerihelion: degToRad(orbit.peri0 + orbit.periRate * T),
    ascendingNode: degToRad(orbit.node0 + orbit.nodeRate * T),
  };
}

function computeOrbitalFrame(elements, planetKey) {
  const frame = {
    omega: 0,
    Px: 1,
    Py: 0,
    Pz: 0,
    Qx: 0,
    Qy: 1,
    Qz: 0,
  };

  validateOrbitalFrame(frame, planetKey);
  return frame;
}

function validateOrbitalFrame(frame, planetKey) {
  if (validatedOrbitKeys.has(planetKey)) {
    return;
  }

  const condition1 = frame.Px ** 2 + frame.Py ** 2 + frame.Pz ** 2;
  const condition2 = frame.Qx ** 2 + frame.Qy ** 2 + frame.Qz ** 2;
  const condition3 = frame.Px * frame.Qx + frame.Py * frame.Qy + frame.Pz * frame.Qz;

  if (
    Math.abs(condition1 - 1) > FRAME_EPSILON ||
    Math.abs(condition2 - 1) > FRAME_EPSILON ||
    Math.abs(condition3) > FRAME_EPSILON
  ) {
    console.warn(`Orbital frame validation failed for ${planetKey}`, {
      condition1,
      condition2,
      condition3,
    });
  }

  validatedOrbitKeys.add(planetKey);
}

function computeCartesianState(elements, frame, orbitalAngle, meanAnomaly = null) {
  const r = elements.a;
  const X = elements.a * Math.cos(orbitalAngle);
  const Y = elements.a * Math.sin(orbitalAngle);

  const eclipticX = frame.Px * X + frame.Qx * Y;
  const eclipticY = frame.Py * X + frame.Qy * Y;
  const eclipticZ = frame.Pz * X + frame.Qz * Y;
  const position = toScenePosition(eclipticX, eclipticY, eclipticZ);

  return {
    r,
    X,
    Y,
    meanAnomaly,
    eccentricAnomaly: orbitalAngle,
    elements,
    frame,
    position,
  };
}

function toScenePosition(x, y, z) {
  const distance = Math.sqrt(x * x + y * y + z * z);
  if (distance === 0) {
    return { x: 0, y: 0, z: 0 };
  }

  const scaleFactor = scaleOrbitDistance(distance) / distance;

  return {
    x: x * scaleFactor,
    y: z * scaleFactor,
    z: y * scaleFactor,
  };
}

function scaleOrbitDistance(auValue) {
  const magnitude = Math.abs(auValue);
  const scaled = ORBIT_DISTANCE_SCALE * Math.pow(magnitude, ORBIT_DISTANCE_EXPONENT);
  return auValue < 0 ? -scaled : scaled;
}

function solveKeplerEquation(meanAnomaly, eccentricity) {
  let eccentricAnomaly = meanAnomaly;

  for (let iteration = 0; iteration < 10; iteration += 1) {
    const numerator =
      eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly;
    const denominator = 1 - eccentricity * Math.cos(eccentricAnomaly);
    const delta = numerator / denominator;
    eccentricAnomaly -= delta;

    if (Math.abs(delta) < 1e-10) {
      break;
    }
  }

  return eccentricAnomaly;
}

function getSimulationDaysPerSecond() {
  if (timeSpeed <= 0) {
    return 0;
  }

  return Math.pow(10, timeSpeed / 1.5) - 1;
}

function refreshSimulationUI() {
  const dateElement = document.getElementById("simDateValue");
  const speedElement = document.getElementById("speedValue");

  if (dateElement) {
    dateElement.textContent = formatSimulationDate(simulationDate);
  }

  if (speedElement) {
    speedElement.textContent = formatSimulationRate(getSimulationDaysPerSecond());
  }
}

function updatePlanetInfoPanel(data) {
  document.getElementById("planetName").textContent = data.name;
  document.getElementById("planetType").textContent = data.type;
  document.getElementById("planetPeriod").textContent = data.period;
  document.getElementById("planetRadius").textContent = data.radius;
  document.getElementById("planetTemp").textContent = data.temp;
  document.getElementById("planetMoons").textContent = data.moons;

  if (data.orbit) {
    const state = computePlanetState(data, simulationDate);
    document.getElementById("planetDistance").textContent = `${state.r.toFixed(3)} AU`;
    document.getElementById("planetSemiMajorAxis").textContent =
      `${state.elements.a.toFixed(3)} AU`;
    document.getElementById("planetEccentricity").textContent =
      state.elements.e.toFixed(4);
    document.getElementById("planetInclination").textContent =
      `${radToDeg(state.elements.inclination).toFixed(2)} deg`;
  } else {
    document.getElementById("planetDistance").textContent = data.distance;
    document.getElementById("planetSemiMajorAxis").textContent = "N/A";
    document.getElementById("planetEccentricity").textContent = "N/A";
    document.getElementById("planetInclination").textContent = "N/A";
  }

  const colorHex = `#${data.color.toString(16).padStart(6, "0")}`;
  document.getElementById("planetColorIndicator").style.backgroundColor = colorHex;
  document.getElementById("planetColorIndicator").style.boxShadow = `0 0 20px ${colorHex}`;
}

function updateTracking() {
  if (!trackedPlanet) {
    return;
  }

  const planet = planetMeshes.get(trackedPlanet.key);
  if (!planet) {
    return;
  }

  const targetPosition = planet.position.clone().add(cameraOffset);
  camera.position.lerp(targetPosition, 0.05);
  controls.target.lerp(planet.position, 0.05);
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
  if (intersects.length === 0) {
    return;
  }

  selectPlanet(intersects[0].object.userData);
  focusOnPlanet(intersects[0].object.userData);
}

function selectPlanet(data) {
  selectedPlanet = data;
  updatePlanetInfoPanel(data);

  const panel = document.getElementById("planetInfo");
  panel.classList.remove("hidden");
  setTimeout(() => {
    panel.classList.remove("translate-y-full", "opacity-0");
  }, 10);
}

function focusOnPlanet(planetData) {
  const targetPlanet = planetMeshes.get(planetData.key);
  if (!targetPlanet) {
    return;
  }

  if (planetData.key === "sun") {
    cameraOffset.set(0, 20, 40);
  } else {
    const offset = planetData.size * 6;
    cameraOffset.set(offset, offset, offset);
  }

  trackedPlanet = planetData;

  const targetPosition = targetPlanet.position.clone().add(cameraOffset);
  camera.position.lerp(targetPosition, 0.3);
  controls.target.copy(targetPlanet.position);
  document.getElementById("stopTracking").classList.remove("hidden");
  controls.update();
}

function stopTracking() {
  trackedPlanet = null;
  document.getElementById("stopTracking").classList.add("hidden");
}

function setupUIControls() {
  document.getElementById("playPause").addEventListener("click", () => {
    isPaused = !isPaused;
    const icon = document.getElementById("playIcon");
    icon.setAttribute("data-lucide", isPaused ? "play" : "pause");
    lucide.createIcons();
  });

  document.getElementById("resetView").addEventListener("click", () => {
    stopTracking();
    simulationDate = new Date();
    lastOrbitRefreshJulianDate = null;
    updatePlanetPositions();
    updateOrbitLines(true);
    refreshSimulationUI();
    setDefaultCameraView();
  });

  document.getElementById("speedSlider").addEventListener("input", (event) => {
    timeSpeed = parseFloat(event.target.value);
    refreshSimulationUI();
  });

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

  document.querySelectorAll(".planet-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const planetKey = button.dataset.planet;
      const planetData = solarSystemData[planetKey];
      if (!planetData) {
        return;
      }

      selectPlanet(planetData);
      focusOnPlanet(planetData);
    });
  });
}

function getJulianDate(date) {
  return date.getTime() / MILLISECONDS_PER_DAY + UNIX_EPOCH_JULIAN_DATE;
}

function getJulianCenturies(date) {
  return (getJulianDate(date) - J2000_JULIAN_DATE) / 36525;
}

function formatSimulationDate(date) {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function formatSimulationRate(daysPerSecond) {
  if (daysPerSecond <= 0) {
    return "Paused";
  }

  if (daysPerSecond < 365) {
    return `${daysPerSecond.toFixed(1)} days/s`;
  }

  return `${(daysPerSecond / 365.25).toFixed(2)} yr/s`;
}

function degToRad(value) {
  return (value * Math.PI) / 180;
}

function radToDeg(value) {
  return (value * 180) / Math.PI;
}

function normalizeRadians(value) {
  let angle = value % (Math.PI * 2);

  if (angle > Math.PI) {
    angle -= Math.PI * 2;
  }

  if (angle < -Math.PI) {
    angle += Math.PI * 2;
  }

  return angle;
}

init();
