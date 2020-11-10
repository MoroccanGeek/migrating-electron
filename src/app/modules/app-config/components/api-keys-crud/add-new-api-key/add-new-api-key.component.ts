import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Apikey } from '@assets/models/apikey.entity';
import { Account } from '@assets/models/account.entity';
import { ApikeyService } from '@core/services/repository/apikey.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService, ProjectService } from '@core/services';
import { Project } from '@assets/models/project.entity';

@Component({
  selector: 'app-add-new-api-key',
  templateUrl: './add-new-api-key.component.html',
  styleUrls: ['./add-new-api-key.component.css']
})
export class AddNewApiKeyComponent implements OnInit {

  addNewApiKeyForm: FormGroup;
  event: EventEmitter<any> =new EventEmitter();
  accountsList: Account[];
  projectsList: Project[];

  constructor(
    private builder: FormBuilder, 
    private accountService:AccountService, 
    private apikeyService: ApikeyService,
    private projectService: ProjectService,
    private bsModalRef: BsModalRef) { }

  async ngOnInit(): Promise<void> {
    this.addNewApiKeyForm = this.builder.group({
      accounts: new FormControl('', []),
      projects: new FormControl('', []),
      key: new FormControl('', []),
      secret_key: new FormControl('', []),
      access_token: new FormControl('', []),
      access_secret: new FormControl('', []),
      bearer_token: new FormControl('', []),
    });
    
    let accounts = await this.accountService.getAccounts().toPromise();
    this.accountsList = accounts;

    const defaultSelectedAccount = this.accountsList[0];
    this.addNewApiKeyForm.controls['accounts'].setValue(defaultSelectedAccount.id,{onlySelf: true});

    this.projectService.getProjectsByAccounId(defaultSelectedAccount.id).subscribe((projects: any) => {
      this.projectsList = projects;

      const noProject = new Project()
      noProject.id = null;
      noProject.name = "No Project";
      this.projectsList.unshift(noProject);

      this.addNewApiKeyForm.controls['projects'].setValue(this.projectsList[0].id,{onlySelf: true});
    });

  }

  onApiKeyFormSubmit() {

    let temp_apikey = new Apikey();

    temp_apikey.key = this.addNewApiKeyForm.get('key').value;
    temp_apikey.secret_key = this.addNewApiKeyForm.get('secret_key').value;
    temp_apikey.access_token = this.addNewApiKeyForm.get('access_token').value;
    temp_apikey.access_secret = this.addNewApiKeyForm.get('access_secret').value;
    temp_apikey.bearer_token = this.addNewApiKeyForm.get('bearer_token').value;
    temp_apikey.in_use = 0;
    temp_apikey.account = this.addNewApiKeyForm.get('accounts').value;
    temp_apikey.project = this.addNewApiKeyForm.get('projects').value;

    this.apikeyService.addApiKey(temp_apikey).subscribe( apikeys => {
      
      if(apikeys!=null && apikeys.length>0){
        let response = {
          'response': 'OK',
          'data': apikeys
        }
        this.event.emit(response);
        this.bsModalRef.hide();
      }
    
    });

  }

  changeProjects(e: any){
    const selectedAccountIndex = e.target.selectedIndex;

    const selectedAccountId = this.accountsList[selectedAccountIndex].id;

    this.projectService.getProjectsByAccounId(selectedAccountId).subscribe((projects: any) => {
      this.projectsList = projects;
      
      const noProject = new Project()
      noProject.id = null;
      noProject.name = "No Project";
      this.projectsList.unshift(noProject);

      this.addNewApiKeyForm.controls['projects'].setValue(this.projectsList[0].id,{onlySelf: true});
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
