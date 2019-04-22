# MallMap Server

Built with NodeJS, Express and Postgres this project serves as the back-end for the MallMap android client.
The Client and the server together form framework that allows efficient set up of an indoor localizer and router for buildings like large malls using WiFi RSSI strength values.

Please visit [roger-cores/mall-map-client](https://www.github.com/roger-cores/mall-map-client "MallMap Client demo") for the demo.

## How to run

 - Install the Postgres server and start it
 - Notedown the username, password and the port and edit them in app.js file
 - Run the following commands:
```sh
$ git clone https://www.github.com/roger-cores/mall-map-server
$ cd mall-map-server
$ npm install
$ npm start
```

## Dependencies

 - body-parser: 1.16.1
 - cookie-parser: ^1.4.4
 - debug: ^2.6.9
 - express: ^4.14.1
 - hbs: ^4.0.4
 - morgan: ^1.7.0
 - node-dijkstra: ^2.5.0
 - pg: ^6.4.2
 - sequelize: ^3.34.0
 - serve-favicon: ^2.3.2

## Endpoints

 - /beacon  : Manages WiFi/Bluetooth beacons
 - /knn     : Endpoint to apply knn on a graph and get result
 - /class   : Manages Classes. Classes are entities like room, passage, classroom, lab etc. Classes are nothing but nodes.
 - /link    : Manage Links. Links specify edges between classes.
 - /route   : Endpoint to apply Dijkstra's algorithm

## Schema

![Schema](/schema.jpg?raw=true "Schema")
