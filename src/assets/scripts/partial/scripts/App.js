import WebGLView from './webgl/WebGLView';
import browser from 'browser-detect';

const browserDetect = browser();


const setModel = process.env.NODE_ENV === 'development'
  ? "assets/images/particle_photo/podshipnik.png"
  : "/local/templates/main/assets/images/particle_photo/podshipnik.png";

export default class App {

	constructor() {

	}

	init() {
		this.initWebGL();
		this.addListeners();
		this.animate();
		this.resize();
	}

	initWebGL() {
		this.webgl = new WebGLView(this);
    if (browserDetect.name === 'ie') {
      const DOM_img = document.createElement("img");
      DOM_img.src = setModel;
      document.querySelector('#particle_photo').appendChild(DOM_img);
    } else {
      document.querySelector('#particle_photo').appendChild(this.webgl.renderer.domElement);
    }
	}

	addListeners() {
		this.handlerAnimate = this.animate.bind(this);

		window.addEventListener('resize', this.resize.bind(this));
		window.addEventListener('keyup', this.keyup.bind(this));
	}

	animate() {
		this.update();
		this.draw();

		this.raf = requestAnimationFrame(this.handlerAnimate);
	}

	// ---------------------------------------------------------------------------------------------
	// PUBLIC
	// ---------------------------------------------------------------------------------------------

	update() {
		// if (this.gui.stats) this.gui.stats.begin();
		if (this.webgl) this.webgl.update();
		// if (this.gui) this.gui.update();
	}

	draw() {
		if (this.webgl) this.webgl.draw();
		// if (this.gui.stats) this.gui.stats.end();
	}

	// ---------------------------------------------------------------------------------------------
	// EVENT HANDLERS
	// ---------------------------------------------------------------------------------------------

	resize() {
		if (this.webgl) this.webgl.resize();
	}

	keyup(e) {
		// g
		// if (e.keyCode == 71) { if (this.gui) this.gui.toggle(); }
	}

	click(e) {
		// this.webgl.next();
	}
}
