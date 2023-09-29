import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CreateMapComponent } from '../create-map.component';
import { ErrorDialogAdapterService } from '../../../error-dialog/error-dialog-adapter.service';

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
message
  constructor(
    protected ref: NbDialogRef<DialogComponent>,
    private errorService: ErrorDialogAdapterService,
    protected dialogService: NbDialogService,

  ) { }
  confirm(){
    this.ref.close(true)
  }

  test(){
    this.dialogService.open(DialogComponent)
  }

  error(){
    this.errorService.openErrorDialog({error:"example"})
  }


  cancel(){
    this.ref.close(false)
  }

  ngOnInit(): void {
  }

}
