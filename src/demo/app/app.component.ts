import { Component, OnInit } from '@angular/core';
import { Plex } from '../../lib/core/service';
import { DropdownItem } from './../../lib/dropdown/dropdown-item.inteface';

@Component({
  selector: 'plex-app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // Hace que PlexService sea un singleton para toda la aplicación
  constructor(public plex: Plex) { }

  ngOnInit() {
    this.plex.updateTitle('Plex: UI/UX para ANDES');

    const menu: DropdownItem[] = [
      { label: 'Inicio', icon: 'creation', route: '/inicio' },
      { label: 'Loader', icon: 'dots-horizontal', route: '/loader' },
      { label: 'Phone', icon: 'phone', route: '/phone' },
      { label: 'Bool', icon: 'checkbox-marked-outline', route: '/bool' },
      { label: 'Box', icon: 'selection', route: '/box' },
      { label: 'Button', icon: 'solid', route: '/button' },
      { label: 'DateTime', icon: 'calendar', route: '/datetime' },
      { label: 'Float', icon: 'numeric', route: '/float' },
      { label: 'Int', icon: 'numeric', route: '/int' },
      { label: 'Modal', icon: 'application', route: '/modal' },
      { label: 'Select', icon: 'format-list-bulleted', route: '/select' },
      { label: 'Tabs', icon: 'folder', route: '/tabs' },
      { label: 'Accordion', icon: 'view-day', route: '/accordion' },
      { label: 'Text', icon: 'alphabetical', route: '/text' },
      { label: 'Dropdown', icon: 'menu-right', route: '/dropdown' },
      { label: 'Tooltip', icon: 'tooltip', route: '/tooltip' },
    ];
    this.plex.updateMenu(menu);
    this.plex.updateAppStatus({ API: 'OK' });
    this.plex.updateUserInfo({
      'usuario': {
        'nombreCompleto': 'Haruki Morakami',
        'nombre': 'Haruki',
        'apellido': 'Morakami',
        'username': 26108063,
        'documento': 26108063
      },
      'organizacion': {
        '_id': '57e9670e52df311059bc8964',
        'nombre': 'HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON',
        'id': '57e9670e52df311059bc8964'
      }
    });
  }
}
