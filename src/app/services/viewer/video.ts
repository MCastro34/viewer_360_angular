import { Service } from '@angular/core';

@Service()
export class Video {
  private video: HTMLVideoElement | undefined;

  constructor() {}

  init(container: HTMLDivElement) {
    if (!this.video) {
      this.video = document.createElement('video') as HTMLVideoElement;
      this.video.playsInline = true;
      this.video.classList.add('w-full', 'h-full', 'object-contain');
      container.appendChild(this.video);
    }
  }

  load(src: string, callback?: CallableFunction) {
    if (!this.video) {
      throw new Error('Video not initialized');
    }
    this.video.src = src;
    this.video.pause();
    this.video.load();
  }

  mute(toggle: boolean) {
    if (!this.video) {
      throw new Error('Video not initialized');
    }
    this.video.muted = toggle;
  }

  play() {
    if (!this.video) {
      throw new Error('Video not initialized');
    }
    this.video.play();
  }

  pause() {
    if (!this.video) {
      throw new Error('Video not initialized');
    }
    this.video.pause();
  }

  stop() {
    this.video?.pause();
    this.video?.removeAttribute('src');
    this.video?.load();
  }

  destroy() {
    if (!this.video) {
      throw new Error('Video not initialized');
    }
    this.video.pause();
    this.video.removeAttribute('src');
    this.video.load();
    this.video.remove();
  }
}
