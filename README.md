# Letterbox
A database driven application platform leveraging Electron, Envelope and PostgreSQL.

### What is Letterbox
Letterbox is a tool for developers that makes writing and distributing database driven applications easy!

Letterbox makes it easy to build database apps. Programs for business, like accounting or inventory. Once you've written your application, Letterbox helps you package your app for Linux, Mac and Windows computers. When users go to open your app, Letterbox will manage starting PostgeSQL and Envelope.

In order to accomplish all this magic, Letterbox makes several interesting choices to bring together an application stack. But although a lot of work went into Letterbox, it would not have been possible without the following projects:

#### Electron 
Electron (by Github) is an application shell that provides you with several important components. The first is the web engine from Chromium, which renders your HTML and Javascript just like a browser. In order to display your HTML and Javascript files you need a webserver, so Electron provides and embeds a Node server. Finally, Electron helps you package your application so that you can easily distribute it to Linux, Mac and Windows computers. Electron is a powerful combination of technologies and effort.

#### PostgreSQL
PostgreSQL is an enterprise class, open source object-relational database. Letterbox brings statically compiled binaries of PostgreSQL for Linux, Mac and Windows into Node modules.

#### Envelope
Envelope helps you publish web apps based on your PostgreSQL database. It includes a powerful set of custom HTML tags called "Web Components" that can be configured to talk directly to your database. This saves your from writing code in middleware. By simplifying your web app's architecture, you can write your app with less context switch. This reduces cognitive load making it easier to think clearly about what your app is trying to do.

Letterbox is still pre-release. Please ignore it for now.

# Getting Started

There are two functions in Letterbox:

`letterbox.init(appName, postgresHost, postgresPort, callback)`
- **appName**
 - Letterbox uses this to create a folder to hold the configuration file for envelope
- **postgresHost**
 - Letterbox uses this to tell envelope how to connect to postgres
- **postgresPort**
 - Letterbox uses this to tell envelope how to connect to postgres
- **callback(envelopePort)**
 - This function will be called after envelope has started up, the `envelopePort` argument will allow you to tell Electron where to go


`letterbox.quit()`
- You need to call this function when the process is going to exit. If you don't then envelope will keep running and you won't be able to start it the next time.

### Full example

	const letterbox = require('letterbox');
	const electron = require('electron');
	const app = electron.app;
	const BrowserWindow = electron.BrowserWindow;

	let mainWindows = [];

	app.on('ready', function () {
		var curWindow = new BrowserWindow({
			'width': 1024,
			'height': 768
		});
		mainWindows.push(curWindow);
		letterbox.init('letterbox-example', 'yourdomain.com', '5432',
				function (envelopePort) {

			curWindow.loadURL('http://127.0.0.1:' + envelopePort, {
				'extraHeaders': 'pragma: no-cache\n'
			});
		});

		// Emitted when the window is closed.
		curWindow.on('closed', function() {
			mainWindows.splice(mainWindows.indexOf(curWindow), 1);
		});
	});

	app.on('quit', function() {
		letterbox.quit();
	});
  
