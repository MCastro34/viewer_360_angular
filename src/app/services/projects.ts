import { httpResource } from '@angular/common/http';
import { effect, Service } from '@angular/core';
import { environment } from '../../environments/environment';

@Service()
export class Projects {
  readonly projectsResource = httpResource<Project[]>(() => environment.projectsUrl);

  constructor() {}

  async find(id: string) {
    const projects = await this.waitForProjects();
    return projects.find((project) => project.id === id);
  }

  async configExists(configRef: string) {
    if (!configRef) {
      return false;
    }
    const res = await fetch(configRef, {
      method: 'HEAD',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });
    return res.ok;
  }

  private waitForProjects(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      const effectRef = effect(() => {
        if (this.projectsResource.error()) {
          effectRef.destroy();
          reject(this.projectsResource.error());
        }
        const projects = this.projectsResource.value();
        if (projects) {
          effectRef.destroy();
          resolve(projects);
        }
      });
    });
  }
}
