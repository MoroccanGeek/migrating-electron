import { Component, EventEmitter, OnInit } from '@angular/core';
import { Project } from '@assets/models/project.entity';
import { Account } from '@assets/models/account.entity';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService, ProjectService } from '@core/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  UpdateProjectForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  accountsList: Account[];
  tempProject: Project;
  submitted = false;

  constructor(private builder: FormBuilder, private accountService: AccountService ,private projectService: ProjectService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.UpdateProjectForm = this.builder.group({
      name: new FormControl(this.tempProject.name, [Validators.required]),
    });
  }

  onProjectUpdateFormSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.UpdateProjectForm.invalid) {
        return;
    }

    this.tempProject.name = this.UpdateProjectForm.get('name').value;

    this.projectService.updateProject(this.tempProject).subscribe( projects => {
      
      if(projects!=null && projects.length>0){
        let response = {
          'response': 'OK',
          'data': projects
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
