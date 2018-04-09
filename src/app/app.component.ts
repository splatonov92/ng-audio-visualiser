import { Component, ViewChild, ElementRef } from '@angular/core';
import { AudioService } from './services/audio/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  title = 'Audio Visualiser';

  constructor(private audioService: AudioService) {

  }

  setAudioSource() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.src = this.audioService.getFileUrl();
    audioPlayer.load();
  }

  onBtnPlay() {
    this.audioPlayerRef.nativeElement.play();
  }

  onPlay() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.play();

    const context = new AudioContext();
    const audioSrc = context.createMediaElementSource(audioPlayer);
    const analyser = context.createAnalyser();

    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    analyser.fftSize = 1024;

    const bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    const audioService = this.audioService;

    audioService.setInitialData({bufferLength, dataArray});

    function audioFrame() {
      requestAnimationFrame(audioFrame);
      dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      audioService.setInitialData({bufferLength, dataArray});
    }

    audioFrame();
  }
}
