import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { FooterComponent, HeaderComponent, SearchInputComponent, SwitcherComponent } from './components';
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe, NumberWithCommasPipe } from './pipes';
import { OneColumnLayoutComponent, ThreeColumnsLayoutComponent, TwoColumnsLayoutComponent } from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { ACROSS_THEME } from './styles/theme.across';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
];
const COMPONENTS = [
  SwitcherComponent,
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];
const PIPES = [CapitalizePipe, PluralPipe, RoundPipe, TimingPipe, NumberWithCommasPipe];

@NgModule({
  imports: [CommonModule, ...NB_MODULES, 
    
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    })],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'across',
          },
          [DEFAULT_THEME, ACROSS_THEME, CORPORATE_THEME, DARK_THEME]
        ).providers,
      ],
    };
  }
}
