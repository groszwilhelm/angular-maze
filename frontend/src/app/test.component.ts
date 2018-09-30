import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-component',
  template: `
    <ng-content></ng-content>
  `
})
export class TestComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
