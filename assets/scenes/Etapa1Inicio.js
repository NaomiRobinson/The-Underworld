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
    CORONA,
    ANILLO,
    CALIZ,
} from "../../utils.js";  

export default class Juego extends Phaser.Scene {
  
    constructor() {
      super("etapa1inicio");
  
      
    }

  
    init() {

      this.objetoRecolectado = {
        [MONEDA]: { prob: 0.8, score: 50 },
        [GEMA]: { prob: 0.5, score: 200 },
        [CORONA]: { prob: 0.1, score: 250 },
        [ANILLO]: { prob: 0.3, score: 150 },
        [CALIZ]: { prob: 0.6, score: 100 },
        [VIDAEXTRA]: { prob: 0.3, score: 0 },
      };

      this.tiempoPantalla = 0;
      this.vidaExtra = false;
      this.dificultad = 1;
      this.tiempo = 0;
      this.puntaje = 0;
      this.tiempoPantalla = 0;
      this.ultimoEnemigo = 0;

      this.recordPuntaje = localStorage.getItem('recordPuntaje') || 0;
    
      
    }

  

  preload () {
    
    this.load.image(OJO, "./assets/images/ojo.png");
    this.load.image(FANTASMA, "./assets/images/fantasma.png");
    this.load.image(MONEDA, "./assets/images/moneda.png");

  }

  create () {

    this.fondo = this.add.tileSprite(400, 200, 800, 600, "fondo");
    this.fondo.setScrollFactor(0.5);
    this.fondo.setTileScale(0.9); 
    this.fondo.setTilePosition(400, 400); 

    this.piedras3 = this.add.tileSprite(400, 0, this.game.config.width, this.game.config.height, "capa3");
    this.piedras3.setScrollFactor(0.5);
    this.piedras3.setTileScale(1); 
    this.piedras3.setTilePosition(400, 220);

    this.piedras2 = this.add.tileSprite(400, 300, this.game.config.width, this.game.config.height, "capa2");
    this.piedras2.setScrollFactor(0.5);
    this.piedras2.setTileScale(1); 
    this.piedras2.setTilePosition(400, 540);

    this.piedras1 = this.add.tileSprite(400, 300, this.game.config.width, this.game.config.height, "capa1");
    this.piedras1.setScrollFactor(0.5);
    this.piedras1.setTileScale(1);
    this.piedras1.setTilePosition(400, 600);

    this.jugador = this.physics.add.sprite(200, 300, "personaje").setScale(0.7);

  
    this.jugador.play("correr");  

    // this.plataforma = this.add.tileSprite(400, 800, this.game.config.width, this.game.config.height, "plataforma");
    // this.plataforma.setScrollFactor(0.5);
    // this.plataforma.setTileScale(1);
    // this.plataforma.setTilePosition(400, 600);

    this.plataforma = this.physics.add.staticSprite(400, 650, "plataforma").setScale(1);
    this.plataforma.setScrollFactor(0.5);

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
      delay: 2000,
      callback: this.aumentarDificultad,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: Phaser.Math.RND.between(ENEMIGOS_DELAY.MIN, ENEMIGOS_DELAY.MAX),
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

    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarTiempoPantalla,
      callbackScope: this,
      loop: true,
    });



    this.textoPuntaje = this.add.text(16, 40, "Puntaje:" + this.puntaje, {
      fontSize: "20px",
      fill: "#FFFFFF",
      fontStyle: "bold",
    });

    this.textoTiempo = this.add.text(26,60, this.tiempo, {
      fontSize: "20px",
      fill: "#E6DE35",
      fontStyle: "bold",
    });

    // this.textoTiempoPantalla = this.add.text(26,100, this.tiempoPantalla, {
    //   fontSize: "20px",
    //   fill: "#E6DE35",
    //   fontStyle: "bold",
    // });




  }

  update () {

    const tocarObjeto = this.physics.overlap(this.jugador, this.grupoObjetos);

    if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.jugador.body.touching.down && !tocarObjeto) {
      this.jugador.setVelocityY(-1470);
    }


    if (this.tiempoPantalla >= 20) {
      this.scene.start("etapa2", { tiempo: this.tiempo, puntaje: this.puntaje, dificultad: this.dificultad, vidaExtra: this.vidaExtra });
    }

    this.fondo.tilePositionX += 0.2;
    this.piedras3.tilePositionX += 0.4;
    this.piedras2.tilePositionX += 0.7;
    this.piedras1.tilePositionX += 1;


  }


  agregarEnemigo() {

  const aparicionAleatoria = Phaser.Math.RND.between(ENEMIGOS_DELAY.MIN, ENEMIGOS_DELAY.MAX);

  const enemigoRandom = Phaser.Math.RND.pick(ENEMIGOS);
  const enemigo = this.physics.add.sprite(970, 400, enemigoRandom).setScale(0.8);

  const distancia = 580;

  const tiempoAparicion = this.ultimoEnemigo + Phaser.Math.RND.between(distancia, distancia * 2);

  //this.aumentarDificultad();


  this.time.addEvent({
    delay: tiempoAparicion,
    callback: () => {
      enemigo.setPosition(970, 400);
      enemigo.setVelocityX(-500* this.dificultad);
    },
    callbackScope: this
  });
  
  this.grupoEnemigos.add(enemigo);

  this.ultimoEnemigo = tiempoAparicion;

  this.time.addEvent({
    delay: aparicionAleatoria,
    callback: this.agregarEnemigo,
    callbackScope: this,
    loop: false
  });

  console.log("enemy is added");


  }

    agregarObjeto() {
      let objetoRandom = Phaser.Math.RND.pick(OBJETOS);
  
      if (objetoRandom === VIDAEXTRA && this.vidaExtra) {
        objetoRandom = Phaser.Math.RND.pick(
          OBJETOS.filter((objeto) => objeto !== VIDAEXTRA)
        );
      }
  
      const randomY = Phaser.Math.RND.between(100, 450);

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
  
      const objeto = this.physics.add.sprite(700, randomY, objetoRandom).setScale(1.2);
  
      this.grupoObjetos.add(objeto);
      
      objeto.setVelocityX(-290);
      objeto.body.allowGravity = false;
      console.log("Se agregó un objeto:", randomY, objetoRandom);
    }

    recolectarObjeto(jugador, objeto) {
      objeto.disableBody(true, true);
  
      if (objeto.texture.key === VIDAEXTRA && !this.vidaExtra) {
        console.log("Objeto recolectado (vida extra)");
        this.vidaExtra = true; 
        
      }

      const descObjeto = this.objetoRecolectado[objeto.texture.key];
      if (descObjeto) {
        console.log("Objeto recolectado");
        this.puntaje += descObjeto.score;
        this.textoPuntaje.setText("Puntaje: " + this.puntaje);
      }

      const puntajeTotal = this.puntaje * this.tiempo;
    

    const recordPuntajeTotal = localStorage.getItem('recordPuntajeTotal') || 0;
    if (puntajeTotal > recordPuntajeTotal) {
      localStorage.setItem('recordPuntajeTotal', puntajeTotal);
    }

    }

    restarVida(jugador, enemigo) {
      
    
      if (this.vidaExtra) {
        this.vidaExtra = false;
        enemigo.disableBody(true, true);
        console.log("Vida extra usada. Sigue jugando.");
      } else {
        console.log("Game Over");
        this.scene.start("fin", {puntaje: this.puntaje, tiempo: this.tiempo });
        
      }
    }
  
    actualizarTiempo() {
      this.tiempo++;
      this.textoTiempo.setText(this.tiempo.toString())
    }

    actualizarTiempoPantalla() {
      this.tiempoPantalla++;
      // this.textoTiempoPantalla.setText(this.tiempoPantalla.toString());
    }

    aumentarDificultad() {
      this.dificultad += 0.005;  
    console.log("dificultad aumentada");
    }

    
  }
  