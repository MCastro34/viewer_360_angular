import { effect, inject, NgZone, Service } from '@angular/core';
import { Router } from '@angular/router';
import * as _Marzipano from 'marzipano';

@Service()
export class Marzipano {
  private viewer: any;
  private currentScene: any;
  private nextScene: any;
  private _zone = inject(NgZone);

  constructor() {}

  init(container: HTMLDivElement) {
    this._zone.runOutsideAngular(() => {
      console.log(this.viewer);
      if (!this.viewer) {
        this.viewer = new _Marzipano.Viewer(container);
      }
    });
  }

  loadScene(data: Data360) {
    this._zone.runOutsideAngular(() => {
      if (!this.viewer) {
        throw new Error('Viewer not initialized.');
      }

      var limiter = _Marzipano.RectilinearView.limit.traditional(
        data.facesize,
        (100 * Math.PI) / 180,
        (120 * Math.PI) / 180,
      );
      this.nextScene = this.viewer.createEmptyScene({
        view: new _Marzipano.RectilinearView(data.initialViewParameters, limiter),
      });

      // Eventually needs to check how many layers it will be needed
      const source = _Marzipano.ImageUrlSource.fromString(data.url, {
        cubeMapPreviewUrl: data.preview || '',
      });
      const geometry = new _Marzipano.CubeGeometry(data.levels);
      this.nextScene.createLayer({
        source,
        geometry,
        pinFirstLevel: true,
      });
    });
  }

  changeScene(view?: View360) {
    this._zone.runOutsideAngular(() => {
      if (!this.nextScene) {
        throw new Error('Next scene was not loaded.');
      }
      if (view) {
        this.nextScene.view().setParameters(view);
      }
      this.viewer.switchScene(this.nextScene, { transitionDuration: 1000 }, () => {
        this.currentScene?.destroy();
        this.currentScene = this.nextScene;
        this.nextScene = undefined;
      });
    });
  }

  sceneView(): View360 {
    if (!this.currentScene) {
      throw new Error('There is no loaded scene.');
    }
    const view = this.currentScene.view();
    return {
      yaw: view.yaw(),
      pitch: view.pitch(),
      fov: view.fov(),
    };
  }

  destroy() {
    this._zone.runOutsideAngular(() => {
      console.log('marz destroy called');
      if (this.viewer) {
        const container = this.viewer.domElement();
        this.viewer.destroy();
        container.innerHTML = '';
      }
      this.viewer = undefined;
      this.currentScene = undefined;
      this.nextScene = undefined;
    });
  }
}
