// getAudioFilePath.jsx

function getAudioFilePath() {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
      return "No active comp found!";
    }
  
    var layer = comp.selectedLayers[0];
    if (!layer) {
      return "No layer selected!";
    }
  
    if (layer.source && layer.source.file) {
      return layer.source.file.fsName; // path to the file on disk
    }
  
    return "No valid audio source on selected layer!";
  }