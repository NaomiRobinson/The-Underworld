export default class Intro extends Phaser.Scene {
    constructor() {

      super("intro");
    }

    init() {}

    preload () {}

    create () {
      this.add.image(400, 300, 'boton').setScale(0.5).setInteractive();

      this.cursors = this.input.keyboard.createCursorKeys();

      
    }

    update () {}

}