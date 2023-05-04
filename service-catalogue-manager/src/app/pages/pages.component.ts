import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';

import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  public menu: NbMenuItem[];
  private hideServicesMenu: boolean;
  private hideConsentsMenu: boolean;
  private hideManageMenu: boolean;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private translateService: TranslateService, private cdr: ChangeDetectorRef, private accessChecker: NbAccessChecker) { }

  ngOnInit(): void {
    this.accessChecker
      .isGranted('view', 'services')
      .pipe(take(1))
      .subscribe((granted: boolean) => {
        this.hideServicesMenu = !granted;
      });

    this.accessChecker
      .isGranted('view', 'consents')
      .pipe(take(1))
      .subscribe((granted: boolean) => {
        this.hideManageMenu = !granted;
      });

      this.accessChecker
      .isGranted('view', 'manage')
      .pipe(take(1))
      .subscribe((granted: boolean) => {
        this.hideManageMenu = !granted;
      });


    const MENU_ITEMS: NbMenuItem[] = [
      {
        title: 'general.menu.dashboard',
        icon: 'pie-chart-outline',
        link: '/pages/dashboard',
      },
      {
        title: 'general.menu.consents_logs_group',
        group: true,
        hidden: this.hideConsentsMenu,
      },
      {
        title: 'general.menu.consents',
        icon: 'toggle-left-outline',
        link: '/pages/consents/register',
        hidden: this.hideConsentsMenu,
      },
      {
        title: 'general.menu.services',
        group: true,
        hidden: this.hideServicesMenu,
      },
      {
        title: 'general.menu.availableservices',
        icon: 'grid-outline',
        link: '/pages/services/availableServices',
        home: true,
        hidden: this.hideServicesMenu,
      },
      {
        title: 'general.menu.editor',
        icon: 'edit-outline',
        link: '/pages/services/service-editor',
        hidden: this.hideServicesMenu,
      },
      {
        title: 'general.menu.connectors_adapters',
        group: true,
        hidden: this.hideServicesMenu,
      },
      {
        title: 'general.menu.connectors',
        icon: 'link-2-outline',
        link: '/pages/services/availableConnectors',
        hidden: this.hideServicesMenu,
      },
      {
        title: 'general.menu.adapters',
        icon: 'shuffle-2-outline',
        link: '/pages/services/availableAdapters',
        hidden: this.hideServicesMenu,
      },
      {
        title: 'general.menu.administration',
        group: true,
        hidden: this.hideManageMenu,
      },
      {
        title: 'general.menu.federated_catalogues',
        icon: 'share-outline',
        link: '/pages/management/federatedCatalogues',
        hidden: this.hideManageMenu,
      },
      {
        title: 'general.menu.remote_catalogues',
        icon: 'list-outline',
        link: '/pages/management/remoteCatalogues',
        hidden: this.hideManageMenu,
      },
      {
        title: 'general.menu.configuration',
        icon: 'settings-outline',
        link: '/pages/management/manageConfigurations',
        hidden: this.hideManageMenu,
      },
    ];

    // if put on constructor it will doing twice when refresh a page.
    this.menu = this.translate(MENU_ITEMS);
    this.translateService.onLangChange.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.menu = this.translate(MENU_ITEMS);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  translate(menuItems: NbMenuItem[]): NbMenuItem[] {
    return menuItems.map((item) => {
      return {
        ...item,
        title: this.translateService.instant(item.title) as string,
        // children: item.children.map((child) => {
        //   return { ...child, title: this.translateService.instant(child.title) as string };
        // }),
      } as NbMenuItem;
    });
  }
}
