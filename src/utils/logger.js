const DEBUG_ENABLED = false;

const log = (...args) => {
    if (DEBUG_ENABLED) {
		console.log(...args);
	}
}

const Logger = {
    log
}

export default Logger;