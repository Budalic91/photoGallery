import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PathLocationStrategy } from '@angular/common';
import { DialogService } from './dialog.service';

export interface DialogData {
    albumId: any;
    photo: object;
    totalPhoto: any;
    firstElement: any;
}

@Component({
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
    imageUrl:string;
    id;
    albumId;
    total;
    firstElement;
    lastId;

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,
                private dialogService: DialogService)
                {}

    ngOnInit(): void{
        this.imageUrl = this.data.photo['url'];
        this.id = this.data.photo['id'];
        this.albumId = this.data.photo['albumId'];
        this.total = this.data.totalPhoto - 1;
        this.firstElement = this.data.firstElement;
        this.lastId = this.firstElement + this.total;
    }

    loadPhoto(value)
    {
        if (value == 'plus')
        {
            if (this.id == this.lastId)
            {
                this.id = this.firstElement;
            }
            else 
            {
                ++this.id;
            }
        }
        else
        {
            if (this.id == this.firstElement)
            {
                this.id = this.lastId;
            }
            else 
            {
                --this.id
            }
        }

        this.dialogService.getPhotoById(this.albumId,this.id).subscribe(data => {
            this.imageUrl = data[0]['url'];
            this.id = data[0]['id'];
            this.albumId = data[0]['albumId'];
        });
    }

    closeModal()
    {
        this.dialogRef.close();
    }


}