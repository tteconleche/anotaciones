new p5((p) => {
  p.setup = () => {
    p.createCanvas(1484, 732);
    p.pixelDensity(1);
    const palabras = p;
    palabras.hide = () => { palabras.canvas.style.display = 'none'; };
    const hydra = new Hydra({
      canvas: document.getElementById('visual'),
      width: 1484,
      height: 732,
      detectAudio: false,
      enableStreamCapture: false
    });
var frases = [
  ['¿es muy infantil si deseo', 500, 50],
  ['que algo me detenga',900, 110],
  ['a escapar',440, 230],
  ['de mi misma?',742, 290],
  ['no quiero ser este cliché',500, 350],
  ['de mujer',1286, 470],
  ['que espera',386, 530],
  ['dejar de estar',500, 590],
  ['constantemente',500, 650],
  ['insaciable',1090, 710]
];

palabras.hide();
palabras.noStroke();
palabras.fill(255);
palabras.textFont('Arial');
palabras.textSize(40);
palabras.textAlign(palabras.LEFT, palabras.BASELINE);

palabras.draw = () => {
  palabras.clear();

  frases.forEach(([texto, x, y]) => {
    palabras.text(texto, x, y);
  });
};

s0.init({ src: palabras.canvas });

setFunction({
  name: 'colores',
  type: 'color',
  inputs: [],
  glsl: `
    float luz = clamp(
      dot(_c0.rgb, vec3(0.299, 0.587, 0.114)),
      0.0, 1.0
    );

    vec3 rosa = vec3(1.0, 0.08, 0.55);
    vec3 violeta = vec3(0.48, 0.12, 1.0);
    vec3 turquesa = vec3(0.05, 1.0, 0.85);

    vec3 color = mix(rosa, violeta, smoothstep(0.0, 0.5, luz));
    color = mix(color, turquesa, smoothstep(0.5, 1.0, luz));

    return vec4(color, 1.0);
  `
});

osc(12, 0.006, 0)
  .modulate(noise(1.2, 0), 0.18)
  .mult(
    osc(8, -0.005, 1.2)
      .rotate(0.3)
      .modulate(noise(2, 0), 0.2)
  )
  .modulate(noise(5, 0), 0.15)
  .contrast(0.8)
  .colores()
  .layer(src(s0))
  .out(o0);

render(o0);

  };
});
