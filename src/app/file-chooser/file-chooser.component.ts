import { Component, OnInit } from '@angular/core';
import { AudioService } from '../services/audio/audio.service';

@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.scss']
})
export class FileChooserComponent implements OnInit {

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  setUpAudioFile(files: FileList) {
    this.audioService.setFile(files[0]);
  }
}
