import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ImportComponent } from './import/import.component';

@Component({
  selector: 'mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.scss']
})
export class MapperComponent implements OnInit {

  constructor(protected dialogService: NbDialogService,) { }

  ngOnInit(): void {
    console.log("MAPPER")
  }

  import(field, typeSource: string): void {
    this.dialogService.open(ImportComponent)
  }

}
