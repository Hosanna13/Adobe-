function onLoaded() {
       /*
         * Create Interface Object
         */
    var csInterface = new CSInterface();
       /*
         * Create button event listener
         */
    document.getElementById("transcribeBtn").addEventListener("click", function() {
        /*
         * Step 1: get the audio file path
         */
      csInterface.evalScript("getAudioFilePath()", async function(filePath) {
        if (filePath.indexOf("No ") === 0) {
          alert(filePath);
          return;
        }
  
         /*
         * Step 2: transcribe the audio file (IMPLEMENT)
         */
        let transcriptData = await transcribeAudio(filePath);
        // Parse words from the result
        let words = parseWordsFromTranscript(transcriptData);
  
        /*
         * Step 3: split into segments
         */
        let segments = splitByPauses(words, 0.3);
        let segmentsJson = JSON.stringify(segments);
  
        /*
         * Step 4: create text layers in After Effects
         */
        csInterface.evalScript(`createTextLayers('${segmentsJson}')`, function(res) {
          alert(res);
        });
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", onLoaded);
  // STEP 2: Transcribe the audio file
  async function transcribeAudio(localFilePath) {
    // You might need to read the file, convert to base64, or upload it to a server.
    // For simplicity, let's assume you have a base64 utility or an alternative approach.
  
    let audioBase64 = await readFileAsBase64(localFilePath);
  
    const apiKey = "AIzaSyCoVuTSDjexBziWfItYHAfNM_XPmA3CARM";
    const url = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;
  
    const requestBody = {
      audio: { content: audioBase64 },
      config: {
        encoding: "LINEAR16",
        languageCode: "en-US",
        enableWordTimeOffsets: true
      }
    };
  
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });
    let data = await response.json();
    return data;
  }

  // STEP 3: Split the transcript into segments
  function parseWordsFromTranscript(data) {
    // data.results[].alternatives[].words[]
    let words = [];
    if (!data.results) return words;
  
    data.results.forEach(result => {
      let alt = result.alternatives[0];
      if (!alt.words) return;
      alt.words.forEach(wordObj => {
        let start = parseFloat(wordObj.startTime);
        let end   = parseFloat(wordObj.endTime);
        words.push({
          word: wordObj.word,
          startTime: start,
          endTime: end
        });
      });
    });
    return words;
  }

  function splitByPauses(words, threshold) {
    let segments = [];
    let currentSegment = null;
  
    for (let i = 0; i < words.length; i++) {
      let w = words[i];
      if (!currentSegment) {
        currentSegment = {
          words: [w.word],
          start: w.startTime,
          end: w.endTime
        };
      } else {
        let gap = w.startTime - currentSegment.end;
        if (gap > threshold) {
          segments.push(currentSegment);
          currentSegment = {
            words: [w.word],
            start: w.startTime,
            end: w.endTime
          };
        } else {
          currentSegment.words.push(w.word);
          currentSegment.end = w.endTime;
        }
      }
    }
    if (currentSegment) segments.push(currentSegment);
    return segments;
  }