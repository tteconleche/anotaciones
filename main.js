const canvas = document.getElementById('visual');
try {
  const hydra = new Hydra({
    canvas,
    width: Math.min(window.innerWidth, 1484),
    height: Math.min(window.innerHeight, 1000),
    detectAudio: false,
    enableStreamCapture: false
  });
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
  .out(o0);

render(o0);

  window.addEventListener('resize', () => {
    hydra.setResolution(Math.min(window.innerWidth, 1484), Math.min(window.innerHeight, 1000));
  });
} catch (error) {
  document.getElementById('estado').hidden = false;
  console.error(error);
}
