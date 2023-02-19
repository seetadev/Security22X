import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { ListPage } from '../pages/list/list';
import { HomePage } from '../pages/home/home';
import { InappPurchasePage } from '../pages/inapp-purchase/inapp-purchase';
import { TabsPage } from '../pages/tabs/tabs';
import { TemplatePopoverPage } from '../pages/template-popover/template-popover';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { LocalService } from '../providers/local-service';
import { CloudService} from '../providers/cloud-service';
import { MultiService } from '../providers/multi-service';
import { InappPurchaseService } from '../providers/inapp-purchase-service';

import { Storage } from '@ionic/storage';
import { Capitalize } from "../pipes/capitalize";

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    ListPage,
    HomePage,
    InappPurchasePage,
    TemplatePopoverPage,
    LoginModalPage,
    TabsPage,
    Capitalize
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    ListPage,
    HomePage,
    InappPurchasePage,
    TemplatePopoverPage,
    LoginModalPage,
    TabsPage
  ],
  providers: [
    LocalService,
    CloudService,
    MultiService,
    Storage,
    InappPurchaseService
  ]
})
export class AppModule {}
