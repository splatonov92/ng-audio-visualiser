import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

class AudioData {
  bufferLength: number;
  dataArray: Uint8Array;
}

@Injectable()
export class AudioService {

  private subject: Subject<AudioData>;
  private data: Observable<AudioData>;
  private dataObserver: Observer<AudioData>;
  audioFile: File;

  constructor() {
    this.subject = new Subject<AudioData>();
  }

  setFile(file: File) {
    this.audioFile = file;
  }

  getFileUrl() {
    return URL.createObjectURL(this.audioFile);
  }

  getAudioData(): Subject<AudioData> {
    return this.subject;
  }

  setInitialData(data: AudioData) {
    this.subject.next(data);
  }
}
