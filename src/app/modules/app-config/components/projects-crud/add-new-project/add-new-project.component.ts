import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '@assets/models/project.entity';
import { Account } from '@assets/models/account.entity';
import { AccountService } from '@core/services';
import { ProjectService } from '@core/services';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { InputValidator } from '@shared/custom-form-validators/input.validator';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {

  addNewProjectForm: FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  accountsList: Account[];
  submitted = false;

  constructor(private builder: FormBuilder, private accountService:AccountService, private projectService: ProjectService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {

    this.addNewProjectForm = this.builder.group({
      accounts: new FormControl('', []),
      name: new FormControl('', [Validators.required,InputValidator.noFullWhiteSpace])
    });
    

    this.accountService.getAccounts().subscribe((accounts: any) => {
      this.accountsList = accounts;

      this.addNewProjectForm.controls['accounts'].setValue(this.accountsList[0].id,{onlySelf: true});
    
    });
  }

  onProjectFormSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addNewProjectForm.invalid) {
        return;
    }

    let temp_project = new Project();

    temp_project.name = this.addNewProjectForm.get('name').value;
    temp_project.account = this.addNewProjectForm.get('accounts').value;

    this.projectService.addProject(temp_project).subscribe( projects => {
      
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
