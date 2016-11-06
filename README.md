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








