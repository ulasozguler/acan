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

	static behaviour(world, newState, x, y) {
		/**
		 * Called every iteration to calculate next generation.
		 */
		throw "Behaviour not implemented for simulation.";
	}
}

// Can be used for custom colors of every state.
Simulation.colorPicker = null;

// Can be used for custom legend.
Simulation.legend = null;