import { AvailableCataloguesService } from './../availableCatalogues.service';
import { Component, Input, OnInit } from '@angular/core';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() value: CatalogueEntry;
  constructor(private catalogueService : AvailableCataloguesService) { }

  async ngOnInit(): Promise<void> {
    console.debug(this.value)
    //console.debug (await this.catalogueService.getIcon(this.value.iconURL))
  }

}
