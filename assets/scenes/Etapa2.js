import {
  OBSTACULOS,
  FUEGO,
  OBSTACULOS_DELAY,
  MONEDA,
  OBJETOS,
  OBJETOS_DELAY,  
  VIDAEXTRA,
  GEMA,
  CORONA,
  ANILLO,
  CALIZ,
  OBJETOS_PANTALLA,
  OBJETOS_ANIM,
} from "../../utils.js";

export default class Juego extends Phaser.Scene {
  constructor() {
    super("etapa2");
  }

  init(data) {
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

    if (data && this.scene.key !== "etapa1") {
      this.vidaExtra = data.vidaExtra || this.vidaExtra;
      this.dificultad = data.dificultad || this.dificultad;
      this.tiempo = data.tiempo || this.tiempo;
      this.puntaje = data.puntaje || this.puntaje;
    }

    this.recordPuntaje = localStorage.getItem('recordPuntaje') || 0;

  }

  

  preload() {
    this.load.image(FUEGO, "./assets/images/fuego.png");
  }

  create() {
    this.add.image(400, 300,"fondo");
    this.add.image(400,300,"capa3");
    this.add.image(400,300,"capa2");
    this.add.image(400,300,"capa1");


    this.plataforma = this.physics.add.staticSprite(400, 650, "plataforma").setScale(1);
    this.jugador = this.physics.add.sprite(200, 300, "personaje").setScale(0.5);
    this.jugador.body.setSize(135, 210);  



    this.physics.world.gravity.y = 2000;

    this.grupoObjetos = this.physics.add.group();
    this.grupoObstaculos = this.physics.add.group();


    this.physics.add.collider(this.jugador, this.plataforma);

    this.physics.add.overlap(
      this.jugador,
      this.grupoObstaculos, 
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

    this.cursors = this.input.keyboard.createCursorKeys();

    this.jugador.setCollideWorldBounds (true);

    this.time.addEvent({
      delay: 2000,
      callback: this.aumentarDificultad,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: OBSTACULOS_DELAY,
      callback: this.agregarObstaculo,
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

    this.textoPuntaje = this.add.text(16, 40, + this.puntaje, {
      fontSize: "20px",
      fill: "#FFFFFF",
      fontStyle: "bold",
    });

    this.textoTiempo = this.add.text(16, 60,  + this.tiempo, {
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

  update() {
    if (
      (this.cursors.up.isDown || this.cursors.space.isDown) &&
      this.jugador.body.touching.down
    ) {
      this.jugador.setVelocityY(-1200);
    }
    
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-600);
      this.jugador.play("correr", true);
      this.jugador.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(600);
      this.jugador.play("correr", true);
      this.jugador.flipX = false;
    } else {
      this.jugador.setVelocityX(0);
      
        this.jugador.anims.play("parado");

    }

    if (this.tiempoPantalla >= 10) {
      this.scene.start("etapa1", { tiempo: this.tiempo, puntaje: this.puntaje, dificultad: this.dificultad, vidaExtra: this.vidaExtra });
    }

    


  }

  agregarObstaculo() {
    const obstaculoRandom = Phaser.Math.RND.pick(OBSTACULOS);
    const randomX = Phaser.Math.RND.between(10, 790);

    const obstaculo = this.physics.add.sprite(randomX, 0, obstaculoRandom).setScale(0.9)

    obstaculo.body.setSize(10, 20);

    obstaculo.play("animFuego");

    this.grupoObstaculos.add(obstaculo);
    //obstaculo.value = 1;
    
    console.log("obstacle is added", randomX, obstaculoRandom);
    this.physics.add.collider(
      this.plataforma,
      obstaculo, () => {
      obstaculo.disableBody(true,true); 
    });
  }

  agregarObjeto() {
    let objetoRandom = Phaser.Math.RND.pick(OBJETOS);

    if (objetoRandom === VIDAEXTRA && this.vidaExtra) {
      objetoRandom = Phaser.Math.RND.pick(
        OBJETOS.filter((objeto) => objeto !== VIDAEXTRA)
      );
    }

    const randomY = Phaser.Math.RND.between(100, 450);
    const randomX = Phaser.Math.RND.between(20, 450);

    
    const objeto = this.physics.add.sprite(randomX, randomY, objetoRandom).setScale(1);

    const animacion = OBJETOS_ANIM[objetoRandom];
    objeto.play(animacion);

    const probTotal = OBJETOS.reduce(
      (total, objeto) => total + objeto.probabilidad,
      0
    );
    const numRandom = Phaser.Math.RND.frac() * probTotal;

    let acum = 0;

    for (const objeto of OBJETOS) {
      acum += objeto.probabilidad;
      if (numRandom <= acum) {
        objetoRandom = objeto.nombre;
        break;
      }
    }


    this.grupoObjetos.add(objeto);
    
    objeto.body.allowGravity = false;
    console.log("Se agregó un objeto:", randomY, randomX, objetoRandom);

    this.time.addEvent({
      delay: OBJETOS_PANTALLA,
      callback: () => {
        objeto.disableBody(true, true);
        console.log("Objeto desaparecido:", objetoRandom);
      },
      callbackScope: this
    });
  }

  recolectarObjeto(jugador, objeto) {

    const sonidoObjeto = this.sound.add("juntarObjeto"); 
    const sonidoPocion = this.sound.add("juntarPocion"); 

    objeto.disableBody(true, true);

    if (objeto.texture.key === VIDAEXTRA && !this.vidaExtra) {
      console.log("Objeto recolectado (vida extra)");
      sonidoPocion.play();
      this.vidaExtra = true; 
      
    }else {
      sonidoObjeto.play();
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
      const overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.6);
      overlay.setOrigin(0, 0);
      
      this.scene.launch("fin", {puntaje: this.puntaje, tiempo: this.tiempo });
      this.scene.pause();
      
    }
  }

  actualizarTiempo() {
    this.tiempo++;
    this.textoTiempo.setText(this.tiempo.toString());
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
