# socket-remote
Tools for creating a node.js based remote control for games using web sockets.

## index.js 
This code sets up a basic Express server with Socket.IO integration for real-time communication between server and client. The server listens for incoming client connections and handles various events that the clients emit.

The server code consists of the following components:

Express setup and routing to serve static files from the public folder
Socket.IO server setup to handle client connections and communication
Global variables to store the Unity socket and user sockets
Event listeners to handle various client events, such as adding a user, sending controller actions, setting player scores, and disconnecting from the server.
The server listens for events such as 'add user', 'action', 'set score', and 'disconnect', and responds by emitting events such as 'user joined', 'action', and 'user left'. It also emits events such as 'login', 'openPage', 'client set color', and 'client get powerup' in response to client events.

Overall, this code provides a basic foundation for building a real-time web application with Socket.IO and Express.

## controller.js
This is a JavaScript file that controls the client-side behavior of a web application. Here's a brief overview of what the code does:

The first few lines prevent the zooming gesture on mobile devices and set the CSS variable '--vh' to be the height of the viewport divided by 100.
The code defines several variables, including 'portrait' and 'isAppMode', and a function called 'ScaleElements' that resizes and repositions certain elements on the page based on the orientation of the device.
There are several event listeners that listen for user input and emit messages to the server via a WebSocket connection, including touchstart and touchend events on various buttons.
The code also includes several functions that manipulate the layout and appearance of the page, including 'Flash', 'Reset', 'ResetLayout', and 'SelectCar'.
Finally, the code sets up the WebSocket connection to the server and defines several event listeners that respond to messages from the server. These listeners update the score, power-ups, and color of the user's car, as well as handle when other users leave the game.
