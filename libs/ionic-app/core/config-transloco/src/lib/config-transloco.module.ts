import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  TranslocoConfig,
  TranslocoModule,
  TRANSLOCO_CONFIG,
} from '@ngneat/transloco';

import { translocoLoader } from './transloco.loader';

export type AvailableLang = string | { id: string; label: string } | undefined;

@NgModule({
  imports: [CommonModule, TranslocoModule],
  exports: [TranslocoModule],
})
export class ConfigTranslocoModule {
  static forRoot(
    prodMode: boolean,
    availableLangs: AvailableLang[] = [
      { id: 'en', label: 'English' },
      { id: 'es', label: 'Español' },
    ]
  ): ModuleWithProviders<ConfigTranslocoModule> {
    return {
      ngModule: ConfigTranslocoModule,
      providers: [
        {
          provide: TRANSLOCO_CONFIG,
          useValue: {
            availableLangs: availableLangs,
            defaultLang: 'en',
            prodMode: prodMode,
            reRenderOnLangChange: true, // set to true when dynamic language change is in place
            flatten: {
              aot: prodMode,
            },
          } as TranslocoConfig,
        },
        translocoLoader,
      ],
    };
  }
  // static forChild(
  //   scopeName: string,
  //   loader: any
  // ): ModuleWithProviders<TranslocoConfigModule> {
  //   return {
  //     ngModule: TranslocoConfigModule,
  //     providers: [
  //       {
  //         provide: TRANSLOCO_SCOPE,
  //         useValue: {
  //           scope: scopeName,
  //           loader,
  //         },
  //       },
  //     ],
  //   };
  // }
}
