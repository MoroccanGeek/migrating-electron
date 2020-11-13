import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from '@assets/models/project.entity';
import { AccountService, ProjectService } from '@core/services';
import { ConfigErrorModalComponent } from '@shared/components/error-modals/config-error-modal/config-error-modal.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
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
  returnedProjectList: Project[];
  bsModalRef: BsModalRef;
  itemsPerPage = 10;
  currentPage = 1;
  
  constructor(private accountService: AccountService, private projectService: ProjectService, private bsModalService: BsModalService) { }

  async ngOnInit() {
    this.projectList = await this.projectService.getProjects().toPromise<Project[]>();

    this.returnedProjectList = this.projectList.slice(0,this.itemsPerPage);
  }

  addNewProject(){

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

            // This is to stay on the same page after addition
            const startItem = (this.currentPage - 1) * this.itemsPerPage;
            const endItem = this.currentPage * this.itemsPerPage;
            this.returnedProjectList = this.projectList.slice(startItem,endItem);
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

          // This is to stay on the same page after addition
          const startItem = (this.currentPage - 1) * this.itemsPerPage;
          const endItem = this.currentPage * this.itemsPerPage;
          this.returnedProjectList = this.projectList.slice(startItem,endItem);
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

        if(this.currentPage != 1){
          const numOfItems = this.projectList.length;
          const previousPageNumOfItems = (this.currentPage-1) * this.itemsPerPage;

          if(numOfItems === previousPageNumOfItems){
            this.currentPage -= 1;
          }
        }
        
        const startItem = (this.currentPage - 1) * this.itemsPerPage;
        const endItem = this.currentPage * this.itemsPerPage;
        this.returnedProjectList = this.projectList.slice(startItem,endItem);
      }
    });

  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;

    this.returnedProjectList = this.projectList.slice(startItem, endItem);
  }

}
