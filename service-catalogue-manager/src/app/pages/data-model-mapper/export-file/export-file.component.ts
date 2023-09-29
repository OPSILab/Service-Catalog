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
  mode

  constructor(protected ref: NbDialogRef<ExportFileComponent>) { }

  ngOnInit(): void {
  }

  fixBrokenPageBug() {
    document.getElementsByTagName('html')[0].className = ""
  }

  save(){
    this.ref.close(this.mode)
  }

  close(){
    this.ref.close()
  }

}
