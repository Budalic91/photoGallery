import { NgModule } from "@angular/core";
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [MatInputModule, MatDialogModule, MatButtonModule, MatButtonToggleModule, MatIconModule],
    exports: [MatInputModule, MatDialogModule, MatButtonModule, MatButtonToggleModule, MatIconModule],
})
export class MaterialModule {}