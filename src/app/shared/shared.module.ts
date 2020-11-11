import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import * as fromComponents from './components';
import * as fromValidators from './custom-form-validators';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, ...fromComponents.components,...fromValidators.validators]
})
export class SharedModule {}
