import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'add-key',
  templateUrl: './add-key.component.html',
  styleUrls: ['./add-key.component.css']
})
export class AddKeyComponent implements OnInit {

  @Input() value
  @Output() updateResult = new EventEmitter<unknown>();

  constructor() { }

  ngOnInit(): void {
    this.updateResult.emit(this.value)
  }

}
