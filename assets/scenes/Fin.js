export default class Fin extends Phaser.Scene {
  constructor() {

      super("fin");
  }

  init(data) {
    this.puntaje = data.puntaje || 0;
    this.tiempo = data.tiempo || 0;
  }

  preload () {}

  create () {

    
    this.add.image(400, 300, "rectangulo").setScale(0.9);

    const recordPuntaje = localStorage.getItem('recordPuntaje') || 0;

    this.add.text(16, 16, `Puntos: ${this.puntaje}`, { fontSize: "32px", fill: "#fff" });

    // Crear el texto para mostrar la duración
    this.add.text(16, 64, `Duración: ${this.tiempo} segundos`, { fontSize: "32px", fill: "#fff" });

    this.add.text(16, 112, `Récord: ${recordPuntaje}`, { fontSize: "32px", fill: "#fff" });
  


    
    const botonJugar = this.add.image(305, 400, 'botonreplay').setScale(0.5).setInteractive();
    const botonMenu = this.add.image(500, 400,  'botonmenu').setScale(0.5).setInteractive();


    botonJugar.on("pointerover", () => {
        this.game.canvas.style.cursor = "pointer"
    });
  
    botonJugar.on("pointerout", () => {
        this.game.canvas.style.cursor = "default";
    });
    
    botonJugar.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
      etapa1Scene.reiniciarDatos();
      etapa2Scene.reiniciarDatos();
      this.scene.start("prueba");
    });
  

  
    botonMenu.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer"
    });
  
    botonMenu.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
    });
  
    botonMenu.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
      etapa1Scene.reiniciarDatos();
      etapa2Scene.reiniciarDatos();
      this.scene.start("menu");
    });

    const etapa1Scene = this.scene.get("etapa1");
    const etapa2Scene = this.scene.get("etapa2");

    this.reiniciarDatos(etapa1Scene, etapa2Scene);
  }

  update() {}

  reiniciarDatos(etapa1Scene, etapa2Scene) {
    console.log("Reiniciar datos persistentes");


    etapa1Scene.reiniciarDatos();
    etapa2Scene.reiniciarDatos();
  }


}