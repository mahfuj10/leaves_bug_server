// socketSetup.js

const socketIo = require('socket.io');

let io;
let roomId;
let userId;
const clients = {};


function initializeSocket(server) {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('userId', (user_id) => {
      console.log('Received userId:', user_id);
      userId = user_id;
      clients[user_id] = socket;
  });

    socket.on('joinRoom', (room_id) => {
      socket.join(room_id);
      roomId = room_id
      console.log(`User joined room ${roomId}`);
    });

    socket.on('project_updated', (project) => {
      io.to(roomId).emit('project_updated', project);
    });

    socket.on('team_updated', (team) => {
      io.to(roomId).emit('team_updated', team);
    });

    socket.on('team_updated', (team) => {
      io.to(roomId).emit('team_updated', team);
    });

    socket.on('team-deleted', (data) => {
      io.emit('team-deleted', data);
    });
    
    socket.on('team-updated-global', (team) => {
      io.emit('team-updated-global', team);
    });
    
    socket.on('remove-member-from-team', (data) => {
      io.emit('remove-member-from-team', data);
    });

    socket.on('tasks-deleted', (data) => {
      io.to(roomId).emit('tasks-deleted', data);
    });

    socket.on('new-task', (data) => {
      io.to(roomId).emit('new-task', data);
    });
    
    socket.on('project_deleted', (data) => {
      io.to(roomId).emit('project_deleted', data);
    });

    socket.on('task-upating-by', (data) => {
      io.to(roomId).emit('task-upating-by', data);
    });

    socket.on('task-updated', (data) => {
      io.to(roomId).emit('task-updated', data);
    });

    socket.on('send-chat-message', (data) => {
      io.to(roomId).emit('send-chat-message', data);
    });
    
    socket.on('message-read', (data) => {
      io.to(roomId).emit('message-read', data);
    });
    
    socket.on('chat-message-update', (data) => {
      io.to(roomId).emit('chat-message-update', data);
    });
    
    socket.on('chat-message-delete', (data) => {
      io.to(roomId).emit('chat-message-delete', data);
    });
    
    socket.on('chat-created', (data) => {
      io.to(roomId).emit('chat-created', data);
    });
    
    
    socket.on('note-created', (data) => {
      socket.broadcast.to(roomId).emit('note-created', data);
    });
    
    socket.on('note-updated', (data) => {
      socket.broadcast.to(roomId).emit('note-updated', data);
    });
    
    socket.on('drawing', (data) => {
      socket.broadcast.to(roomId).emit('drawing', data);
    });
    
    socket.on('user-updated', (data) => {
      const clientSocket = clients[userId]
      console.log('clientSocket',clientSocket?.emit);
      if(clientSocket){
        clientSocket.emit('user-updated', data)
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
      const disconnectedUserId = Object.keys(clients).find(
        (key) => clients[key] === socket
    );
    if (disconnectedUserId) {
        delete clients[disconnectedUserId];
    }
    });
  });
}

function getIoInstance() {
  if (!io) {
    throw new Error('Socket.IO has not been initialized');
  }
  return io;
}

module.exports = {
  initializeSocket,
  getIoInstance,
};