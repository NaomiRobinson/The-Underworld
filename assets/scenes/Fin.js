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

    const etapa1Scene = this.scene.get("etapa1");
    const etapa2Scene = this.scene.get("etapa2");

    
    this.add.image(400, 300, "ladrillos").setScale(1);

    const puntajeTotal = this.puntaje * this.tiempo;
    const recordPuntajeTotal = localStorage.getItem('recordPuntajeTotal') || 0;
    

    this.add.text(200, 76, `Puntos: ${this.puntaje}`, { fontSize: "32px", fill: "#fff" });

   
    this.add.text(200, 124, `Duración: ${this.tiempo} segundos`, { fontSize: "32px", fill: "#fff" });

    this.add.text(200, 220, `Total: ${puntajeTotal}`, { fontSize: "32px", fill: "#fff" });

    this.add.text(200, 172, `Récord: ${recordPuntajeTotal}`, { fontSize: "32px", fill: "#fff" });

    
    

    if (puntajeTotal >= recordPuntajeTotal) {

      this.add.text(160, 280, "¡Felicitaciones!", { fontSize: "50px", fill: "#fff" });
      this.add.text(140, 360, "Superaste tu récord", { fontSize: "45px", fill: "#fff" });
    };



      

  


    
    const botonJugar = this.add.image(200, 500, 'botonreplay').setScale(0.5).setInteractive();
    const botonMenu = this.add.image(600, 500,  'botonmenu').setScale(0.5).setInteractive();


    botonJugar.on("pointerover", () => {
        this.game.canvas.style.cursor = "pointer"
    });
  
    botonJugar.on("pointerout", () => {
        this.game.canvas.style.cursor = "default";
    });
    
    botonJugar.on("pointerdown", () => {

    if (etapa2Scene) {
      etapa1Scene.data.destroy();
    }
    if (etapa1Scene) {
      etapa1Scene.data.destroy();
    }
    this.scene.start("etapa1inicio");
  });

  
    botonMenu.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer"
    });
  
    botonMenu.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
    });
  
    botonMenu.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
    
      this.scene.start("menu");
    });

    

    
  }

  update() {}


  }


