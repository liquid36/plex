// AngularJS
import { Component }            from '@angular/core';


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// propios
import { SidebarComponent }     from './template/sidebar.component';
import { PlexBoxComponent }     from './box/plex-box.component';

import { ValidationService }    from './services/validation.service';
import { PlexNumberComponent }  from './form/plex-number.component';
import { PlexTextComponent }    from './form/plex-text.component';
// import { PlexInputComponent }     from './box/plex-input.component';

@Component({
    selector: 'app',
    templateUrl: 'app/template/app.html',
    directives: [
        PlexNumberComponent,
        PlexTextComponent,
        PlexBoxComponent,
    // PlexNumberComponent,
        SidebarComponent
    ]
})

export class AppComponent {
    public title: string;
    public subTitle: string;

    public appName: string;
    public user: any;
    // form
    public myForm: FormGroup;

    constructor(fb: FormBuilder) {
        this.title = "Dashboard";
        this.subTitle = "Hola";

        this.appName = "A.N.D.E.S";
        this.user = {
            nombre: "",
            edad: "",
            password: ""
        };

        // // form

        // this.myForm = fb.group({
        //     "firstName": this.firstName,
        //     "password":["", Validators.required]
        // });

        this.myForm = fb.group({
            "name": ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8), ValidationService.number]],
            'edad': ['', [ValidationService.minValue(), ValidationService.maxValue(110)]],
            'email': ['', [Validators.required, ValidationService.email]],
            "password": ["", Validators.required]
        });
    }

    onSubmit() {
        console.log("model-based form submitted");
        console.log(this.myForm);
    }

    get diagnostic() { return JSON.stringify(this.user); }

}
