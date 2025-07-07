# AE Audio Sync Plugin 
A plugin for Adobe After Effects that automatically transcribes audio and creates synced text layers for seamless subtitles or lyric videos.

# Purpose Behind the Pursuit
During my internship at the University of Cincinnati, I worked on enhancing shot detection in videos using color histograms. That project became the start of my interest in computer vision, inspired by that internship experience I decided to explore how the principles I learned from that internship, could apply to my favorite hobby: video editing. 

Video editing has always been a creative outlet for me. I enjoy transforming raw footage into engaging, polished content. However, very annoying, time-consuming, and repetitive tasks have been generating subtitles. This process is important, but it removes me from the creative flow of editing.

It made sense to combine my computer vision knowledge and my passion for video editing to solve this problem. I am developing a video subtitle generator specifically tailoed only for After Effetecs, for MAC, and soon Windows devices. 

# Methodoly 
May 2025 - June 2025
During this period, substantial progress was made. I focused on integrating the frontend panel with After Effects using Adobe's Common Extensibilty. 
Key Achievements: 
  - Completed python backend integration with OpenAI's Whisper API, ensuring accurate audio transcription with apporximately 70% synchronization accuracy.
  - Sucessfully established API endpoint connection, verifying communication between the backend and frontend.
  - Designed the CEP panel interface using HTML, CSS, and ExtendScript, creating a basic goundation for frontend development.
Currently Challenge:
  - The CEP panel is not yet visible within Adobe After Effects, and resolving this issue remains a priority.
  - Due to the panel visibility issue, I am currently unable to test the communication between the frontend and back end.

Sep 6, 2024
Initially started with Google Collab IDE, and jsx environment. Used a opensource text-to-speech API, eventually disregarded, due to incompatibility with jsx. 

Dec 30, 2024 
Switched to CEP environment, moved to Mac. 

# Resources 
1. https://github.com/Adobe-CEP/Getting-Started-guides
2. https://www.freecodecamp.org/news/how-to-turn-audio-to-text-using-openai-whisper/
3. https://www.adobe.com/exchange/em_download/
4. https://github.com/Adobe-CEP/Samples/tree/master/AfterEffectsPanel
