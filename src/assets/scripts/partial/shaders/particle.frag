// @author brunoimbrizi / http://brunoimbrizi.com

precision highp float;

uniform sampler2D uTexture;

varying vec2 vPUv;
varying vec2 vUv;

void main() {
	vec4 color = vec4(0.0);
	vec2 uv = vUv;
	vec2 puv = vPUv;

	// pixel color
	vec4 colA = texture2D(uTexture, puv);

	// greyscale
	float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
	float blue = colA.r * 0.41 + colA.g * 0.52 + colA.b * 0.80;
	vec4 colC = vec4(0.22, 0.35, 0.69, 1.0);
	vec4 colD = vec4(0.41, 0.52, 0.80, 1.0);
	vec4 colB = vec4(colA.r, colA.g + 0.11, colA.b + 0.99, 0.99);

  // circle
  float border = 0.3;
  float radius = 0.5;
  float dist = radius - distance(uv, vec2(0.5));
  float t = smoothstep(0.0, border, dist);

  // final color
  color = colB;
  color.a = t;

  gl_FragColor = color;
}
