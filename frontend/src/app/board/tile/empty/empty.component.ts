import { Component } from '@angular/core';

@Component({
  selector: 'empty',
  template: `
    <div></div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class EmptyComponent { }
