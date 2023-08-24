import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss']
})
export class AuthViewComponent implements OnInit {
  page!: string

  constructor( private location: Location) {}

  ngOnInit(): void {
    this.page = this.location.path().slice(6);
  }
}
