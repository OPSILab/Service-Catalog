import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  public static Enum = {
    COMPLETED : "Completed",
    UNDER_DEVELOMPENT : "Under development"
  }

  completed: boolean = false;

  @Input() value: String;

  ngOnInit() {
    this.completed = this.value == "Completed";
  }

}
