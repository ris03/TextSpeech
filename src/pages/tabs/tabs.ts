import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
import { PracticeTestPage } from '../practice-test/practice-test';
import { StarttestPage } from '../starttest/starttest';
import { TestsPage } from '../tests/tests';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PracticeTestPage;
  tab2Root = TestsPage;
  // tab3Root = ContactPage;

  constructor() {

  }
}
