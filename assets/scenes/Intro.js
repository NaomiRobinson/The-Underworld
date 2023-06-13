export default class Intro extends Phaser.Scene {
    constructor() {

      super("intro");
    }

    init() {
      this.segundaImg= false;
      this.terceraImg= false;
    }

    preload () {}

    create () {

      this.add.image(400, 300, "fondo");

      this.cursors = this.input.keyboard.createCursorKeys();

      
    }

    update () {
      

    }

}