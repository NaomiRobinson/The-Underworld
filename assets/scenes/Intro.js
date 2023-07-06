export default class Intro extends Phaser.Scene {
  constructor() {

      super("intro");
  }

  init() {
    this.imagenes = ['img1', 'img2', 'img3']; // Nombres de las tres imágenes
    this.imagenesGrupo;
  }

  preload () {
    
  }

  create () {

    this.fondo = this.add.tileSprite(400, 300, 800, 600, "ladrillos");
    this.fondo.setScrollFactor(0.5);
    this.fondo.setTileScale(0.9); 
    this.fondo.setTilePosition(400, 300);

    this.add.image(400,300, "fondomenu").setScale(1);


    this.imagenesGrupo = this.add.group();
    const posX = [260, 260, 550]; 
    const posY = [290, 490, 290];

    for (let i = 0; i < this.imagenes.length; i++) {
      const imagen = this.add.image(posX[i], posY[i], this.imagenes[i]).setScale(0.5);
      imagen.alpha = 0;

      this.tweens.add({
        targets: imagen,
        alpha: 1, // Establecer la transparencia final en 1
        duration: 500, // Duración de la transición en milisegundos
        ease: 'Linear', // Tipo de interpolación
        delay: i * 1000, // Retraso en la aparición de cada imagen en milisegundos
      });

      this.imagenesGrupo.add(imagen);
    }


    const sonidoSeleccion = this.sound.add("seleccionMenu");


    this.botonJugar = this.add.sprite(700, 530, 'flecha').setScale(1.3).setInteractive();

    this.botonVolver = this.add.sprite(90,90, 'flecha').setScale(1.3).setInteractive();
    this.botonVolver.flipX = true;
    

    this.botonJugar.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer"
      this.botonJugar.setFrame(1); 
  });

  this.botonJugar.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
      this.botonJugar.setFrame(0); 
  });
  
  this.botonJugar.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
      sonidoSeleccion.play();
      this.scene.start("etapa1inicio");
  });

  this.botonVolver.on("pointerover", () => {
    this.game.canvas.style.cursor = "pointer"
    this.botonVolver.setFrame(1); 
});

this.botonVolver.on("pointerout", () => {
    this.game.canvas.style.cursor = "default";
    this.botonVolver.setFrame(0); 
});

this.botonVolver.on("pointerdown", () => {
    this.game.canvas.style.cursor = "default";
    sonidoSeleccion.play();
    this.scene.start("menu");
});
}

  update() {
    this.fondo.tilePositionX += 0.2;
  }
}
