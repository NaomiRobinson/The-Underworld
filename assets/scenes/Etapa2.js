import {
  OBSTACULOS,
  FUEGO,
  OBSTACULOS_DELAY,
} from "../../utils.js";

export default class Juego extends Phaser.Scene {
    constructor() {

      super("etapa2");
    }

init() {}

preload () {

  this.load.image (FUEGO, "./assets/images/fuego.png");
}

create () {

  this.add.image(400, 300, "fondo");

  this.jugador = this.physics.add.sprite(150, 300, "jugador").setScale(0.5);

  this.plataforma = this.physics.add.staticSprite(400, 600, "plataforma").setScale(1);

  this.obstaclesGroup = this.physics.add.group();

  this.physics.add.collider(this.jugador, this.plataforma);


  this.cursors = this.input.keyboard.createCursorKeys();

  this.time.addEvent({
    delay: OBSTACULOS_DELAY,
    callback: this.addObstacle,
    callbackScope: this,
    loop: true,
  });

}

update () {

  if ( (this.cursors.up.isDown || this.cursors.space.isDown ) && this.jugador.body.touching.down) {
    this.jugador.setVelocityY(-600);
  }

  if (this.cursors.left.isDown) {
    this.jugador.setVelocityX(-200);
  }
  
  else if (this.cursors.right.isDown) {
    this.jugador.setVelocityX(200);
  }

  else {
    this.jugador.setVelocityX(0);
  }
  
  }

  addObstacle() {

    const randomObstacle = Phaser.Math.RND.pick(OBSTACULOS);

    const randomX = Phaser.Math.RND.between(10, 790);

    const obstacle = this.physics.add.sprite(randomX, 0, randomObstacle).setScale (0.1);

    this.obstaclesGroup.add(obstacle);
    obstacle.value = 1;
    obstacle.setCircle(32, 0, 0);

    console.log("obstacle is added", randomX, randomObstacle);
  }

}