import * as ng from  "@angular/core";
import * as assert from 'assert';
import {getTestBed, TestBed} from '@angular/core/testing';
import {ServerTestingModule, platformServerTesting} from '@angular/platform-server/testing'

// under platform-server it should do this domino stuff for us
// however, I think we should be able to run this code then use 
// platform-browser?
// const domino = import * as a from  "domino");
// global['document'] = domino.createWindow('<html><body></body></html>', '/').document;
// Object.assign(global, domino.impl);
// import * as a from  "zone.js/dist/zone-node");
// import * as a from  "core-js/es/reflect");

import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test.js';
import 'zone.js/dist/async-test.js';
import 'zone.js/dist/fake-async-test.js';
import 'zone.js/dist/task-tracking.js';
import 'reflect-metadata';

@ng.Component({
  template: `
  <div>{{count}}</div>
  <button (click)="inc()"></button>
  `
})
export class CountComponent {
  count = 0;
  inc() {
    ++this.count;
  }
}

getTestBed().initTestEnvironment(ServerTestingModule, platformServerTesting());
TestBed.configureTestingModule({
    declarations: [CountComponent],
}).compileComponents().then(() => {
  const fixture = TestBed.createComponent(CountComponent);
  const component = fixture.debugElement.componentInstance as CountComponent;
  const div: HTMLElement = fixture.nativeElement.querySelector('div');
  const button: HTMLElement = fixture.nativeElement.querySelector('button');
  
  fixture.detectChanges();
  assert.equal(div.textContent, '0');
  component.inc();
  fixture.detectChanges();
  assert.equal(div.textContent, '1');

  button.click();
  fixture.detectChanges();
  assert.equal(div.textContent, '2');

});
