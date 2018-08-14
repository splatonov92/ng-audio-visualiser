import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AudioService } from '../services/audio/audio.service';

@Component({
  selector: 'app-audio-visualaser',
  templateUrl: './audio-visualaser.component.html',
  styleUrls: ['./audio-visualaser.component.scss']
})
export class AudioVisualaserComponent implements OnInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  constructor(private audioService: AudioService) {
  }

  ngOnInit() {

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    const WIDTH = canvas.width;
    const HEIGHT = 256;

    let barWidth = 0;
    let barHeight;
    let x = 0;
    const step = 3;

    this.audioService.getAudioData()
      .subscribe(({ bufferLength, dataArray }) => {
        barWidth = (WIDTH / bufferLength);
        renderFrame(bufferLength, dataArray);
      });

    function renderFrame(bufferLength, dataArray) {

      // requestAnimationFrame(renderFrame);
      x = 0;
      // analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // let y = fData[i];
      // // y = (y - min) / k * 7;
      // let bar = bars[i];

      // if (bar) {
      //   const angle = Math.PI * 2 / bufferLength * i;
      //   const hsl = `hsl( ${y} ,100%, 50%)`;

      console.log(bufferLength, barWidth, barHeight);

      for (let i = 0; i < bufferLength; i++) {

        barHeight = dataArray[i];

        const angle = Math.PI * 2 / bufferLength * i;
        const hsl = `hsl(${barHeight}, 100%, 50%)`;
        const r = 20;
        const g = 250 * (i / bufferLength);
        const b = barHeight / 3;

        // ctx.fillStyle = hsl;
        // ctx.strokeStyle = hsl;

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';

        // ctx.shadowColor = hsl;
        // ctx.shadowOffsetX = 0;
        // ctx.shadowOffsetY = 0;
        // ctx.shadowBlur    = 25;

        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        ctx.strokeRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }
  }
}
