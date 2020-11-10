import { Injectable } from '@angular/core';

import { from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Project } from '@assets/models/project.entity'
import { ElectronService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private electronService: ElectronService) { }

  getProjects(){
    const result = this.electronService.ipcRenderer.invoke('get-projects');
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  getProjectsByAccounId(accountId: number){
    const result = this.electronService.ipcRenderer.invoke('get-projects-by-account-id', accountId);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  getProjectById(projectId: number){
    const result = this.electronService.ipcRenderer.invoke('get-project-by-id', projectId);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  addProject(project: Project) {
    const result = this.electronService.ipcRenderer.invoke('add-project', project);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  updateProject(project: Project) {
    const result = this.electronService.ipcRenderer.invoke('update-project',project);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  deleteProjectById(project_id: number){
    const result = this.electronService.ipcRenderer.invoke('delete-project-by-id',project_id);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }
}
