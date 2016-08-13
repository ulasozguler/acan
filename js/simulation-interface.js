class Simulation {
	static defaultCell() {
		/**
		 * Fallback state.
		 */
		return null;
	}

	static init(w) {
		/**
		 * Can be used for setting initial state of simulation.
		 */
	}

	static behaviour(w, x, y) {
		/**
		 * Called every iteration to calculate next generation.
		 */
		throw "Behaviour not implemented for simulation.";
	}
}

// Can be used for custom colors of every state.
Simulation.colorPicker = null;