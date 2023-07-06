export default class Precarga extends Phaser.Scene {

  constructor() {
    super("precarga");
  }

  preload() {

    this.load.audio("musicaFondo", "./assets/audio/musicajuego.mp3");
    this.load.audio("musicaMenu", "./assets/audio/musicamenu2.mp3");

    this.load.audio("choque", "./assets/audio/choque.mp3");
    
    this.load.audio("juntarObjeto", "./assets/audio/juntarobjeto.mp3");
    this.load.audio("juntarPocion", "./assets/audio/juntarpocion.mp3");
    this.load.audio("perder", "./assets/audio/perder.mp3");
    this.load.audio("salto", "./assets/audio/salto.mp3");
    this.load.audio("seleccionMenu", "./assets/audio/seleccionmenu.mp3");            

    this.load.image("fondo", "./assets/images/fondo.png");
    this.load.image("fondoayuda", "./assets/images/fondoayuda.png");
    this.load.image("fondomenu", "./assets/images/fondomenu.png");
    this.load.image("capa1", "./assets/images/capa1.png");
    this.load.image("capa2", "./assets/images/capa2.png");
    this.load.image("capa3", "./assets/images/capa3.png");
    
    this.load.image("botonPlay", "./assets/images/play.png");
    
    this.load.image("ladrillos", "./assets/images/ladrillos.png");
    this.load.image("pergaminomenu", "./assets/images/ver.png");

    this.load.image("interfaz", "./assets/images/interfaz.png");
    
    
    this.load.image("pergamino", "./assets/images/pergamino.png");
    this.load.image("puntos", "./assets/images/puntos.png");
    this.load.image("x", "./assets/images/x.png");
    this.load.image("total", "./assets/images/total.png");
    this.load.image("tiempo", "./assets/images/tiempo.png");
    this.load.image("superorecord", "./assets/images/superaste.png");
    this.load.image("record", "./assets/images/record.png");
    this.load.image("raya", "./assets/images/raya.png");
    this.load.image("felicidades", "./assets/images/felicidades.png");
    this.load.image("juegadenuevo", "./assets/images/juegadenuevo.png");

    this.load.image("img1", "./assets/images/anim1.png");
    this.load.image("img2", "./assets/images/anim2.png");
    this.load.image("img3", "./assets/images/anim3.png");

    this.load.image("reloj", "./assets/images/reloj.png");

    this.load.image("plataforma", "./assets/images/plataforma.png");
    this.load.image("jugador", "./assets/images/jugador.png");

    this.load.image("frascovacio", "./assets/images/sinvidaextra.png");

    this.load.spritesheet("titulo", "./assets/images/titulo.png", {
      frameWidth: 743,
      frameHeight: 366,
    });
    
    
    this.load.spritesheet("flecha", "./assets/images/flecha.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("menu", "./assets/images/menu.png", {
      frameWidth: 74,
      frameHeight: 72,
    });

    this.load.spritesheet("replay", "./assets/images/replay.png", {
      frameWidth: 74,
      frameHeight: 72,
    });

    this.load.spritesheet("botonAyuda", "./assets/images/ayuda.png", {
      frameWidth: 78,
      frameHeight: 74,
    });

    this.load.spritesheet("personaje", "./assets/images/personaje.png", {
      frameWidth: 177,
      frameHeight: 240,
    });

    this.load.spritesheet("personajellorando", "./assets/images/personajellorando.png", {
      frameWidth: 172,
      frameHeight: 240,
    });


    this.load.spritesheet("fantasma", "./assets/images/fantasma.png", {
      frameWidth: 140,
      frameHeight: 126,
    });
    this.load.spritesheet("ojo", "./assets/images/ojo.png", {
      frameWidth: 133,
      frameHeight: 130,
    });

    this.load.spritesheet("fuego", "./assets/images/fuego.png", {
      frameWidth: 34.5,
      frameHeight: 60,
    });

    this.load.spritesheet("anillo", "./assets/images/anillo.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("caliz", "./assets/images/caliz.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("corona", "./assets/images/corona.png", {
      frameWidth: 35,
      frameHeight: 32,
    });
    this.load.spritesheet("gema", "./assets/images/gema.png", {
      frameWidth: 35,
      frameHeight: 32,
    });
    this.load.spritesheet("moneda", "./assets/images/moneda.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("vidaExtra", "./assets/images/vidaextra.png", {
      frameWidth: 35,
      frameHeight: 32,
    });


  }

  create() {



    
    this.anims.create({
      key: "correr",
      frames: this.anims.generateFrameNumbers("personaje", { start: 1, end: 5 }),
      frameRate: 10,
      repeat: -1, 
    }); 
    this.anims.create({
      key: "parado",
      frames: this.anims.generateFrameNumbers("personaje", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1, 
    }); 

    this.anims.create({
      key: "llanto",
      frames: this.anims.generateFrameNumbers("personajellorando", { start: 0, end: 5}),
      frameRate: 15,
      repeat: -1, 
    }); 

    this.anims.create({
      key: "animFantasma",
      frames: this.anims.generateFrameNumbers("fantasma", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1, 
    })


    this.anims.create({
      key: "animOjo",
      frames: this.anims.generateFrameNumbers("ojo", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1, 
    })

    this.anims.create({
      key: "animFuego",
      frames: this.anims.generateFrameNumbers("fuego", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1, 
    })

    this.anims.create({
      key: "animCaliz",
      frames: this.anims.generateFrameNumbers("caliz", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1, 
    })

    this.anims.create({
      key: "animMoneda",
      frames: this.anims.generateFrameNumbers("moneda", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1, 
    })

    this.anims.create({
      key: "animGema",
      frames: this.anims.generateFrameNumbers("gema", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1, 
    })

    this.anims.create({
      key: "animCorona",
      frames: this.anims.generateFrameNumbers("corona", { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1, 
    })

    this.anims.create({
      key: "animAnillo",
      frames: this.anims.generateFrameNumbers("anillo", { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1, 
    })

    this.anims.create({
      key: "animVidaExtra",
      frames: this.anims.generateFrameNumbers("vidaExtra", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1, 
    })

    
   

    

    this.scene.start("etapa2");

  }
}
