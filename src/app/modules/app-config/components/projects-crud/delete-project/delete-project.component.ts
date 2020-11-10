import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProjectService } from '@core/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  project_id: number;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  deleteProject() {
    this.projectService.deleteProjectById(this.project_id).subscribe( remaining_projects => {
      if(remaining_projects!=null){
        let response = {
          'response': 'OK',
          'data': remaining_projects
        }
        this.event.emit(response);
        this.bsModalRef.hide();
      }
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
