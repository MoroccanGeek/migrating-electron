import { Component, EventEmitter, OnInit } from '@angular/core';
import { Project } from '@assets/models/project.entity';
import { Account } from '@assets/models/account.entity';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  constructor(private builder: FormBuilder, private accountService: AccountService ,private projectService: ProjectService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.UpdateProjectForm = this.builder.group({
      accounts: new FormControl(null),
      name: new FormControl(this.tempProject.name, []),
    });

    this.accountService.getAccounts().subscribe((accounts: any) => {
      this.accountsList = accounts;
    });

    // this is to dynamically select the Account of the given API key
    this.UpdateProjectForm.controls['accounts'].setValue(this.tempProject.account.id,{onlySelf: true});
  }

  onProjectUpdateFormSubmit() {

    // let tempProject = new Project();

    this.tempProject.name = this.UpdateProjectForm.get('name').value;

    this.accountService.getAccountById(this.UpdateProjectForm.get('accounts').value).subscribe(account => {
      this.tempProject.account = account;

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
      
    });

  }

  onClose(){
    this.bsModalRef.hide();
  }

}
