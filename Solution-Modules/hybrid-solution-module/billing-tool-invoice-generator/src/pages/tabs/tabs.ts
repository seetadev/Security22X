import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';
import { ListPage } from '../list/list';
import { InappPurchasePage } from '../inapp-purchase/inapp-purchase';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = MenuPage;
  tab3Root: any = ListPage;
  tab4Root: any = InappPurchasePage;

  constructor() {

  }
}
