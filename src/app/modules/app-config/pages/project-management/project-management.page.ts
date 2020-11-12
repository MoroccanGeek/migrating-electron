import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from '@assets/models/project.entity';
import { AccountService, ProjectService } from '@core/services';
import { ConfigErrorModalComponent } from '@shared/components/error-modals/config-error-modal/config-error-modal.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddNewProjectComponent } from '../../components/projects-crud/add-new-project/add-new-project.component';
import { DeleteProjectComponent } from '../../components/projects-crud/delete-project/delete-project.component';
import { UpdateProjectComponent } from '../../components/projects-crud/update-project/update-project.component';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.page.html',
  styleUrls: ['./project-management.page.css']
})
export class ProjectManagementPage implements OnInit {

  projectList: Project[];
  bsModalRef: BsModalRef;
  
  constructor(private accountService: AccountService, private projectService: ProjectService, private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: any) => (this.projectList = projects));
  }

  addNewProject(template: TemplateRef<any>){

    this.accountService.accountsExists().subscribe(response => {
      if(!response){
        const initialState = {
          message: 'No project was found. Try again after a project is added.'
        }
        this.bsModalRef = this.bsModalService.show(ConfigErrorModalComponent, {initialState});
      }
      else{
        this.bsModalRef = this.bsModalService.show(AddNewProjectComponent);
        this.bsModalRef.content.event.subscribe(result => {
          if (result.response == 'OK') {
            this.projectList = result.data;
          }
        });
      }
    })
  }

  updateProject(projectId: number) {

    this.projectService.getProjectById(projectId).subscribe(project => {
      const modalOptions: ModalOptions = {
        initialState: {
          tempProject: project
        }
      }

        this.bsModalRef = this.bsModalService.show(UpdateProjectComponent, modalOptions);
        this.bsModalRef.content.event.subscribe(result => {
          if (result.response == 'OK') {
            this.projectList = result.data;
          }
        });

      });
  }

  deleteProject(projectId: number): void {

    const initialState = {
      project_id: projectId
    };

    this.bsModalRef = this.bsModalService.show(DeleteProjectComponent, {initialState});
      this.bsModalRef.content.event.subscribe(result => {
        if (result.response == 'OK') {
          this.projectList = result.data;
        }
      });

  }

}
