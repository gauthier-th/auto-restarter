const { fork } = require('child_process');
const style = require('ansi-styles');

const asyncFork = (file) => {
	return new Promise((resolve, reject) => {
		const fileFork = fork(file, [], {
			silent: true,
			env: { NPM_CONFIG_COLOR: 'always' },
			stdio: 'inherit'
		});
		fileFork.on('exit', (code) => {
			if (code != 0)
				reject(code);
			else
				resolve();
		});
	});
}
const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay));

module.exports = async (filePath, delay = 0) => {
	console.log(`${style.green.open}${style.bold.open}[auto-restarter]${style.bold.close} starting \`${filePath}\`${style.green.close}`);
	let continueLoop = true;
	while (continueLoop) {
		await asyncFork(filePath).then(() => {
			console.log();
			if (delay > 0)
				console.log(`${style.red.open}${style.bold.open}[auto-restarter]${style.bold.close} app stopped - relaunching in ${delay}ms...${style.red.close}`);
			else
				console.log(`${style.red.open}${style.bold.open}[auto-restarter]${style.bold.close} app stopped - relaunching...${style.red.close}`);
		}).catch(code => {
			console.log();
			if (delay > 0)
				console.log(`${style.red.open}${style.bold.open}[auto-restarter]${style.bold.close} app crashed with code ${code} - relaunching in ${delay}ms...${style.red.close}`);
			else
				console.log(`${style.red.open}${style.bold.open}[auto-restarter]${style.bold.close} app crashed with code ${code} - relaunching...${style.red.close}`);
		});
		if (continueLoop)
			await wait(delay);
	}
}