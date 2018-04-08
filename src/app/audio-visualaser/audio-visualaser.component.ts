import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AudioService } from '../services/audio/audio.service';

@Component({
  selector: 'app-audio-visualaser',
  templateUrl: './audio-visualaser.component.html',
  styleUrls: ['./audio-visualaser.component.scss']
})
export class AudioVisualaserComponent implements OnInit {

  @ViewChild('audioOption') audioPlayerRef: ElementRef;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
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

    console.log('call OnPlay Function');

    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.play();

    const context = new AudioContext();
    const audioSrc = context.createMediaElementSource(audioPlayer);
    const analyser = context.createAnalyser();

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);

    analyser.fftSize = 1024;

    const bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    const dataArray = new Uint8Array(bufferLength);
    const WIDTH = canvas.width;
    const HEIGHT = 256;

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    function renderFrame() {

      requestAnimationFrame(renderFrame);
      x = 0;
      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // let y = fData[i];
      // // y = (y - min) / k * 7;
      // let bar = bars[i];

      // if (bar) {
      //   const angle = Math.PI * 2 / bufferLength * i;
      //   const hsl = `hsl( ${y} ,100%, 50%)`;

      for (let i = 0; i < bufferLength; i++) {

        barHeight = dataArray[i];

        const angle = Math.PI * 2 / bufferLength * i;
        const hsl = `hsl(${barHeight}, 100%, 50%)`;
        // const r = 50;
        // const g = 250 * (i / bufferLength);
        // const b = barHeight + (25 * (i / bufferLength));

        ctx.fillStyle = hsl; // 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.strokeStyle = hsl; // 'rgb(' + r + ',' + g + ',' + b + ')';

        ctx.shadowColor = hsl;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur    = 25;

        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        ctx.strokeRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 3;
      }
    }

    // audioPlayer.play();
    renderFrame();
  }
}
