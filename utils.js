const FANTASMA = "fantasma";
const OJO = "Ojo";

const ENEMIGOS = [FANTASMA, OJO];

const ENEMIGOS_DELAY = {
  MIN: 500,
  MAX: 3000,
};

const ENEMIGOS_ANIM = {
  [OJO]: "animOjo",
  [FANTASMA]: "animFantasma",
};



const FUEGO = "fuego";
const VIDAEXTRA = "vidaExtra";

const OBSTACULOS = [FUEGO];
const OBSTACULOS_DELAY = 600;

const MONEDA = "moneda";
const CALIZ = "caliz";
const CORONA = "corona";
const ANILLO = "anillo";
const GEMA = "gema";

const OBJETOS_ANIM = {
  [MONEDA]: "animMoneda",
  [CALIZ]: "animCaliz",
  [CORONA]: "animCorona",
  [ANILLO]: "animAnillo",
  [GEMA]: "animGema",
  [VIDAEXTRA]: "animVidaExtra",
  
};

const OBJETOS = [MONEDA,VIDAEXTRA,CALIZ,CORONA,ANILLO,GEMA];
const OBJETOS_DELAY = 1000;

const OBJETOS_PANTALLA = 3000;

export {ENEMIGOS,ENEMIGOS_DELAY, FANTASMA, OJO,FUEGO,OBSTACULOS, OBSTACULOS_DELAY,MONEDA,CALIZ,CORONA,ANILLO,GEMA,OBJETOS,OBJETOS_DELAY,OBJETOS_PANTALLA,VIDAEXTRA,ENEMIGOS_ANIM,OBJETOS_ANIM};