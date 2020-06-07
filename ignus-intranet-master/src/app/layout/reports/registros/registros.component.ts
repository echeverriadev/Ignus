import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import { GlobalService } from '../../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import * as moment from 'moment';
import * as datepicker from 'ngx-bootstrap/datepicker';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as querystring from 'querystring';

@Component({
    selector: 'app-registros',
    templateUrl: './registros.component.html',
    styleUrls: ['./registros.component.scss'],
    animations: [routerTransition()]

})
export class RegistrosComponent implements OnInit {
    datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
    values = ['circular', 'barra', 'lineal'];
    defaultValue = this.values[0];
    tipos: any = [{ id: 1, name: "circular" }, { id: 2, name: "barra" }, { id: 3, name: "lineal" }];
    imagen: any;
    agencia: any;
    agencias: any;
    sexo : any = {
        id: 'Masculino'
    };
    edadI: any;
    edadF: any;
    sexos: any = [{
        id: 'Masculino',
        genero: 'Masculino'
    },{
        id: 'Femenino',
        genero: 'Femenino'
    }];
    servicio: any= {
        id: 1,
        name: ''
    };
    servicios: any = [];
    public view = false;
    public chart: any;
    fechaI: any;
    fechaF: any;
    query: any = {}
    logoURL: string = ""
    chartDefaultConfiguration: any = {
        chart: {
            renderTo: 'graficaCircular',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },               
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            },
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
                    },
                }, showInLegend: true
            }
        },
    };
    constructor(private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
        let now = moment().format();
        console.log('hello world', this.tipos);

        var doc = new jspdf('p', 'pt');
    }

    convertImgToBase64URL(url, callback){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d'), dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL("image/png");
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    }


    downloadImagePDF(){
        this.convertImgToBase64URL(this.logoURL, (base64Img) =>{
            this.imagen = base64Img; // myBase64 is the base64 string
            var doc = new jspdf()
        var data = document.getElementById('content');
        html2canvas(data).then(canvas => {
          // Few necessary setting options
          var imgWidth = 208;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;

          const contentDataURL = canvas.toDataURL('image/png')
          var position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, 55, imgWidth, imgHeight)
          doc.setFontSize(10)
          doc.text(78, 25, this.agencias.name+" "+this.agencias.rif)
          doc.setFontSize(10)
          let middleUbication = this.agencias.ubication.lastIndexOf(' ',this.agencias.ubication.length/2)
          doc.text(70, 30, this.agencias.ubication.substr(0,middleUbication))
          doc.text(71, 35, this.agencias.ubication.substr(middleUbication+1,this.agencias.ubication.length))
          doc.setFontSize(10)
          doc.text(84, 40, this.agencias.phoneNumber+ " / " +this.agencias.phoneNumber2)
          doc.addImage(this.imagen, 'PNG', 10,8,20,20)
          doc.addImage(this.imagen, 'PNG', 180,8,20,20)
 
          doc.save("Reporte-Suscripcion.pdf") 
        });
        });


          }

          getLogo(){
            this.globalService.getModel("/api/agency/logo")
            .then((result) => {
                console.log(result);
                this.logoURL = result['data']['url'];
            }, (err) => {
                console.log(err);
            });
        }


        allReporte(){
            const stringified = querystring.stringify({start: moment(this.servicio.fechaI).format('YYYY/MM/DD'), end: moment(this.servicio.fechaF).format('YYYY/MM/DD'), typeS: this.servicio.id })
            console.log(stringified);
            this.globalService.getModel("/api/report/request?")
            .then((result) => {
                this.agencias = result['data'];
            }, (err) => {
                console.log(err);
            });
        }

    allAgency(){
        this.globalService.getModel("/api/agency")
        .then((result) => {
            console.log(result);
            this.agencias = result['data'];
            console.log(this.agencias);
        }, (err) => {
            console.log(err);
        });
    }

    allService(){
      this.globalService.getModel("/api/typeService")
        .then((result) => {
          console.log(result);
          this.servicios = result['data'];
          console.log(this.servicios);
        }, (err) => {
          console.log(err);
        });
    }

    ngOnInit() {
        this.allAgency();
        this.allService();
        this.getLogo(); 
    }

    getTypeServiceNameById(){
        if(this.query.typeS)
            return this.servicios.filter(item=>item.id==this.query.typeS)[0].name
        else
            return ""
    }


    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }
    buscar() {

        
        this.view = true;
        this.query = {
            gender: this.sexo.id,
            minage: this.edadI,
            maxage: this.edadF,
            start: this.fechaI ? moment(this.fechaI).format('YYYY/MM/DD') : "",
            end: this.fechaF ? moment(this.fechaF).format('YYYY/MM/DD') : ""
        }
        const stringified = querystring.stringify(this.query)
        console.log(stringified);

        this.globalService.getModel("/api/report/client?"+stringified)
        .then((result) => {
            let dataAPI = result['data'];
            this.chartDefaultConfiguration = {...this.chartDefaultConfiguration, ...dataAPI}
            console.log(this.chartDefaultConfiguration)
            this.chart = new Chart(this.chartDefaultConfiguration);
        }, (err) => {
            console.log(err);
        });
    }
}

