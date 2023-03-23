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
        description: this.value.hasInfo.description[0].description,
        sector: this.value.hasInfo.sector,
        event: this.value.hasInfo.isGroupedBy,
        thematicArea: this.value.hasInfo.thematicArea,
        serviceId: this.value.identifier,
        serviceUri: this.value.identifier,
        publicService: this.value.isPublicService,
        iconUrl: this.value.serviceIconUrl !== '' ? this.value.serviceIconUrl : 'favicon.png',
        provider: this.value.hasServiceInstance.serviceProvider.name,
        processings: this.value.isPersonalDataHandling,
        channel: this.value.hasInfo.hasChannel,
        language: this.value.hasInfo.language,
        location: this.value.hasInfo.spatial,
        locale: this.value.locale,
        competentAuthority: this.value.hasInfo.hasCompetentAuthority,
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
