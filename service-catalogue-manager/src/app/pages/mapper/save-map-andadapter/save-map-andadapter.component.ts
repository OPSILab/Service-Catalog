import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'save-map-andadapter',
  templateUrl: './save-map-andadapter.component.html',
  styleUrls: ['./save-map-andadapter.component.css']
})
export class SaveMapAndadapterComponent implements OnInit {

  @Input() value

  constructor() { }

  ngOnInit(): void {
  }

}

