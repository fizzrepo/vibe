// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
var fs = require('fs');

songs = [];

function getAllSongs(directory) {
  var songs = [];
  var files = fs.readdirSync(directory);
  for (var i in files) {
    var file = directory + '/' + files[i];
    if (fs.statSync(file).isFile()) {
      songs.push(file);
    }
  }
  return songs;
}

function addSong(filepath) {
  songs.push(filepath);
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  console.log(getAllSongs('M:/Music/MinecraftBattle'))
  songs = getAllSongs('M:/Music/MinecraftBattle');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// every 5 seconds
setInterval(function() {
  songs = getAllSongs('M:/Music/MinecraftBattle');
  // get dom element
  var songList = document.getElementById('songs');
  // clear list
  songList.innerHTML = '';
  // add songs
  for (var i in songs) {
    var song = songs[i];
    var li = document.createElement('li');
    li.innerHTML = song;
    songList.appendChild(li);
    $
  }
}, 5000);