import 'three';

import InteractiveControls from './controls/InteractiveControls';
import Particles from './particles/Particles';

export default class WebGLView {

	constructor(app) {
		this.app = app;

		this.samples = 'assets/images/particle_photo/sample-03.png';

		this.initThree();
		this.initParticles();
		this.initControls();

		this.goto();
	}

	initThree() {
		// scene
		this.scene = new THREE.Scene();

		// camera
		this.camera = new THREE.PerspectiveCamera(50, $("#particle_photo").width() * 1.2 / $("#particle_photo").height(), 1, 10000);
		this.camera.position.z = 300;

		// renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // clock
		this.clock = new THREE.Clock(true);

	}

	initControls() {
		this.interactive = new InteractiveControls(this.camera, this.renderer.domElement);
	}

	initParticles() {
		this.particles = new Particles(this);
		this.scene.add(this.particles.container);
	}

	// ---------------------------------------------------------------------------------------------
	// PUBLIC
	// ---------------------------------------------------------------------------------------------

	update() {
		const delta = this.clock.getDelta();

		if (this.particles) this.particles.update(delta);
	}

	draw() {
		this.renderer.render(this.scene, this.camera);
	}


	goto() {
		// init next
		this.particles.init(this.samples);
	}

	// ---------------------------------------------------------------------------------------------
	// EVENT HANDLERS
	// ---------------------------------------------------------------------------------------------

	resize() {
		if (!this.renderer) return;
		this.camera.aspect =$("#particle_photo").width() * 1.2 / $("#particle_photo").height();
		this.camera.updateProjectionMatrix();

		this.fovHeight = 2 * Math.tan((this.camera.fov * Math.PI) / 180 / 2) * this.camera.position.z;

		this.renderer.setSize($("#particle_photo").width() * 1.2, $("#particle_photo").height());

		if (this.interactive) this.interactive.resize();
		if (this.particles) this.particles.resize();
	}
}
