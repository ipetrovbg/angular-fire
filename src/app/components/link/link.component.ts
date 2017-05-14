import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('linkState', [
      state('inactive', style({
        // backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        // backgroundColor: '#cfd8dc',
        transform: 'scale(.9)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class LinkComponent {
  @Input('links') public links;
  constructor() { }

  toggleState( index ) {
    this.links.forEach((element, i) => {
      if (i !== index) {
        element.state = 'inactive';
      }
    });
    this.links[index].state = this.links[index].state === 'inactive' ? 'active' : 'inactive';
  }

}
