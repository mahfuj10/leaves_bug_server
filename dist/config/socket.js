"use strict";

// socketSetup.js

var socketIo = require('socket.io');
var io;
var roomId;
var userId;
var clients = {};
function initializeSocket(server) {
  io = socketIo(server);
  io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('userId', function (user_id) {
      console.log('Received userId:', user_id);
      userId = user_id;
      clients[user_id] = socket;
    });
    socket.on('joinRoom', function (room_id) {
      socket.join(room_id);
      roomId = room_id;
      console.log("User joined room ".concat(roomId));
    });
    socket.on('project_updated', function (project) {
      io.to(roomId).emit('project_updated', project);
    });
    socket.on('team_updated', function (team) {
      io.to(roomId).emit('team_updated', team);
    });
    socket.on('team_updated', function (team) {
      io.to(roomId).emit('team_updated', team);
    });
    socket.on('team-deleted', function (data) {
      io.emit('team-deleted', data);
    });
    socket.on('team-updated-global', function (team) {
      io.emit('team-updated-global', team);
    });
    socket.on('remove-member-from-team', function (data) {
      io.emit('remove-member-from-team', data);
    });
    socket.on('tasks-deleted', function (data) {
      io.to(roomId).emit('tasks-deleted', data);
    });
    socket.on('new-task', function (data) {
      io.to(roomId).emit('new-task', data);
    });
    socket.on('project_deleted', function (data) {
      io.to(roomId).emit('project_deleted', data);
    });
    socket.on('task-upating-by', function (data) {
      io.to(roomId).emit('task-upating-by', data);
    });
    socket.on('task-updated', function (data) {
      io.to(roomId).emit('task-updated', data);
    });
    socket.on('send-chat-message', function (data) {
      io.to(roomId).emit('send-chat-message', data);
    });
    socket.on('message-read', function (data) {
      io.to(roomId).emit('message-read', data);
    });
    socket.on('chat-message-update', function (data) {
      io.to(roomId).emit('chat-message-update', data);
    });
    socket.on('chat-message-delete', function (data) {
      io.to(roomId).emit('chat-message-delete', data);
    });
    socket.on('chat-created', function (data) {
      io.to(roomId).emit('chat-created', data);
    });
    socket.on('note-created', function (data) {
      socket.broadcast.to(roomId).emit('note-created', data);
    });
    socket.on('note-updated', function (data) {
      socket.broadcast.to(roomId).emit('note-updated', data);
    });
    socket.on('drawing', function (data) {
      socket.broadcast.to(roomId).emit('drawing', data);
    });
    socket.on('user-updated', function (data) {
      var clientSocket = clients[userId];
      console.log('clientSocket', clientSocket === null || clientSocket === void 0 ? void 0 : clientSocket.emit);
      if (clientSocket) {
        clientSocket.emit('user-updated', data);
      }
    });
    socket.on('disconnect', function () {
      console.log('User disconnected');
      var disconnectedUserId = Object.keys(clients).find(function (key) {
        return clients[key] === socket;
      });
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
  initializeSocket: initializeSocket,
  getIoInstance: getIoInstance
};