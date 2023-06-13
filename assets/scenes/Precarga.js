export default class Precarga extends Phaser.Scene {

  constructor() {
   
    super("precarga");
  }

  preload() {

    this.load.image("fondo", "./assets/images/fondo.png");
    this.load.image("botonPlay", "./assets/images/play.png");
    this.load.image("pelo", "./assets/images/chica.png");
    this.load.image("ladrillos", "./assets/images/ladrillos.png");
    this.load.image("titulo", "./assets/images/titulo.png");
    this.load.image("botonAyuda", "./assets/images/ayuda.png");
    this.load.image("fondoAyuda", "./assets/images/fondoayuda.jpeg");
    
    this.load.image("plataforma", "./assets/images/plataforma.png");
    this.load.image("jugador", "./assets/images/jugador.png");
    
    this.load.image("ojo", "./assets/images/ojo.png");
    this.load.image("fantasma", "./assets/images/fantasma.png")
  }

  //cargar las animaciones en create
  create() {
    
    this.scene.start("fin");
  }
}
