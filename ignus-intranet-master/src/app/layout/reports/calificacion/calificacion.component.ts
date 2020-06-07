import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import * as datepicker from 'ngx-bootstrap/datepicker';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 


@Component({
    selector: 'app-calificacion',
    templateUrl: './calificacion.component.html',
    styleUrls: ['./calificacion.component.scss'],
    animations: [routerTransition()]

})
export class CalificacionComponent implements OnInit {
    datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
    public view = false;
    public datos: any = {
        fecha_inicio: '',
        fecha_fin: ''
    }
    minDate: any;
    values = ['circular', 'barra', 'lineal'];
    defaultValue = this.values[0];
    tipos: any = [{ id: 1, name: "circular" }, { id: 2, name: "barra" }, { id: 3, name: "lineal" }];

    public chart: any;
    constructor() {   
        var doc = new jspdf('p', 'pt');
        this.datePickerConfig = Object.assign({},
            { containerClass: 'theme-dark-blue' },
            { showWeekNumbers: false },
            { dateInputFormat: 'DD/MM/YYYY' },
            { locale: 'es' });
    }
    downloadImagePDF(){
        var doc = new jspdf()
        var data = document.getElementById('content');  
        html2canvas(data).then(canvas => {  
          // Few necessary setting options  
          var imgWidth = 208;   
          var pageHeight = 295;    
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  
      
          const contentDataURL = canvas.toDataURL('image/png')  
          //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
          var position = 0;  
          //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
          doc.addImage(contentDataURL, 'PNG', 0, 40, imgWidth, imgHeight) 
          doc.setFontSize(30)
          doc.text(55, 25, 'Reportes Estadisticos')
          var img = new Image();
          img.src = "./../../assets/images/ignus3.png"
          doc.addImage(img, 'PNG', 0,3,30,30)
          doc.addImage(img, 'PNG', 180,3,30,30)
          doc.save("Reporte.pdf")
        });  
    
          }

    ngOnInit() {
        
    }

    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }

    // onValueChange(value: Date): void { 
    //     this.minDate = moment(value).format('DD/MM/YYYY');
    //   }

    buscar() {
        this.datos.fecha_inicio =  moment(this.datos.fecha_inicio).format('DD/MM/YYYY');
        this.datos.fecha_fin =  moment(this.datos.fecha_fin).format('DD/MM/YYYY');
        

        const data = {
            fecha_inicio:  moment(this.datos.fecha_inicio).format('YYYY/MM/DD'),
            fecha_fin: moment(this.datos.fecha_fin).format('YYYY/MM/DD')
           

        };
        console.log(data);
        this.view = true;
        this.chart = new Chart({
            chart: {
                renderTo: 'graficaLineal', 	// Le doy el nombre a la gráfica
                defaultSeriesType: 'line'	// Pongo que tipo de gráfica es

            },
            title: {
                text: 'Calificación de Empleado'	// Titulo (Opcional)
            },
            // Pongo los datos en el eje de las 'X'
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                // Pongo el título para el eje de las 'X'
                title: {
                    text: 'Meses'
                }
            },
            yAxis: {
                // Pongo el título para el eje de las 'Y'
                title: {
                    text: 'Promedios de calificaciones'
                }
            },
            // Doy formato al la "cajita" que sale al pasar el ratón por encima de la gráfica
            tooltip: {
                enabled: true,
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y + ' ' + this.series.name;
                }
            },
            // Doy opciones a la gráfica
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            // Doy los datos de la gráfica para dibujarlas
            series: [{
                name: 'Excelente',
                data: [103, 474, 402, 536, 1041, 270, 676, 160, 2462, 3797, 3527, 4505]
            },
            {
                name: 'Regular',
                data: [278, 203, 370, 810, 213, 787, 134, 1991, 3122, 2870, 3655, 6400]
            },
            {
                name: 'Decadente',
                data: [1064, 1648, 1040, 1076, 2012, 397, 680, 325, 3732, 6067, 5226, 6482]
            }],
        });
    }
}

