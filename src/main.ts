import * as ex from 'excalibur';
import { loader } from './resources';
import { Level } from './level';

const engine = new ex.Engine({
    backgroundColor: ex.Color.fromHex('#efefef'),
    width: 600,
    height: 400,
    fixedUpdateFps: 60,
    // Turn off anti-aliasing for pixel art graphics
    antialiasing: false,

    // Set global gravity in pixels/sec^2
    physics: {
        solver: ex.SolverStrategy.Arcade,
        gravity: ex.vec(0, 800),
        arcade: {
            contactSolveBias: ex.ContactSolveBias.VerticalFirst
        },
      }
});

// Setup first level as a custom scene
const level = new Level();
engine.add('level', level);
engine.goToScene('level');

// Game events to handle
engine.on('hidden', () => {
    console.log('pause');
    engine.stop();
});
engine.on('visible', () => {
    console.log('start');
    engine.start();
});

// Start the engine
engine.start(loader).then(() => {
    console.log('game start');
});

// For test hook
(window as any).engine = engine;
(window as any).level = level;

export default engine;