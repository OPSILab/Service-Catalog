import { Component, Input, OnInit } from '@angular/core';
import { AvailableServiceRow } from './availableServices.component';

@Component({
  template: `
     <nb-tag-list >
      <nb-tag appearance="outline" size="tiny"  *ngFor="let keyword of value.keywords; let i = index" [attr.data-index]="i" [text]="keyword" status="primary"></nb-tag>
    </nb-tag-list>
   
  `,
  styleUrls: ['./availableServices.component.scss'],
})
export class CustomKeywordRenderComponent implements  OnInit {

  
  @Input() value: AvailableServiceRow ;
  

  ngOnInit() {
    
  }

}