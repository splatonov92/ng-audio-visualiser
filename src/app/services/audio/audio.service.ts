import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

class AudioData {
  bufferLength: number;
  dataArray: Uint8Array;
}

@Injectable()
export class AudioService {

  private subject: Subject<AudioData>;
  private fileUrl: Subject<string>;
  private file: Subject<File>;

  constructor() {
    this.subject = new Subject<AudioData>();
    this.fileUrl = new Subject<string>();
    this.file = new Subject<File>();
  }

  setFile(file: File) {
    this.file.next(file);
    this.fileUrl.next(URL.createObjectURL(file));
  }

  getFile() {
    return this.file;
  }

  getFileUrl(): Observable<string> {
    return this.fileUrl;
  }

  getAudioData(): Subject<AudioData> {
    return this.subject;
  }

  setAudioData(data: AudioData) {
    this.subject.next(data);
  }
}
