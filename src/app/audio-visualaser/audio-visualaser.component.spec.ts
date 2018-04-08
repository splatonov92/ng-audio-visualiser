import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVisualaserComponent } from './audio-visualaser.component';

describe('AudioVisualaserComponent', () => {
  let component: AudioVisualaserComponent;
  let fixture: ComponentFixture<AudioVisualaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioVisualaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioVisualaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
