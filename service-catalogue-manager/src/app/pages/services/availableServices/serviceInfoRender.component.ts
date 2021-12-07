import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Dataset } from '../../../model/services/dataset';
import { AvailableServiceRow } from './availableServices.component';

@Component({
  templateUrl: `./serviceInfoRender.component.html`,
})
export class ServiceInfoRenderComponent {
  @Input() value: AvailableServiceRow;

  @ViewChild('availableServiceInfoModal', { static: true }) serviceInfoModalRef: TemplateRef<unknown>;

  constructor(private modalService: NbDialogService, private translateService: TranslateService) {}

  showServiceInfoModal(): void {
    this.modalService.open(this.serviceInfoModalRef, {
      context: {
        modalHeader: this.value.title,
        description: this.value.hasInfo.description,
        keywords: this.value.hasInfo.keyword,
        serviceId: this.value.identifier,
        serviceUri: this.value.identifier,
        iconUrl: this.value.serviceIconUrl !== '' ? this.value.serviceIconUrl : 'favicon.png',
        provider: this.value.hasServiceInstance.serviceProvider.name,
        processings: this.value.isPersonalDataHandling,
        datasetsMap: this.mapDatasetsConcept(this.value.hasServiceInstance.dataset),
        locale: this.value.locale,
        dataController: this.value.hasServiceInstance.dataController,
      },
      hasScroll: true,
    });
  }

  mapDatasetsConcept(datasets: Array<Dataset>): Map<string, string[]> {
    return datasets.reduce(
      (map, dataset) =>
        map.set(
          dataset.identifier,
          dataset.dataMapping.map(
            (concept) =>
              concept.name + (concept.required ? '' : ` (${this.translateService.instant('general.services.data_concept_optional') as string})`)
          )
        ),
      new Map<string, string[]>()
    );
  }
}
