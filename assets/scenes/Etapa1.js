import {
    ENEMIGOS,
    OJO,
    FANTASMA,
    ENEMIGOS_DELAY,
    MONEDA,
    OBJETOS,
    OBJETOS_DELAY,
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
    }

    preload () {
        this.load.image("fondo", "./assets/images/fondo.png");
        this.load.image(OJO, "./assets/images/ojo.png");
        this.load.image(FANTASMA, "./assets/images/fantasma.png");
        this.load.image(MONEDA, "./assets/images/moneda.png");

    }

    create () {
        this.add.image(400, 300, "fondo");

        this.jugador = this.physics.add.sprite(150, 300, "jugador").setScale(0.8);
        

        this.plataforma = this.physics.add.staticSprite(400, 600, "plataforma").setScale(1);

        this.physics.add.collider(this.jugador, this.plataforma);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.grupoEnemigos = this.physics.add.group();

        this.grupoObjetos = this.physics.add.staticGroup();

        this.physics.add.collider(this.grupoEnemigos, this.plataforma);

        this.physics.add.collider(
          this.jugador,
          this.grupoEnemigos,
          this.tocarEnemigo, 
          null,
          this 
        );

        this.physics.add.overlap(
          this.jugador,
          this.grupoObjetos,
          this.recolectarObjetos,
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

          this.puntaje = 0;
          this.textoPuntaje = this.add.text(16, 40, "Puntaje:" + this.puntaje, {
            fontSize: "20px",
            fill: "#FFFFFF",
            fontStyle: "bold",
          });

          this.textoTiempo = this.add.text(750,18, this.timer, {
            fontSize: "30px",
            fill: "#E6DE35",
            fontStyle: "bold",
        });



    }

    update () {

        if ( (this.cursors.up.isDown || this.cursors.space.isDown ) && this.jugador.body.touching.down) {
            this.jugador.setVelocityY(-660);
          }

          if (this.isGameOver) {
            this.scene.start("fin");
          }

    }

    agregarEnemigo() {
        
        const enemigoRandom = Phaser.Math.RND.pick(ENEMIGOS)
    
        const enemigo = this.physics.add.sprite(970, 400, enemigoRandom).setScale(1);
    
       
        this.grupoEnemigos.add(enemigo);

        //enemigo.setCircle(80 ,0);

        enemigo.setVelocityX(-290);
    
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
      // get random shape
      const objetoRandom = Phaser.Math.RND.pick(OBJETOS);
  
  
      const randomY = Phaser.Math.RND.between(20, 450);
  
      const objeto = this.physics.add.sprite(700, randomY, objetoRandom);
      objeto.setVelocityX(-290);
      objeto.body.allowGravity = false;
  
      // add shape to screen
      this.grupoObjetos.add(objeto);
      objeto.setCircle(15, 0, 0);

  
      console.log("se agrego objeto", randomY, objetoRandom);
    }
  
    tocarEnemigo (jugador, grupoEnemigos) {

      this.isGameOver = true;
    }

    recolectarObjeto(jugador, objeto) {
        
        objeto.disableBody(true, true);
        const nombreObjeto = objeto.texture.key;
      
        const porcentaje = objeto.value;
        const puntajeAct = this.objetoRecolectado[nombreObjeto].puntaje * porcentaje;
      
        
        this.objetoRecolectado[nombreObjeto].count++;
      
        this.puntaje += puntajeAct;
        console.log(puntajeAct);
        this.textoPuntaje.setText(`Puntaje: ${this.score.toString()}`);
        
      
        console.log(this.objetoRecolectado);
          //update score text
      this.textoObjeto.setText(
            `T: ${this.objetoRecolectado[TRIANGULO].count}`
            );
        
      
      
          //this.scoreText.setText(
           //"T: " + 
          //this.shapesRecolected[TRIANGULO].count +
           //" / C: " +
          //this.shapesRecolected[CUADRADO].count +
           //" / R: " +
          //this.shapesRecolected[ROMBO].count
          //)
      
          console.log(this.shapesRecolected);
      
          //check if winner
          //take two of each shape
          if 
          (this.shapesRecolected[ROMBO].count >= 2 &&
          this.shapesRecolected[TRIANGULO].count >= 2 &&
          this.shapesRecolected[CUADRADO].count >= 2 &&
          this.score >= 100) {
          this.isWinner = true;
          }
      
    }
}