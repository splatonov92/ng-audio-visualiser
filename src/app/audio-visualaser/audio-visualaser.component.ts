import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AudioService } from '../services/audio/audio.service';

@Component({
  selector: 'app-audio-visualaser',
  templateUrl: './audio-visualaser.component.html',
  styleUrls: ['./audio-visualaser.component.scss']
})
export class AudioVisualaserComponent implements OnInit {

  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  @ViewChild('canvas') canvasRef: ElementRef;

  constructor(private audioService: AudioService) {
  }

  ngOnInit() {

    console.log('call ngOnInit visualizer Function');

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    const WIDTH = canvas.width;
    const HEIGHT = 256;

    let barWidth = 0; // (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    const audioService = this.audioService;

    this.audioService.getAudioData().subscribe(({ bufferLength, dataArray }) => {
      barWidth = (WIDTH / bufferLength) * 2.5;
      renderFrame(bufferLength, dataArray);
    });

    function renderFrame(bufferLength, dataArray) {

      // requestAnimationFrame(renderFrame);
      x = 0;
  //      analyser.getByteFrequencyData(dataArray);
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
  }
}
