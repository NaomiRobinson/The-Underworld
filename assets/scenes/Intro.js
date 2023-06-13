export default class Intro extends Phaser.Scene {
  constructor() {

      super("intro");
  }

  init() {}

  preload () {

    this.load.spritesheet("anim", "./public/images/animacion.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
  }

  create () {

    this.anims.create({
      key: "animacion",
      frames: this.anims.generateFrameNumbers("anim"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.play("animacion")
      
  }

  update () {


  }

}