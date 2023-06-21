import {
    ENEMIGOS,
    OJO,
    FANTASMA,
    ENEMIGOS_DELAY,
    MONEDA,
    OBJETOS,
    OBJETOS_DELAY,
    VIDAEXTRA,
} from "../../utils.js";

export default class Juego extends Phaser.Scene {
  constructor() {

    super("etapa1");
  }

  init() {
    this.objetoRecolectado = {  
      [MONEDA]: { count: 0, score: 10},
    };



  this.isGameOver = false;
    
  this.vidaExtra = false;

  this.puntaje = false;

  this.timer=0;
  this.tiempoNuevo = 0;
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

    this.jugador.setCollideWorldBounds(true);

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
      delay: OBJETOS_DELAY,
      callback: this.agregarObjeto,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: ENEMIGOS_DELAY,
      callback: this.agregarEnemigo,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarTimer,
      callbackScope: this,
      loop: true,
    });

          /*this.cantidadMonedasTexto = this.add.text(
            15,
            15,   
              "Monedas recolectadas: " +
              this.cantidadObjetos.toString(),
            { fontSize: "15px", fill: "#FFFFFF" }
          );*/


    this.textoPuntaje = this.add.text(16, 40, "Puntaje:" + this.puntaje, {
      fontSize: "20px",
      fill: "#FFFFFF",
      fontStyle: "bold",
    });

    this.textoTiempo = this.add.text(16,60, this.timer, {
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

    if (tiempoActual - this.tiempoNuevo >= 5000) {

      this.grupoEnemigos.getChildren().forEach(enemigo => {
        enemigo.setVelocityX(enemigo.body.velocity.x - 10);
    });
  

      this.tiempoNuevo = tiempoActual;
    }

  }


  agregarEnemigo() {
    
    const enemigoRandom = Phaser.Math.RND.pick(ENEMIGOS)
    
    const enemigo = this.physics.add.sprite(970, 400, enemigoRandom).setScale(1);
    
    
    this.grupoEnemigos.add(enemigo);

    //enemigo.setCircle(80 ,0);

    enemigo.setVelocityX(-500);
    
    console.log("enemy is added");
  }

    // agregarEnemigo() {
    //     const enemigoRandom = Phaser.Math.RND.pick(ENEMIGOS);
    
    //     const enemigo = this.physics.add.sprite(200, 0, enemigoRandom);

    //     enemigo.setVelocityX(-200)
    
    //     this.grupoEnemigos.add(enemigo);
    
    //     console.log("shape is added");
    //   }
  
    agregarObjeto() {
      let objetoRandom = Phaser.Math.RND.pick(OBJETOS);
  
      if (objetoRandom === VIDAEXTRA && this.vidaExtra) {
        objetoRandom = Phaser.Math.RND.pick(
          OBJETOS.filter((objeto) => objeto !== VIDAEXTRA)
        );
      }
  
      const randomY = Phaser.Math.RND.between(20, 450);
  
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
      } else {
        console.log("Objeto recolectado");
      }

      if (objeto.texture.key === MONEDA) {
        this.puntaje += 10;

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
  
    actualizarTimer() {
      this.timer++;
      this.textoTiempo.setText(this.timer);
    }

  }