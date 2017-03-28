import {
    ViewChild, Component, OnInit, Input, AfterViewInit, Output, EventEmitter,
    forwardRef, ElementRef, Renderer, ContentChild, HostBinding, OnChanges
} from '@angular/core';
import {
    ControlValueAccessor, FormControl,
    NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl
} from '@angular/forms';
import { numberValidator } from '../core/validator.functions';

const REGEX = /^\s*(\-)?(\d*)\s*$/;

@Component({
    selector: 'plex-int',
    templateUrl: 'int.html',
    // Las siguientes líneas permiten acceder al atributo formControlName/ngModel
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PlexIntComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PlexIntComponent),
            multi: true
        },
    ]
})
export class PlexIntComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {
    private lastValue: any = null;
    private renderer: Renderer;
    @ViewChild('ref') private ref: ElementRef;
    @ContentChild(NgControl) public control: any;

    // Propiedades
    @Input() label: string;
    @Input() prefix: string;
    @Input() suffix: string;
    @Input() placeholder: string;
    @Input() disabled = false;
    @Input() readonly = false;
    @Input() min: number;
    @Input() max: number;
    @Input()
    set autoFocus(value: any) {
        // Cada vez que cambia el valor vuelve a setear el foco
        if (this.renderer) {
            this.renderer.invokeElementMethod(this.ref.nativeElement, 'focus');
        }
    }

    // Eventos
    @Output() change = new EventEmitter();

    // Funciones públicas
    public onChange = (_: any) => { };

    // Validación
    validateFn = (c: FormControl) => { };
    validate(c: FormControl) {
        return this.validateFn(c);
    }
    ngOnChanges(changes) {
        // Cuando cambias las cotas, devuelve una nueva función de validación
        if (changes.min || changes.max) {
            this.validateFn = numberValidator(REGEX, this.min, this.max);
        }
    }

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.placeholder = '';
    }

    // Inicialización
    ngOnInit() { }
    ngAfterViewInit() {
        if (this.autoFocus) {
            this.renderer.invokeElementMethod(this.ref.nativeElement, 'focus');
        }
    }

    // Actualización Modelo -> Vista
    writeValue(value: any) {
        this.renderer.setElementProperty(this.ref.nativeElement, 'value', typeof value === 'undefined' ? '' : value);
    }

    // Actualización Vista -> Modelo
    registerOnTouched() {
    }
    registerOnChange(fn: any) {
        this.onChange = (value) => {
            // Estas líneas evitan que se muestren caracteres no permitidos en el input
            // debugger;
            if ((value === '') || REGEX.test(value)) {
                this.lastValue = value;
            } else {
                this.writeValue(this.lastValue);
                value = this.lastValue;
            }

            // Emite los eventos
            let val = ((value == null) || (value === '')) ? null : Number.parseInt(value);

            fn(val);
            this.change.emit({
                value: val
            });
        };
    }
}
