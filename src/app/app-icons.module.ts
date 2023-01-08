import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const SVG_ICONS = ['people_delete_add'];

@NgModule({
  imports: [MatIconModule],
})
export class AppIconsModule {
  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    SVG_ICONS.forEach((x) => this.addSvgIcon(x));
  }

  addSvgIcon(name: string): void {
    this.iconRegistry.addSvgIcon(name, this.resourceUrl(name));
  }

  resourceUrl(name: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      `../assets/icons/${name}.svg`
    );
  }
}
