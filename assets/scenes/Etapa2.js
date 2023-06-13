export default class Juego extends Phaser.Scene {
    constructor() {

      super("etapa2");
    }

init() {}

preload () {}

create () {

  this.add.image(400, 300, "fondo");

  this.jugador = this.physics.add.sprite(150, 300, "jugador");

  this.plataforma = this.physics.add.staticSprite(400, 600, "plataforma").setScale(1);

  this.physics.add.collider(this.jugador, this.plataforma);


  this.cursors = this.input.keyboard.createCursorKeys();

}

update () {

  if (this.cursors.left.isDown) {
    this.jugador.setVelocityX(-160);
  }
  
  else if (this.cursors.right.isDown) {
    this.jugador.setVelocityX(160);
  }

  else {
    this.jugador.setVelocityX(0);
  }

  
  }
}