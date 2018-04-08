import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {

  audioFile: File;

  constructor() { }

  setFile(file: File) {
    this.audioFile = file;
  }

  getFileUrl() {
    return URL.createObjectURL(this.audioFile);
  }
}
