export default class Juego extends Phaser.Scene {
    constructor() {

      super("etapa1");
    }

    init() {}

    preload () {
        this.load.image("fondo", "./assets/images/fondo.png");
        this.load.image("plataforma", "./assets/images/plataforma.png");
        this.load.image("jugador", "./assets/images/jugador.png");
    }

    create () {
        this.add.image(400, 300, "fondo");

        this.jugador = this.physics.add.sprite(150, 300, "jugador");

        this.plataforma = this.physics.add.staticSprite(400, 600, "plataforma").setScale(1);

        this.physics.add.collider(this.jugador, this.plataforma);


        this.cursors = this.input.keyboard.createCursorKeys();


    }

    update () {

        if (this.cursors.up.isDown && this.jugador.body.touching.down) {
            this.jugador.setVelocityY(-260);
          }
    }
}