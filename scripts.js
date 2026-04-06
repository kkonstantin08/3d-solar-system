const J2000_JULIAN_DATE = 2451545.0;
const UNIX_EPOCH_JULIAN_DATE = 2440587.5;
const MILLISECONDS_PER_DAY = 86400000;
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
  },
  mercury: {
    key: "mercury",
    name: "Mercury",
    type: "Terrestrial Planet",
    radius: "2,439 km",
    distance: "0.39 AU",
    period: "88 days",
    temp: "167В°C",
    moons: "0",
    color: 0x8c8c8c,
    size: 0.8,
    distanceAU: 8,
    speed: 4.1,
    realRadius: 2439,
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
    temp: "464В°C",
    moons: "0",
    color: 0xe6b800,
    size: 1.2,
    distanceAU: 12,
    speed: 1.6,
    realRadius: 6051,
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
    temp: "15В°C",
    moons: "1",
    color: 0x2233ff,
    size: 1.3,
    distanceAU: 16,
    speed: 1,
    realRadius: 6371,
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
    temp: "-65В°C",
    moons: "2",
    color: 0xff4500,
    size: 1.0,
    distanceAU: 22,
    speed: 0.53,
    realRadius: 3389,
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
    temp: "-110В°C",
    moons: "79",
    color: 0xd4a373,
    size: 2.8,
    distanceAU: 35,
    speed: 0.08,
    realRadius: 69911,
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
    temp: "-140В°C",
    moons: "82",
    color: 0xf4d03f,
    size: 2.4,
    distanceAU: 50,
    speed: 0.03,
    hasRings: true,
    realRadius: 58232,
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
    temp: "-195В°C",
    moons: "27",
    color: 0x4fd0e7,
    size: 1.8,
    distanceAU: 70,
    speed: 0.01,
    realRadius: 25362,
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
    temp: "-200В°C",
    moons: "14",
    color: 0x1e3a8a,
    size: 1.7,
    distanceAU: 90,
    speed: 0.006,
    realRadius: 24622,
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
let orbits = [];
let timeSpeed = 1;
let isPaused = false;
let selectedPlanet = null;
let trackedPlanet = null;
let cameraOffset = new THREE.Vector3();
let raycaster;
let mouse;
let pointerDownPosition = null;
let activePointerId = null;
let isDraggingScene = false;
let planetInfoHideTimeout = null;
let lastPlanetInfoOpenAt = 0;
let simulationDate = new Date();
let lastAnimationTimestamp = 0;

const validatedOrbitKeys = new Set();

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0002);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 60, 120);

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
  window.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onMouseMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("click", onOutsidePlanetInfoClick, true);
  renderer.domElement.addEventListener("wheel", onZoomInput, {
    passive: true,
  });
  renderer.domElement.addEventListener("touchstart", onTouchStart, {
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

  Object.keys(solarSystemData).forEach((key) => {
    if (key === "sun") {
      return;
    }

    createPlanet(key, solarSystemData[key]);
  });
}

function createPlanet(key, data) {
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
  planet.userData = { ...data, angle: Math.random() * Math.PI * 2 };

  updatePlanetPosition(planet, data.distanceAU, planet.userData.angle);

  scene.add(planet);
  planets.push(planet);

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

function updatePlanetPosition(planet, distance, angle) {
  planet.position.x = Math.cos(angle) * distance;
  planet.position.z = Math.sin(angle) * distance;
}

function animate(timestamp) {
  requestAnimationFrame(animate);

  const deltaSeconds = Math.min((timestamp - lastAnimationTimestamp) / 1000, 0.1);
  lastAnimationTimestamp = timestamp;

  if (!isPaused) {
    advanceSimulationTime(deltaSeconds);

    planets.forEach((planet) => {
      if (planet.userData.distanceAU) {
        planet.userData.angle += planet.userData.speed * 0.005 * timeSpeed;
        updatePlanetPosition(
          planet,
          planet.userData.distanceAU,
          planet.userData.angle,
        );
        planet.rotation.y += 0.01 * timeSpeed;
      } else {
        planet.rotation.y += 0.002 * timeSpeed;
      }
    });

    if (selectedPlanet) {
      updatePlanetInfoPanel(selectedPlanet);
    }

    refreshSimulationUI();
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

function updateTracking() {
  if (!trackedPlanet) {
    return;
  }

  const planet = trackedPlanet.distanceAU
    ? planets.find((mesh) => mesh.userData.key === trackedPlanet.key)
    : planets[0];

  if (!planet) {
    return;
  }

  const targetPosition = planet.position.clone().add(cameraOffset);
  camera.position.lerp(targetPosition, 0.05);
  controls.target.lerp(planet.position, 0.05);
}

function computePlanetState(data, date) {
  if (!data.orbit) {
    return null;
  }

  const elements = computeOrbitalElements(data, date);
  const frame = computeOrbitalFrame(elements, data.key);
  const meanAnomaly = normalizeRadians(
    elements.meanLongitude - elements.longitudeOfPerihelion,
  );
  const eccentricAnomaly = solveKeplerEquation(meanAnomaly, elements.e);

  return computeCartesianState(elements, frame, eccentricAnomaly, meanAnomaly);
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
  const argumentOfPerihelion = normalizeRadians(
    elements.longitudeOfPerihelion - elements.ascendingNode,
  );
  const cosOmega = Math.cos(elements.ascendingNode);
  const sinOmega = Math.sin(elements.ascendingNode);
  const cosI = Math.cos(elements.inclination);
  const sinI = Math.sin(elements.inclination);
  const cosW = Math.cos(argumentOfPerihelion);
  const sinW = Math.sin(argumentOfPerihelion);

  const frame = {
    omega: argumentOfPerihelion,
    Px: cosW * cosOmega - sinW * sinOmega * cosI,
    Py: cosW * sinOmega + sinW * cosOmega * cosI,
    Pz: sinW * sinI,
    Qx: -sinW * cosOmega - cosW * sinOmega * cosI,
    Qy: -sinW * sinOmega + cosW * cosOmega * cosI,
    Qz: cosW * sinI,
  };

  frame.validation = validateOrbitalFrame(frame, planetKey);
  return frame;
}

function validateOrbitalFrame(frame, planetKey) {
  const condition1 = frame.Px ** 2 + frame.Py ** 2 + frame.Pz ** 2;
  const condition2 = frame.Qx ** 2 + frame.Qy ** 2 + frame.Qz ** 2;
  const condition3 = frame.Px * frame.Qx + frame.Py * frame.Qy + frame.Pz * frame.Qz;
  const isValid =
    Math.abs(condition1 - 1) <= FRAME_EPSILON &&
    Math.abs(condition2 - 1) <= FRAME_EPSILON &&
    Math.abs(condition3) <= FRAME_EPSILON;

  if (!isValid && planetKey && !validatedOrbitKeys.has(planetKey)) {
    console.warn(`Orbital frame validation failed for ${planetKey}`, {
      condition1,
      condition2,
      condition3,
    });
  }

  if (planetKey) {
    validatedOrbitKeys.add(planetKey);
  }

  return {
    condition1,
    condition2,
    condition3,
    isValid,
  };
}

function computeCartesianState(
  elements,
  frame,
  eccentricAnomaly,
  meanAnomaly = null,
) {
  const r = elements.a * (1 - elements.e * Math.cos(eccentricAnomaly));
  const X = elements.a * (Math.cos(eccentricAnomaly) - elements.e);
  const Y =
    elements.a *
    Math.sin(eccentricAnomaly) *
    Math.sqrt(1 - elements.e * elements.e);

  const x = frame.Px * X + frame.Qx * Y;
  const y = frame.Py * X + frame.Qy * Y;
  const z = frame.Pz * X + frame.Qz * Y;

  return {
    r,
    X,
    Y,
    meanAnomaly,
    eccentricAnomaly,
    elements,
    frame,
    coordinates: { x, y, z },
  };
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

function updatePlanetInfoPanel(data) {
  document.getElementById("planetName").textContent = data.name;
  document.getElementById("planetType").textContent = data.type;
  document.getElementById("planetPeriod").textContent = data.period;
  document.getElementById("planetRadius").textContent = data.radius;
  document.getElementById("planetTemp").textContent = data.temp;
  document.getElementById("planetMoons").textContent = data.moons;
  document.getElementById("planetDistance").textContent = data.distance;

  const colorHex = `#${data.color.toString(16).padStart(6, "0")}`;
  document.getElementById("planetColorIndicator").style.backgroundColor = colorHex;
  document.getElementById("planetColorIndicator").style.boxShadow = `0 0 20px ${colorHex}`;

  const state = computePlanetState(data, simulationDate);
  setText("planetSimDate", formatSimulationDate(simulationDate));

  if (!state) {
    setCalculationFieldsToNA();
    return;
  }

  setText("planetSemiMajorAxis", `${state.elements.a.toFixed(6)} AU`);
  setText("planetEccentricity", state.elements.e.toFixed(6));
  setText("planetInclination", `${radToDeg(state.elements.inclination).toFixed(4)} deg`);
  setText("planetArgPeriapsis", `${radToDeg(state.frame.omega).toFixed(4)} deg`);
  setText(
    "planetAscendingNode",
    `${radToDeg(state.elements.ascendingNode).toFixed(4)} deg`,
  );
  setText("planetMeanAnomaly", `${radToDeg(state.meanAnomaly).toFixed(4)} deg`);
  setText(
    "planetEccentricAnomaly",
    `${radToDeg(state.eccentricAnomaly).toFixed(4)} deg`,
  );
  setText("planetRadiusVector", `${state.r.toFixed(6)} AU`);
  setText("planetOrbitalX", `${state.X.toFixed(6)} AU`);
  setText("planetOrbitalY", `${state.Y.toFixed(6)} AU`);
  setText("planetCartesianX", `${state.coordinates.x.toFixed(6)} AU`);
  setText("planetCartesianY", `${state.coordinates.y.toFixed(6)} AU`);
  setText("planetCartesianZ", `${state.coordinates.z.toFixed(6)} AU`);
  setText("planetFrameCheck", state.frame.validation.isValid ? "OK" : "Warning");
}

function setCalculationFieldsToNA() {
  setText("planetSemiMajorAxis", "N/A");
  setText("planetEccentricity", "N/A");
  setText("planetInclination", "N/A");
  setText("planetArgPeriapsis", "N/A");
  setText("planetAscendingNode", "N/A");
  setText("planetMeanAnomaly", "N/A");
  setText("planetEccentricAnomaly", "N/A");
  setText("planetRadiusVector", "N/A");
  setText("planetOrbitalX", "N/A");
  setText("planetOrbitalY", "N/A");
  setText("planetCartesianX", "N/A");
  setText("planetCartesianY", "N/A");
  setText("planetCartesianZ", "N/A");
  setText("planetFrameCheck", "N/A");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function getJulianDate(date) {
  return date.getTime() / MILLISECONDS_PER_DAY + UNIX_EPOCH_JULIAN_DATE;
}

function getJulianCenturies(date) {
  return (getJulianDate(date) - J2000_JULIAN_DATE) / 36525;
}

function getSimulationDaysPerSecond() {
  if (timeSpeed <= 0) {
    return 0;
  }

  return Math.pow(10, timeSpeed / 1.5) - 1;
}

function refreshSimulationUI() {
  setText("simDateValue", formatSimulationDate(simulationDate));
  setText("speedValue", formatSimulationRate(getSimulationDaysPerSecond()));
}

function formatSimulationDate(date) {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function formatSimulationRate(daysPerSecond) {
  if (isPaused || daysPerSecond <= 0) {
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

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function isPrimaryPointer(event) {
  return event.isPrimary !== false;
}

function isUIEventTarget(target) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest(".pointer-events-auto"));
}

function updatePointerCoordinates(clientX, clientY) {
  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;
}

function findPlanetIntersections(clientX, clientY) {
  updatePointerCoordinates(clientX, clientY);
  raycaster.setFromCamera(mouse, camera);
  return raycaster.intersectObjects(planets);
}

function onMouseMove(event) {
  if (pointerDownPosition && event.pointerId === activePointerId) {
    const dragDistance = Math.hypot(
      event.clientX - pointerDownPosition.x,
      event.clientY - pointerDownPosition.y,
    );

    if (dragDistance > 5) {
      isDraggingScene = true;
    }
  }

  if (event.pointerType && event.pointerType !== "mouse") {
    return;
  }

  if (isUIEventTarget(event.target)) {
    document.body.style.cursor = "default";
    return;
  }

  const intersects = findPlanetIntersections(event.clientX, event.clientY);
  document.body.style.cursor = intersects.length > 0 ? "pointer" : "default";
}

function onPointerDown(event) {
  if (!isPrimaryPointer(event)) {
    return;
  }

  if (event.pointerType === "mouse" && event.button !== 0) {
    pointerDownPosition = null;
    activePointerId = null;
    return;
  }

  if (isUIEventTarget(event.target)) {
    pointerDownPosition = null;
    activePointerId = null;
    return;
  }

  pointerDownPosition = {
    x: event.clientX,
    y: event.clientY,
  };
  activePointerId = event.pointerId;
  isDraggingScene = false;
}

function onPointerUp(event) {
  if (!isPrimaryPointer(event)) {
    return;
  }

  if (
    pointerDownPosition &&
    event.pointerId === activePointerId &&
    !isDraggingScene &&
    !isUIEventTarget(event.target) &&
    !(event.pointerType === "mouse" && event.button !== 0)
  ) {
    onMouseClick(event);
  }

  setTimeout(() => {
    pointerDownPosition = null;
    activePointerId = null;
    isDraggingScene = false;
  }, 0);
}

function onZoomInput() {
  if (trackedPlanet) {
    stopTracking();
  }

  closePlanetInfoPanel();
}

function onTouchStart(event) {
  if (event.touches.length > 1) {
    if (trackedPlanet) {
      stopTracking();
    }

    closePlanetInfoPanel();
  }
}

function onMouseClick(event) {
  if (isDraggingScene) {
    return;
  }

  const intersects = findPlanetIntersections(event.clientX, event.clientY);

  if (intersects.length > 0) {
    const planet = intersects[0].object;
    selectPlanet(planet.userData);
    focusOnPlanet(planet.userData);
  }
}

function selectPlanet(data) {
  selectedPlanet = data;
  updatePlanetInfoPanel(data);
  lastPlanetInfoOpenAt = performance.now();

  const panel = document.getElementById("planetInfo");
  if (planetInfoHideTimeout) {
    clearTimeout(planetInfoHideTimeout);
    planetInfoHideTimeout = null;
  }
  panel.classList.remove("hidden");
  setTimeout(() => {
    panel.classList.remove("translate-y-full", "opacity-0");
  }, 10);
}

function closePlanetInfoPanel() {
  const panel = document.getElementById("planetInfo");
  if (!panel || panel.classList.contains("hidden")) {
    return;
  }

  if (planetInfoHideTimeout) {
    clearTimeout(planetInfoHideTimeout);
  }
  panel.classList.add("translate-y-full", "opacity-0");
  planetInfoHideTimeout = setTimeout(() => {
    panel.classList.add("hidden");
    planetInfoHideTimeout = null;
  }, 300);
  selectedPlanet = null;
}

function onOutsidePlanetInfoClick(event) {
  const panel = document.getElementById("planetInfo");
  if (!panel || panel.classList.contains("hidden") || isDraggingScene) {
    return;
  }

  if (performance.now() - lastPlanetInfoOpenAt < 250) {
    return;
  }

  if (event.target instanceof Element && event.target.closest("#planetInfo")) {
    return;
  }

  if (event.target instanceof Element && event.target.closest(".planet-btn")) {
    return;
  }

  if (isUIEventTarget(event.target)) {
    return;
  }

  if (event.target === renderer.domElement) {
    const intersects = findPlanetIntersections(event.clientX, event.clientY);
    if (intersects.length > 0) {
      return;
    }
  }

  closePlanetInfoPanel();
}

function focusOnPlanet(planetData) {
  let targetPlanet;

  if (!planetData.distanceAU) {
    targetPlanet = planets[0];
    cameraOffset.set(0, 20, 40);
  } else {
    targetPlanet = planets.find((planet) => planet.userData.key === planetData.key);
    if (targetPlanet) {
      const offset = planetData.size * 6;
      cameraOffset.set(offset, offset, offset);
    }
  }

  if (targetPlanet) {
    trackedPlanet = planetData;

    const targetPosition = targetPlanet.position.clone().add(cameraOffset);
    camera.position.lerp(targetPosition, 0.3);
    controls.target.copy(targetPlanet.position);
    document.getElementById("stopTracking").classList.remove("hidden");
  }

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
    refreshSimulationUI();
  });

  document.getElementById("resetView").addEventListener("click", () => {
    stopTracking();
    simulationDate = new Date();
    timeSpeed = 1;
    isPaused = false;
    const speedSlider = document.getElementById("speedSlider");
    speedSlider.value = "1";
    speedSlider.dispatchEvent(new Event("input", { bubbles: true }));
    document.getElementById("playIcon").setAttribute("data-lucide", "pause");
    lucide.createIcons();
    camera.position.set(0, 60, 120);
    controls.target.set(0, 0, 0);
    controls.update();
    refreshSimulationUI();

    if (selectedPlanet) {
      updatePlanetInfoPanel(selectedPlanet);
    }
  });

  document.getElementById("speedSlider").addEventListener("input", (event) => {
    timeSpeed = parseFloat(event.target.value);
    refreshSimulationUI();

    if (selectedPlanet) {
      updatePlanetInfoPanel(selectedPlanet);
    }
  });

  document.getElementById("closePlanetInfo").addEventListener("click", () => {
    closePlanetInfoPanel();
  });

  document.getElementById("stopTracking").addEventListener("click", () => {
    stopTracking();
  });

  const focusPlanetButton = document.getElementById("focusPlanet");
  if (focusPlanetButton) {
    focusPlanetButton.addEventListener("click", () => {
      if (selectedPlanet) {
        focusOnPlanet(selectedPlanet);
      }
    });
  }

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

init();
