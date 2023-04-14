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
