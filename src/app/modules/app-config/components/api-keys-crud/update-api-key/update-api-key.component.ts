import { InputValidator } from '@shared/custom-form-validators/input.validator';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Apikey } from '@assets/models/apikey.entity';
import { Account } from '@assets/models/account.entity';
import { ApikeyService } from '@core/services/repository/apikey.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountService, ProjectService } from '@core/services';
import { Project } from '@assets/models/project.entity';
import { ConfigValidModalComponent } from '@shared/components/valid-modals/config-valid-modal/config-valid-modal.component';

@Component({
  selector: 'app-update-api-key',
  templateUrl: './update-api-key.component.html',
  styleUrls: ['./update-api-key.component.css']
})
export class UpdateApiKeyComponent implements OnInit {

  editApiKeyForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  accountsList: Account[];
  tempApikey: Apikey[];
  projectsList: Project[];
  submitted = false;

  constructor(
    private builder: FormBuilder,
    private accountService: AccountService,
    private apikeyService: ApikeyService,
    private projectService: ProjectService,
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService) { }

  async ngOnInit() {
    this.editApiKeyForm = this.builder.group({
      accounts: new FormControl('', []),
      projects: new FormControl('', []),
      key: new FormControl(this.tempApikey[0].key, [Validators.required,InputValidator.noWhiteSpace]),
      secret_key: new FormControl(this.tempApikey[0].secret_key, [Validators.required,InputValidator.noWhiteSpace]),
      access_token: new FormControl(this.tempApikey[0].access_token, [Validators.required,InputValidator.noWhiteSpace]),
      access_secret: new FormControl(this.tempApikey[0].access_secret, [Validators.required,InputValidator.noWhiteSpace]),
      bearer_token: new FormControl(this.tempApikey[0].bearer_token, [Validators.required,InputValidator.noWhiteSpace]),
    });


    let accounts = await this.accountService.getAccounts().toPromise();
    this.accountsList = accounts;

    const defaultSelectedAccount = this.tempApikey[0].account;
    
    // this is to dynamically select the Account of the given API key
    this.editApiKeyForm.controls['accounts'].setValue(defaultSelectedAccount.id,{onlySelf: true});

    this.projectService.getProjectsByAccounId(defaultSelectedAccount.id).subscribe((projects: any) => {

      this.projectsList = projects;

      const noProject = new Project()
      noProject.id = null;
      noProject.name = "No Project";
      this.projectsList.unshift(noProject);

      let defaultSelectedProject;
      if(this.tempApikey[0].project != null){
        defaultSelectedProject = this.tempApikey[0].project.id;
      }
      else{
        defaultSelectedProject = null;
      }

      this.editApiKeyForm.controls['projects'].setValue(defaultSelectedProject,{onlySelf: true});
    });


  }

  onApiKeyEditFormSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editApiKeyForm.invalid) {
        return;
    }

    let tempApikey = new Apikey();

    tempApikey.id = this.tempApikey[0].id;
    tempApikey.key = this.editApiKeyForm.get('key').value;
    tempApikey.secret_key = this.editApiKeyForm.get('secret_key').value;
    tempApikey.access_token = this.editApiKeyForm.get('access_secret').value;
    tempApikey.bearer_token = this.editApiKeyForm.get('bearer_token').value;

    tempApikey.account = this.editApiKeyForm.get('accounts').value;
    tempApikey.project = this.editApiKeyForm.get('projects').value;

    this.apikeyService.updateApikey(tempApikey).subscribe( apikeys => {
      
      if(apikeys!=null && apikeys.length>0){
        let response = {
          'response': 'OK',
          'data': apikeys
        }
        this.event.emit(response);
        this.bsModalRef.hide();

        const modalOptions = {
          initialState:
            {
              message: "Your API Key has been updated successfully."
            }
        }
        this.bsModalRef = this.bsModalService.show(ConfigValidModalComponent, modalOptions);
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

      this.editApiKeyForm.controls['projects'].setValue(this.projectsList[0].id,{onlySelf: true});
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
