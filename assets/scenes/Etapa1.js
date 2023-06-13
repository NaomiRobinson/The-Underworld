import {
    ENEMIGOS,
    OJO,
    FANTASMA,
    ENEMIGOS_DELAY,
} from "../../utils.js";

export default class Juego extends Phaser.Scene {
    constructor() {

      super("etapa1");
    }

    init() {}

    preload () {
        this.load.image("fondo", "./assets/images/fondo.png");
        this.load.image(OJO, "./assets/images/ojo.png");
        this.load.image(FANTASMA, "./assets/images/fantasma.png");

    }

    create () {
        this.add.image(400, 300, "fondo");

        this.jugador = this.physics.add.sprite(150, 300, "jugador").setScale(1.5);

        this.plataforma = this.physics.add.staticSprite(400, 600, "plataforma").setScale(1);

        this.physics.add.collider(this.jugador, this.plataforma);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.enemiesGroup = this.physics.add.group();

        this.physics.add.collider(this.enemiesGroup, this.plataforma);

        this.time.addEvent({
            delay: ENEMIGOS_DELAY,
            callback: this.addEnemy,
            callbackScope: this,
            loop: true,
          });


    }

    update () {

        if (this.cursors.up.isDown && this.jugador.body.touching.down) {
            this.jugador.setVelocityY(-260);
          }

    }

    addEnemy() {
        
        const randomEnemy = Phaser.Math.RND.pick(ENEMIGOS);

        
        const randomX = Phaser.Math.RND.between(0, 800);
    
        const enemy = this.physics.add.sprite(900, 400, randomEnemy).setScale(0.7);
    
        // add shape to screen
        this.enemiesGroup.add(enemy);

        enemy.value = 1;
        //enemy.setCircle(40, 0, 0);

        enemy.setVelocityX(-260);
    
        console.log("enemy is added");
      }

    // agregarEnemigo() {
    //     const enemigoRandom = Phaser.Math.RND.pick(ENEMIGOS);
    
    //     const enemigo = this.physics.add.sprite(200, 0, enemigoRandom);

    //     enemigo.setVelocityX(-200)
    
    //     this.grupoEnemigos.add(enemigo);
    
    //     console.log("shape is added");
    //   }
}