
import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GlobalService } from '../../../providers/global.service';
//import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    //animations: [routerTransition()],
    styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent {

    closeResult: string;
    perfil: any = {
        person: { firstName: "" },
        TypePropertyId: 0,
        TypeServiceId: 0,
        ParishId: 0,
        buildDate: "19/08/1970",
        typeSpecifications: [],
        state: 0,
        municipality: 0
    }
    user: any;
    perfiles: any;
    nuevo: any;
    requirements: any;
    activities: any;
    employee: any;
    transaction: any;
    test: any;

    public states: any = [];
    public municipalities: any = [];
    public parishes: any = [];
    activatespecifications: any = false;
    showNew: Boolean = false;
    step: string;
    submitType: string = 'Save';
    selectedRow: number;

    typeservices: any;
    typeproperties: any;

    passwordactual: any;
    passwordnew: any;
    passwordnew2: any;


    constructor(public globalService: GlobalService) {
        this.user = JSON.parse(localStorage.user)
        this.loadclient();
        this.show();
        this.loadtypeservices();
        this.loadstates();
        this.loadtypeproperties();
    }

    loadstates() {
        this.globalService.getModel(`/api/state/`).then((result) => {
            if (result['status']) {
                this.states = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }

    loadtypeservices() {
        this.globalService.getModel("/api/typeService?offeringProperty=true").then((result) => {
            if (result['status']) {
                //Para que actualice la lista

                this.typeservices = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }

    loadtypeproperties() {
        this.globalService.getModel("/api/typeProperty").then((result) => {
            if (result['status']) {
                //Para que actualice la lista
                this.typeproperties = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }
    loadclient() {

        this.globalService.getModel_Id(this.user.id, '/api/client')
            .then((result) => {
                console.log('cliente');
                console.log(result);
                this.perfil.person = result['data'].person;

            }, (err) => {
                console.log(err);
                // this.loader.dismiss();
            });
            
            this.globalService.getModel_Id(this.user.id, '/api/property/client/preference')
                    .then((result) => {
                        console.log(result)
                        if (result['status']) {
                            
                            this.perfil.typeSpecifications = result['data'].typeSpecifications
                            
                            this.activatespecifications = true;
                            this.perfil.TypePropertyId = result['data'].typeProperty.id
                            this.perfil.TypeServiceId = result['data'].TypeService.id
                this.perfil.state = result['data'].state.id;
                this.loadmunicipality(this.perfil.state);
                this.perfil.municipality = result['data'].municipality.id;
                this.loadparish(this.perfil.municipality)
                this.perfil.ParishId = result['data'].parish.id;
                            console.log(this.perfil)
                        }
                    }, (err) => {
                        console.log(err);
                        // this.loader.dismiss();
                    });


    }
    //this method associate to reload states
    loadmunicipality(state) {
        this.municipalities = [];

        this.globalService.getModel(`/api/state/municipality/${state}`).then((result) => {
            if (result['status']) {
                //municipios
                this.municipalities = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }

    loadparish(municipality) {

        this.globalService.getModel(`/api/municipality/parish/${municipality}`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.parishes = result['data'];

            }
        }, (err) => {
            console.log(err);
        });

    }

    loadSpecifications() {
        this.globalService.getModel(`/api/typeProperty/specification/${this.perfil.TypePropertyId}`).then((result) => {
            if (result['status']) {
                this.perfil.typeSpecifications = result['data']
                this.activatespecifications = true;
            }
        }, (err) => {
            console.log(err);
        });

    }


    show() {
    }
    faEdit = faEdit;

    newpassword() {
        if (this.passwordnew == this.passwordnew2) {
            var password = {
                "currentPassword": this.passwordactual,
                "newPassword": this.passwordnew
            }

            this.globalService.updateModel(this.user.id, password, "/api/user")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el service
                    }

                }, (err) => {
                    console.log(err);
                });
        }
    }


    loadpreferences() {
        console.log(this.perfil)

    }

    newpreferences() {


 var nuevo = {
    TypePropertyId: Number.parseInt(this.perfil.TypePropertyId),
    TypeServiceId: Number.parseInt(this.perfil.TypeServiceId),
    ParishId: Number.parseInt(this.perfil.ParishId),
    buildDate: "19/08/1970",
    typeSpecifications: this.perfil.typeSpecifications,
    state: Number.parseInt(this.perfil.state),
    municipality: Number.parseInt(this.perfil.municipality)
}
console.log(nuevo)
        this.globalService.updateModel(this.user.id,nuevo, "/api/client/preference")
            .then((result) => {
                if (result['status']) {
                    //Para que actualice la lista una vez que es editado el service
                }

            }, (err) => {
                console.log(err);
            });
    }


}