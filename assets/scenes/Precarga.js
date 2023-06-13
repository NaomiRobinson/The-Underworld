export default class Precarga extends Phaser.Scene {

  constructor() {
   
    super("precarga");
  }

  preload() {

  
    this.load.image("fondo", "./assets/images/fondo.png");
    this.load.image("boton", "./assets/images/boton.png");
  }

  //cargar las animaciones en create
  create() {
    
    this.scene.start("menu");
  }
}
