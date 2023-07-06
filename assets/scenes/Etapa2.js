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
      [MONEDA]: { prob: 0.9, score: 50 },
      [GEMA]: { prob: 0.1, score: 200 },
      [CORONA]: { prob: 0.05, score: 250 },
      [ANILLO]: { prob: 0.3, score: 150 },
      [CALIZ]: { prob: 0.6, score: 100 },
      [VIDAEXTRA]: { prob: 0.05, score: 0 },
    };

        this.tiempoPantalla = 0;
        this.vidaExtra = false;
        this.dificultad = 1;
        this.tiempo = 0;
        this.puntaje = 0;
        this.dificultad2 = 1;

    if (data && this.scene.key !== "etapa1") {
      this.vidaExtra = data.vidaExtra || this.vidaExtra;
      this.dificultad = data.dificultad || this.dificultad;
      this.tiempo = data.tiempo || this.tiempo;
      this.puntaje = data.puntaje || this.puntaje;
      this.dificultad2= data.dificultad2 || this.dificultad2;
    }

    this.recordPuntaje = localStorage.getItem('recordPuntaje') || 0;

  }

  

  preload() { }

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
      delay: OBSTACULOS_DELAY - this.dificultad2,
      callback: this.agregarObstaculo ,
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

    this.add.image(70,60, "interfaz").setScale(0.16);
    this.add.image(33,74, "reloj").setScale(0.5);
    this.interfazVidaExtras();

    this.textoPuntaje = this.add.text(24, 34, this.puntaje, {
      fontSize: "25px",
      fill: "#781508",
      fontStyle: "bold",
    });

    this.textoTiempo = this.add.text(50,64, this.tiempo, {
      fontSize: "20px",
      fill: "#781508",
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
      this.jugador.setVelocityY(-1150);
      const sonidoSalto = this.sound.add("salto");
      sonidoSalto.play();
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
      this.scene.start("etapa1", { tiempo: this.tiempo, puntaje: this.puntaje, dificultad: this.dificultad,dificultad2: this.dificultad2, vidaExtra: this.vidaExtra });
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
    this.physics.world.gravity.y= (this.physics.world.gravity.y);
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
      this.interfazVidaExtras();
    }else {
      sonidoObjeto.play();
    }

    const descObjeto = this.objetoRecolectado[objeto.texture.key];
    if (descObjeto) {
      console.log("Objeto recolectado");
      this.puntaje += descObjeto.score;
      this.textoPuntaje.setText(this.puntaje);
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
      this.interfazVidaExtras();
      const perdervidaextra = this.sound.add("choque");
        perdervidaextra.play();
      } else {
        
      console.log("Game Over");
      const overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.6);
      overlay.setOrigin(0, 0);
      
      this.scene.pause();
      this.scene.launch("fin", {puntaje: this.puntaje, tiempo: this.tiempo });
      
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
    this.dificultad2 += 0.001;  
  console.log("dificultad aumentada");
  }

  interfazVidaExtras() {
    this.frascoVacio = true;
    this.frascoLleno = false;
  
    if (this.vidaExtra) {
      this.frascoVacio = false;
      this.frascoLleno = true;
    } else {
      this.frascoLleno = false;
      this.frascoVacio = true;
    }
  
    if (this.frascoVacio) {
      this.add.image(110, 64, "frascovacio").setScale(0.7);
    }
    if (this.frascoLleno) {
      this.add.sprite(110, 64, "vidaExtra").setScale(1);
    }
  }

  
}
