/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/wdCdiRdM
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(800, 450, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');
    game.load.image('flatformer', 'sprites/space-baddie-purple.png');
}

var player;
var platforms;
var cursors;
var jumpButton;
var BLOCKSIZE = 64;

function create() {
    player = game.add.sprite(100, 200, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    player.body.maxVelocity.x = 175;
    
    platforms = game.add.physicsGroup();
    platforms.create(0, 450 - BLOCKSIZE, 'platform');
    platforms.create(400, 450 - BLOCKSIZE, 'platform');
    platforms.width = 800;
    platforms.height = BLOCKSIZE;
    platforms.setAll('body.immovable', true);
    
    flatformer = game.add.sprite(0, BLOCKSIZE, 'flatformer');
    game.physics.arcade.enable(flatformer);
    flatformer.smoothed = false;
    flatformer.body.collideWorldBounds = true;
    flatformer.body.gravity.y = 75;
    flatformer.body.velocity.x = 75;
    flatformer.body.bounce.x = 1.0;
    flatformer.body.bounce.y = 1.0;
    flatformer.width = BLOCKSIZE * 0.75;
    flatformer.height = BLOCKSIZE * 0.75;
    
    flatformer_platform = game.add.sprite(0, BLOCKSIZE, 'platform');
    game.physics.arcade.enable(flatformer_platform);
    flatformer_platform.alpha = 0;
    flatformer_platform.width = BLOCKSIZE * 0.75;
    flatformer_platform.height = BLOCKSIZE * 0.75;
    flatformer_platform.body.immovable = true;

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

var FRICTION = 20;

function update () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(flatformer, platforms);
    game.physics.arcade.collide(player, flatformer_platform, collideFlatformer);

    if (cursors.left.isDown || leftButton.isDown)
    {
        player.body.acceleration.x = -250;
        if (player.body.velocity.x > 0)
        {
            player.body.velocity.x += -FRICTION*2;
        }
    }
    else if (cursors.right.isDown || rightButton.isDown)
    {
        player.body.acceleration.x = 250;
        if (player.body.velocity.x < 0)
        {
            player.body.velocity.x += FRICTION*2;
        }
    }
    else
    {
        if (player.body.velocity.x > FRICTION)
        {
            player.body.velocity.x -= FRICTION;
        }
        else if (player.body.velocity.x < -FRICTION)
        {
            player.body.velocity.x -= -FRICTION;
        }
        else
        {
            player.body.acceleration.x = 0;
            player.body.velocity.x = 0;
        }
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -300;
    }
    
    flatformer_platform.position = flatformer.position;
}
function collideFlatformer()
{
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        flatformer.destroy();
        flatformer_platform.destroy();
    }
}

function render () {

}
