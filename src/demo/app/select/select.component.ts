import { Component, OnInit, HostBinding } from '@angular/core';
import { SelectEvent } from './../../../lib/select/select-event.interface';

// Importo un servicio de prueba
import { ServiceDemoSelect } from './select.service';

@Component({
    templateUrl: 'select.html',
})
export class SelectDemoComponent implements OnInit {
    // Permite el uso de flex-box en el componente
    @HostBinding('class.plex-layout') layout = true;

    public opciones: any[];
    public modelo1 = { select: null };
    public rModelo1 = { select: null };
    public modelo2 = { select: null };
    public modelo3 = { select: null };
    public modelo4 = { select: null };

    constructor(public servicio: ServiceDemoSelect) { }

    private groups = {
        field: 'continente',
        items: [{
            id: 1,
            label: 'Latinoamerica',
            value: 'Latinoamerica'
        }, {
            id: 2,
            value: 'Europa',
            label: 'Europa'
        }
        ]
    }

    ngOnInit() {
        // Opciones
        this.opciones = [{
            id: 1,
            nombre: 'Concepto Preferido 1',
            preferido: true,
        },
        {
            id: 2,
            nombre: 'Concepto 1A',
            preferido: false,
        },
        {
            id: 3,
            nombre: 'Concepto 2A',
            preferido: false,
        },
        {
            id: 4,
            nombre: 'Concepto 3A',
            preferido: false,
        },
        {
            id: 5,
            nombre: 'Concepto Preferido 2',
            preferido: true,
        },
        {
            id: 6,
            nombre: 'Concepto 2A',
            preferido: false,
        },
        {
            id: 7,
            nombre: 'Concepto 2B',
            preferido: false,
        },
        {
            id: 8,
            nombre: 'Concepto Preferido 3',
            preferido: true,
        }
        ];

        this.modelo1.select = this.modelo2.select = this.opciones[1];
        this.rModelo1.select = this.opciones[2];
    }

    loadData(event: SelectEvent) {
        // Event tiene una propiedad 'query' que contiene el texto que el usuario ha escrito en el input.
        // Esto permite enviar a las APIs un parámetro para hacer las búsquedas más eficientes
        if (event.query) {
            this.servicio.get(event.query).subscribe(event.callback);
        } else {
            event.callback(null);
        }
    }
}
