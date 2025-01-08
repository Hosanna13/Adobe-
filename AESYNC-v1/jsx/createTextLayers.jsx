// createTextLayers.jsx

function createTextLayers(segmentsJson) {
    var segments = JSON.parse(segmentsJson);
  
    // Check if comp is selected 
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
      return "No active comp found!";
    }
  
    // Loop through segments
    for (var i = 0; i < segments.length; i++) {
      var seg = segments[i];
      var textLayer = comp.layers.addText(seg.words.join(" "));
      textLayer.inPoint = seg.start;
      textLayer.outPoint = seg.end;
  
      // Optional text styling
      var textDoc = textLayer.property("Source Text").value;
      textDoc.fontSize = 50;
      textLayer.property("Source Text").setValue(textDoc);
    }
  
    return "Success creating text layers!";
  }