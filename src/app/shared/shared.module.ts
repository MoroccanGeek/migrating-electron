import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import * as fromComponents from './components';
import * as fromValidators from './custom-form-validators';
import { ConfigErrorModalComponent } from './components/error-modals/config-error-modal/config-error-modal.component';

@NgModule({
  declarations: [...fromComponents.components, ConfigErrorModalComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, ...fromComponents.components]
})
export class SharedModule {}
