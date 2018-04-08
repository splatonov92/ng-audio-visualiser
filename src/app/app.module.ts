import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AudioVisualaserComponent } from './audio-visualaser/audio-visualaser.component';
import { MatButtonModule } from '@angular/material';
import { MaterialModule } from './material/material.module';
import { AudioService } from './services/audio/audio.service';
import { FileService } from './services/file/file.service';
import { FileChooserComponent } from './file-chooser/file-chooser.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioVisualaserComponent,
    FileChooserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MaterialModule
  ],
  providers: [
    AudioService,
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
