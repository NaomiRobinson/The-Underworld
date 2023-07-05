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

    
    

    this.add.image(420, 250, "pergamino").setScale(0.85);

    this.add.image(300, 180, "puntos").setScale(0.5);
    this.add.image(300, 230, "tiempo").setScale(0.5);
    this.add.image(300, 300, "total").setScale(0.5);
    this.add.image(500, 260, "raya").setScale(0.5);
    this.add.image(400, 205, "x").setScale(0.5);

    this.add.image(300, 350, "record").setScale(0.5);


    const puntajeTotal = this.puntaje * this.tiempo;
    const recordPuntajeTotal = localStorage.getItem('recordPuntajeTotal') || 0;
    

    this.add.text(430, 160, `${this.puntaje}`, { fontSize: "32px", fill: "#000000", fontStyle: "bold" });
    this.add.text(430, 210, `${this.tiempo} `, { fontSize: "32px", fill: "#000000", fontStyle: "bold"});
    this.add.text(430, 280, `${puntajeTotal}`, { fontSize: "32px", fill: "#000000", fontStyle: "bold" });
  
    this.add.text(430, 330, `${recordPuntajeTotal}`, { fontSize: "32px", fill: "#000000", fontStyle: "bold" });

    if (puntajeTotal >= recordPuntajeTotal) {

      this.add.image(430, 60, "felicidades").setScale(0.5);
      this.add.image(468, 60, "superorecord").setScale(0.5);
    } else {
      this.add.image(420, 80, "juegadenuevo").setScale(0.5);
      
    };

    const botonJugar = this.add.image(170, 470, 'botonreplay').setScale(0.5).setInteractive();
    const botonMenu = this.add.image(310, 470,  'botonmenu').setScale(0.5).setInteractive();


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


