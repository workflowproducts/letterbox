const os = require('os');

const net = require('net');
const path = require('path');
const electron = require('electron');
const fs = require('fs-extra');
const hidefile = require('hidefile');
const windowStateKeeper = require('electron-window-state');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const child_process = require('child_process');
var envelopeProc = null;

const envelope_module_name = 'node_modules/envelope-portable-' + (os.platform() !== 'win32' ? (os.platform() + (os.arch() === 'x64' ? '64' : '32')) : 'windows');

function spawnEnvelope(strAppName, callback, bolAllowExternal) {
	envelopeProc = child_process.spawn(
		path.normalize(app.getAppPath() + '/' + envelope_module_name + '/bin/envelope' + (process.platform === 'win32' ? '.exe' : '')), [
			'-c', path.normalize(os.homedir() + '/.' + strAppName + '/envelope.conf'),
			'-d', path.normalize(os.homedir() + '/.' + strAppName + '/envelope-connections.conf'),
			'-r', path.normalize(app.getAppPath() + '/web_root'),
			'-y', path.normalize(app.getAppPath() + '/app'),
			'-z', path.normalize(app.getAppPath() + '/role'),
			(bolAllowExternal ? '' : '-x'), (bolAllowExternal ? '' : 't'),
			'-g', 'envelope_g',
			(process.platform === 'win32' ? '-o' : ''), (process.platform === 'win32' ? 'stderr' : '')
		], {
			detached: true
		}
	);

	console.log('test');
	envelopeProc.stdout.on('data', function(data) {
		console.log('envelope ' + envelopeProc.pid + ' got data (stdout):\n' + data);
		if (data.indexOf('<this computer\'s ip>') > -1) {
			callback(
				parseInt(fs.readFileSync(path.normalize(os.homedir() + '/.' + strAppName + '/envelope.conf')).toString().substring(16), 10)
			);
		}
	});
	envelopeProc.stderr.on('data', function(data) {
		console.log('envelope ' + envelopeProc.pid + ' got data (stderr):\n' + data);
	});
	envelopeProc.on('close', function(code) {
		console.log('envelope ' + envelopeProc.pid + ' closed with code ' + code);
	});
}

exports.init = function (strAppName, strPostgresHost, intPostgresPort, callback, bolAllowExternal) {
	try {
		// Check for envelope-connections.conf
		fs.statSync(os.homedir() + '/.' + strAppName + '/envelope-connections.conf');

		// Spawn Envelope
		spawnEnvelope(strAppName, callback, bolAllowExternal);
	} catch (e) {
		fs.mkdirsSync(os.homedir() + '/.' + strAppName + '/');
		if (!hidefile.isHiddenSync(os.homedir() + '/.' + strAppName + '/')) {
			hidefile.hideSync(os.homedir() + '/.' + strAppName + '/');
		}

		var int_envelope_port = parseInt(Math.random().toString().substring(2)) % (65535 - 1024) + 1024;

		fs.writeFileSync(
			path.normalize(os.homedir() + '/.' + strAppName + '/envelope.conf'),
			'envelope_port = ' + int_envelope_port
		);
		fs.writeFileSync(
			path.normalize(os.homedir() + '/.' + strAppName + '/envelope-connections.conf'),
			'data:  host=' + strPostgresHost + ' port=' + intPostgresPort + ' dbname=postgres'
		);
		// Start up envelope
		spawnEnvelope(strAppName, callback);
	}
};

exports.quit = function () {
	console.log('quitting');
	envelopeProc.kill();
};
