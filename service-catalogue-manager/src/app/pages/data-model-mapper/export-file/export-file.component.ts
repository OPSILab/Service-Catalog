import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css']
})
export class ExportFileComponent implements OnInit {
  name
  adapterId

  constructor(protected ref: NbDialogRef<ExportFileComponent>) { }

  ngOnInit(): void {
  }

  save(){
    this.ref.close({name:this.name,id:this.adapterId})
  }

  close(){
    this.ref.close()
  }

}
