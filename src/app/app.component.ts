import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioService } from './services/audio/audio.service';
import { Subscription } from 'rxjs';

const TITLE = 'Audio Visualiser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = TITLE;
  fileSubscription: Subscription;

  constructor(private audioService: AudioService) {
  }

  ngOnInit() {
    this.fileSubscription = this.audioService.getFile()
      .subscribe((file: File) => {
        this.title = `${TITLE} - ${file.name}`;
      });
  }

  ngOnDestroy(): void {
    this.fileSubscription.unsubscribe();
  }
}
