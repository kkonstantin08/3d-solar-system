# 3D Solar System

Интерактивный 3D-проект для просмотра Солнечной системы в браузере. Сцена построена на `Three.js`, а интерфейс оформлен с помощью Tailwind CDN и Lucide Icons.

### Возможности

- 3D-визуализация Солнца и планет
- анимация орбит и вращения планет
- выбор планеты кликом
- автоматическое приближение камеры и слежение за выбранной планетой
- отключение трекинга при ручном зуме
- панель с краткой информацией о планете
- управление скоростью времени, пауза и сброс вида

### Управление

- клик по планете: выбрать планету и включить слежение
- перетаскивание мышью: вращение сцены
- правая кнопка мыши: панорамирование
- колесо мыши: масштабирование и отмена трекинга

### Запуск

Так как проект состоит из статических файлов, достаточно открыть его через локальный сервер.

Пример с VS Code Live Server:

```text
Open with Live Server
```

После запуска откройте `index.html` в браузере.

### Структура

- `index.html` - разметка интерфейса и подключение библиотек
- `scripts.js` - логика сцены, анимации, взаимодействия и камеры

Interactive 3D browser project for exploring the Solar System. The scene is built with `Three.js`, while the interface uses Tailwind CDN and Lucide Icons.

### Features

- 3D visualization of the Sun and planets
- animated orbits and planet rotation
- planet selection on click
- automatic camera zoom and tracking for the selected planet
- tracking cancellation on manual zoom
- compact planet information panel
- time speed control, pause, and view reset

### Controls

- click a planet: select it and start tracking
- drag with the mouse: rotate the scene
- right mouse button: pan
- mouse wheel: zoom and cancel tracking

### Run

Since this is a static project, you only need to serve it locally.

Example with VS Code Live Server:

```text
Open with Live Server
```

Then open `index.html` in your browser.

### Structure

- `index.html` - UI markup and library imports
- `scripts.js` - scene, animation, interaction, and camera logic
