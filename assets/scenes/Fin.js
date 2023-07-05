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
    const startY = -this.sys.game.config.height;
    const endY = 0;

    this.cameras.main.y = startY;
    this.tweens.add({
      targets: this.cameras.main,
      y: endY,
      duration: 1000,
      ease: 'Cubic',

  });
    

    // const etapa1Scene = this.scene.get("etapa1");
    // const etapa2Scene = this.scene.get("etapa2");

    this.sound.stopAll();

    const sonidoPerder = this.sound.add("perder");
    sonidoPerder.play();

    const musicaMenu = this.sound.add("musicaMenu");
    musicaMenu.play();
    musicaMenu.setLoop(true);

    const sonidoSeleccion = this.sound.add("seleccionMenu");

    
    this.add.image(400, 300, "ladrillos").setScale(0.6);

    this.add.image(400, 300, "recuadro").setScale(0.6);

    const puntajeTotal = this.puntaje * this.tiempo;
    const recordPuntajeTotal = localStorage.getItem('recordPuntajeTotal') || 0;
    

    this.add.text(200, 76, `Puntos: ${this.puntaje}`, { fontSize: "32px", fill: "#cd912b", fontStyle: "bold" });
    this.add.text(200, 124, `Duración: ${this.tiempo} s`, { fontSize: "32px", fill: "#cd912b", fontStyle: "bold"});
    this.add.text(200, 172, `Total: ${puntajeTotal}`, { fontSize: "32px", fill: "#cd912b", fontStyle: "bold" });
  
    this.add.text(200, 220, `Récord: ${recordPuntajeTotal}`, { fontSize: "32px", fill: "#cd912b", fontStyle: "bold" });

    if (puntajeTotal >= recordPuntajeTotal) {

      this.add.text(160, 280, "¡Felicitaciones!", { fontSize: "50px", fill: "#fff" });
      this.add.text(140, 360, "Superaste tu récord", { fontSize: "45px", fill: "#fff" });
    } else {
      this.add.text(160, 280, "juega de nuevo", { fontSize: "50px", fill: "#fff" });
      this.add.text(90, 360, "para superar tu record", { fontSize: "45px", fill: "#fff" });
    };

    const botonJugar = this.add.image(100, 500, 'botonreplay').setScale(0.5).setInteractive();
    const botonMenu = this.add.image(270, 500,  'botonmenu').setScale(0.5).setInteractive();


    botonJugar.on("pointerover", () => {
        this.game.canvas.style.cursor = "pointer"
    });
  
    botonJugar.on("pointerout", () => {
        this.game.canvas.style.cursor = "default";
    });
    
    botonJugar.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
    // if (etapa2Scene) {
    //   etapa1Scene.data.destroy();
    // }
    // if (etapa1Scene) {
    //   etapa1Scene.data.destroy();
    // }
    sonidoSeleccion.play();
    
    this.scene.stop("etapa2");
    this.scene.stop("etapa1inicio");
    this.scene.stop("etapa1");
    this.scene.stop("fin");
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
      sonidoSeleccion.play();
      this.scene.stop("etapa2");
      this.scene.stop("etapa1inicio");
      this.scene.stop("etapa1");
      this.scene.stop("fin");
      this.scene.start("menu");
    });

    

    
  }

  update() {}


  }


