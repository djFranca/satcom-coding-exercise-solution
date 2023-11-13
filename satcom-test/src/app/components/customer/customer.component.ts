import {Component, OnInit} from '@angular/core';
import {Customer} from "../../models/customer";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  element: Customer;
  constructor() { }

  ngOnInit(): void {
  }
}
