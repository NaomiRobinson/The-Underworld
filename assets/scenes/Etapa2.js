import {
  OBSTACULOS,
  FUEGO,
  OBSTACULOS_DELAY,
  MONEDA,
  OBJETOS,
  OBJETOS_DELAY,
  VIDAEXTRA,
  GEMA,
  COLLAR,
  ESPEJO,
  CALIZ,
  OBJETOS_PANTALLA,
} from "../../utils.js";

export default class Juego extends Phaser.Scene {
  constructor() {
    super("etapa2");
  }

  init(data) {
    this.objetoRecolectado = {
      [MONEDA]: { prob: 0.8, score: 50 },
      [GEMA]: { prob: 0.6, score: 100 },
      [COLLAR]: { prob: 0.5, score: 150 },
      [ESPEJO]: { prob: 0.3, score: 200 },
      [CALIZ]: { prob: 0.1, score: 500 },
      [VIDAEXTRA]: { prob: 0.3, score: 0 },
    };
    this.tiempo = data.tiempo || 0;
    this.puntaje = data.puntaje || 0;

    this.isGameOver = false;
    this.vidaExtra = false;
  }

  preload() {
    this.load.image(FUEGO, "./assets/images/fuego.png");
  }

  create() {
    this.add.image(400, 300, "fondo");

    this.textoPuntaje = this.add.text(16, 40, "Puntaje: " + this.puntaje, {
      fontSize: "20px",
      fill: "#FFFFFF",
      fontStyle: "bold",
    });

    this.textoTiempo = this.add.text(16, 60, "Tiempo: " + this.tiempo, {
      fontSize: "20px",
      fill: "#E6DE35",
      fontStyle: "bold",
    });

    this.textoPuntaje.setDepth(1);
    this.textoTiempo.setDepth(1);


    this.jugador = this.physics.add.sprite(150, 300, "jugador").setScale(0.5);
   

    this.plataforma = this.physics.add
      .staticSprite(400, 600, "plataforma")
      .setScale(1);

    this.grupoObstaculos = this.physics.add.group();
    this.grupoObjetos = this.physics.add.group();

    this.physics.add.collider(this.jugador, this.plataforma);

    /*this.physics.add.overlap(
      this.jugador,
      this.grupoObstaculos, 
      this.restarVida, 
      null,
      this 
    );*/

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

  }

  update() {
    if (
      (this.cursors.up.isDown || this.cursors.space.isDown) &&
      this.jugador.body.touching.down
    ) {
      this.jugador.setVelocityY(-600);
    }

    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(200);
    } else {
      this.jugador.setVelocityX(0);
    }

    
    if (this.isGameOver) {
      this.scene.start("fin");
    }

  }

  agregarObstaculo() {
    const obstaculoRandom = Phaser.Math.RND.pick(OBSTACULOS);
    const randomX = Phaser.Math.RND.between(10, 790);

    const obstaculo = this.physics.add.sprite(randomX, 0, obstaculoRandom)

    //obstaculo.setScale(0.1);


    this.grupoObstaculos.add(obstaculo);
    //obstaculo.value = 1;
    obstaculo.setCircle(32, 0, 0);
    obstaculo.setDisplaySize(obstaculo.width * 0.09, obstaculo.height * 0.09);
    obstaculo.setSize(obstaculo.width, obstaculo.height);

    console.log("obstacle is added", randomX, obstaculoRandom);
  }

  agregarObjeto() {
    let objetoRandom = Phaser.Math.RND.pick(OBJETOS);

    if (objetoRandom === VIDAEXTRA && this.vidaExtra) {
      objetoRandom = Phaser.Math.RND.pick(
        OBJETOS.filter((objeto) => objeto !== VIDAEXTRA)
      );
    }

    const randomY = Phaser.Math.RND.between(20, 450);
    const randomX = Phaser.Math.RND.between(20, 450);

    
    const objeto = this.physics.add.sprite(randomX, randomY, objetoRandom);

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
    objeto.setCircle(15, 0, 0);
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

  restarVida(jugador, obstaculo) {
    if (this.vidaExtra) {
      this.vidaExtra = false;
      obstaculo.disableBody(true, true);
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
}
