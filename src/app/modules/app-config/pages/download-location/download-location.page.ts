import { Component, OnInit } from '@angular/core';
import { ElectronService } from '@core/services';
import { from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-download-location',
  templateUrl: './download-location.page.html',
  styleUrls: ['./download-location.page.css']
})
export class DownloadLocationPage implements OnInit {

  download_folder: string = "Folder's directory";

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {
  }

  getDownloadFolderLocation() {
    const result = this.electronService.ipcRenderer.invoke('download-folder-path');

    result.then(resolve => {
      // If a folder is selected
      if(resolve){
        this.download_folder = resolve[0];
      }
    })
  }

}
