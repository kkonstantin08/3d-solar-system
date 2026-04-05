# 3D Solar System

Интерактивный 3D-проект для просмотра Солнечной системы в браузере. Сцена построена на `Three.js`, а интерфейс оформлен с помощью Tailwind CDN и Lucide Icons.

## Что изменилось

Проект больше не использует условные круговые орбиты. Положение планет рассчитывается по кеплеровским элементам и текущей симулируемой дате.

- реальные орбитальные элементы для планет взяты из NASA JPL Solar System Dynamics:
  https://ssd.jpl.nasa.gov/planets/approx_pos.html
- для каждой планеты рассчитываются `M`, `E`, орбитальные координаты `X`, `Y` и 3D-положение
- орбиты отображаются как наклонённые эллипсы, а не как плоские кольца
- скорость времени теперь управляет течением симулируемой даты

## Возможности

- 3D-визуализация Солнца и 8 планет
- анимация движения по кеплеровским орбитам
- наклонённые эллиптические траектории
- выбор планеты кликом
- автоматическое приближение камеры и слежение за выбранной планетой
- отключение трекинга при ручном зуме
- панель с краткой информацией о планете
- отображение симулируемой даты и скорости времени
- дополнительные параметры орбиты в карточке планеты: большая полуось, эксцентриситет и наклонение

## Управление

- клик по планете: выбрать планету и включить слежение
- перетаскивание мышью: вращение сцены
- правая кнопка мыши: панорамирование
- колесо мыши: масштабирование и отмена трекинга
- слайдер времени: ускорение или остановка симуляции
- `Reset View`: сброс камеры и возврат симуляции к текущей дате

## Запуск

Так как проект состоит из статических файлов, достаточно открыть его через локальный сервер.

Пример с VS Code Live Server:

```text
Open with Live Server
```

После запуска откройте `index.html` в браузере.

## Структура

- `index.html` - разметка интерфейса и HUD-панелей
- `scripts.js` - логика сцены, расчёт орбит, анимация, взаимодействие и камера

---

Interactive 3D browser project for exploring the Solar System. The scene is built with `Three.js`, while the interface uses Tailwind CDN and Lucide Icons.

## What's New

The project no longer uses simplified circular motion. Planet positions are now computed from Keplerian orbital elements and the current simulated date.

- public orbital elements are based on NASA JPL Solar System Dynamics:
  https://ssd.jpl.nasa.gov/planets/approx_pos.html
- each frame computes mean anomaly, eccentric anomaly, orbital coordinates, and 3D heliocentric position
- orbits are rendered as inclined ellipses instead of flat circular rings
- the time slider controls the flow of simulated calendar time

## Features

- 3D visualization of the Sun and 8 planets
- Kepler-based orbital animation
- inclined elliptical orbit paths
- planet selection on click
- automatic camera zoom and tracking for the selected planet
- tracking cancellation on manual zoom
- compact planet information panel
- simulated date and time-rate display
- extra orbital parameters in the info card: semi-major axis, eccentricity, and inclination

## Controls

- click a planet: select it and start tracking
- drag with the mouse: rotate the scene
- right mouse button: pan
- mouse wheel: zoom and cancel tracking
- time slider: accelerate or pause the simulation
- `Reset View`: reset the camera and restore the simulation date to now

## Run

Since this is a static project, you only need to serve it locally.

Example with VS Code Live Server:

```text
Open with Live Server
```

Then open `index.html` in your browser.

## Structure

- `index.html` - UI markup and HUD panels
- `scripts.js` - scene logic, orbital computation, animation, interaction, and camera logic
