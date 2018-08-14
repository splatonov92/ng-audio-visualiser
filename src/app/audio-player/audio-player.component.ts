import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { AudioService } from '../services/audio/audio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  fileUrlSubscription: Subscription;
  canPlay = false;

  constructor(private audioService: AudioService) {
  }

  ngOnInit() {

    const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;

    this.fileUrlSubscription = this.audioService.getFileUrl()
      .subscribe((url) => {
        audioPlayer.src = url;
        audioPlayer.load();
      });

    const context: AudioContext = new AudioContext();
    const audioSrc: MediaElementAudioSourceNode = context.createMediaElementSource(audioPlayer);
    const analyser: AnalyserNode = context.createAnalyser();
    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    analyser.fftSize = 1024;
    const bufferLength = analyser.frequencyBinCount;

    audioPlayer.addEventListener('canplaythrough', () => {
      const dataArray = new Uint8Array(bufferLength);
      this.audioService.setAudioData({bufferLength, dataArray});
      this.runAudioFrame(analyser, bufferLength);
      this.canPlay = true;
    });
  }

  runAudioFrame(analyser: AnalyserNode, bufferLength: number) {

    const audioService = this.audioService;

    function audioFrame() {
      requestAnimationFrame(audioFrame);
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      audioService.setAudioData({bufferLength, dataArray});
    }

    audioFrame();
  }

  ngOnDestroy(): void {
    this.fileUrlSubscription.unsubscribe();
  }

  onPlay() {
    if (this.canPlay) {
      this.audioPlayerRef.nativeElement.play();
    }
  }
}
