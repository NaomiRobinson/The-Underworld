import {
    ENEMIGOS,
    OJO,
    FANTASMA,
    ENEMIGOS_DELAY,
    MONEDA,
    OBJETOS,
    OBJETOS_DELAY,
    VIDAEXTRA,
    GEMA,
    COLLAR,
    ESPEJO,
    CALIZ,
} from "../../utils.js";

export default class Juego extends Phaser.Scene {
  constructor() {

    super("etapa1");
  }

  init() {
    this.objetoRecolectado = {  
      [MONEDA]: { prob: 0.8, score: 50},
      [GEMA]: { prob: 0.6, score: 100},
      [COLLAR]: { prob: 0.5, score: 150},
      [ESPEJO]: { prob: 0.3, score: 200},
      [CALIZ]: { prob: 0.1, score: 500},

      [VIDAEXTRA]: { prob: 0.3, score: 0},
    };

  this.isGameOver = false;
  
  this.vidaExtra = false;

  this.puntaje = 0;
  this.tiempo= 0;

  this.dificultad = 1;

  }

  preload () {
    this.load.image("fondo", "./assets/images/fondo.png");
    this.load.image(OJO, "./assets/images/ojo.png");
    this.load.image(FANTASMA, "./assets/images/fantasma.png");
    this.load.image(MONEDA, "./assets/images/moneda.png");

  }

  create () {
    this.add.image(400, 300, "fondo");

    this.jugador = this.physics.add.sprite(300, 300, "jugador").setScale(0.5);

    this.plataforma = this.physics.add.staticSprite(400, 600, "plataforma").setScale(1);

    this.physics.add.collider(this.jugador, this.plataforma);


    this.cursors = this.input.keyboard.createCursorKeys();

    this.grupoEnemigos = this.physics.add.group();

    this.grupoObjetos = this.physics.add.group();
    this.physics.add.collider(this.grupoObjetos, this.plataforma);
    this.physics.add.collider(this.grupoEnemigos, this.plataforma);



    this.physics.add.overlap(
      this.jugador,
      this.grupoEnemigos,
      this.restarVida, 
      null,
      this 
    );

    this.physics.add.overlap(
      this.jugador,
      this.grupoObjetos,
      this.recolectarObjeto,
      null,
      this
    );

    this.time.addEvent({
      delay: ENEMIGOS_DELAY,
      callback: this.agregarEnemigo,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: OBJETOS_DELAY,
      callback: this.agregarObjeto,
      callbackScope: this,
      loop: true,
    });


    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarTiempo,
      callbackScope: this,
      loop: true,
    });


    this.textoPuntaje = this.add.text(16, 40, "Puntaje:" + this.puntaje, {
      fontSize: "20px",
      fill: "#FFFFFF",
      fontStyle: "bold",
    });

    this.textoTiempo = this.add.text(16,60, this.tiempo, {
      fontSize: "20px",
      fill: "#E6DE35",
      fontStyle: "bold",
    });




  }

  update () {

    const tocarObjeto = this.physics.overlap(this.jugador, this.grupoObjetos);

    if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.jugador.body.touching.down && !tocarObjeto) {
      this.jugador.setVelocityY(-2000);
    }

    if (this.isGameOver) {
      this.scene.start("fin");
    }

    const tiempoActual = this.time.now;

  if (this.tiempo >= 20) {
    this.vidaExtra = this.scene.get('etapa1').data.get('vidaExtra');
    this.scene.switch("etapa2", { tiempo: this.tiempo, puntaje: this.puntaje, dificultad: this.dificultad});
  }


  }


  agregarEnemigo() {
    const enemigoRandom = Phaser.Math.RND.pick(ENEMIGOS);
    const enemigo = this.physics.add.sprite(970, 400, enemigoRandom).setScale(1);
    
    this.grupoEnemigos.add(enemigo);
    
    enemigo.setVelocityX(-500);
    this.aumentarDificultad();
    console.log("enemy is added");
  
  const retrasoAparicion = 1000;

  this.aparicionEnemigo = Phaser.Math.RND.between(
    ENEMIGOS_DELAY.MIN / this.dificultad,
    ENEMIGOS_DELAY.MAX / this.dificultad
  );
  this.aparicionEnemigo = this.time.now + this.aparicionEnemigo + retrasoAparicion;
  }

    agregarObjeto() {
      let objetoRandom = Phaser.Math.RND.pick(OBJETOS);
  
      if (objetoRandom === VIDAEXTRA && this.vidaExtra) {
        objetoRandom = Phaser.Math.RND.pick(
          OBJETOS.filter((objeto) => objeto !== VIDAEXTRA)
        );
      }
  
      const randomY = Phaser.Math.RND.between(20, 450);

      const probTotal = OBJETOS.reduce((total, objeto) => total + objeto.probabilidad, 0);
      const numRandom = Phaser.Math.RND.frac() * probTotal;  //número aleatorio entre 0 y el peso total utilizando 

      
      let acum = 0;

      for (const objeto of OBJETOS) {
        acum += objeto.probabilidad;
        if (numRandom <= acum) {
          objetoRandom = objeto.nombre;
          break;
        }
      }
    
    
  
      const objeto = this.physics.add.sprite(700, randomY, objetoRandom);
  
      this.grupoObjetos.add(objeto);
      objeto.setCircle(15, 0, 0);
      objeto.setVelocityX(-290);
      objeto.body.allowGravity = false;
      console.log("Se agregó un objeto:", randomY, objetoRandom);
    }

    recolectarObjeto(jugador, objeto) {
      objeto.disableBody(true, true);
  
      if (objeto.texture.key === VIDAEXTRA && !this.vidaExtra) {
        console.log("Objeto recolectado (vida extra)");
        this.vidaExtra = true; // El jugador ha recolectado una vida extra
      }

      const descObjeto = this.objetoRecolectado[objeto.texture.key];
      if (descObjeto) {
        console.log("Objeto recolectado");
        this.puntaje += descObjeto.score;
        this.textoPuntaje.setText("Puntaje: " + this.puntaje);
      }

    }

    restarVida(jugador, enemigo) {
      if (this.vidaExtra) {
        this.vidaExtra = false;
        enemigo.disableBody(true, true);
        console.log("Vida extra usada. Sigue jugando.");
      } else {
        this.isGameOver = true;
        console.log("Game Over");
      }
    }
  
    actualizarTiempo() {
      this.tiempo++;
      this.textoTiempo.setText(this.tiempo.toString());
    }

    aumentarDificultad() {
    this.dificultad += 0.1; 
    console.log("dificultad aumentada");
    }

  }