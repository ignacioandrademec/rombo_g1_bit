import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LlamarComponente } from '../../../service/llamar-componente';
import { ObtenerArchivo } from '../../../service/obtener-archivo';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-componente-pdf',
  imports: [NgApexchartsModule],
  templateUrl: './componente-pdf.html',
  styleUrl: './componente-pdf.css'
})
export class ComponentePDF implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  llamarComponente = inject(LlamarComponente)
  obtenerArchivo = inject(ObtenerArchivo)
  getId!:string 
  getData: any

  ngOnInit(): void {
    this.getData
    /* recibir id de la informacion */
    this.llamarComponente.idTransfer.subscribe(response => {
      this.getId = response
      console.log(this.getId);
    /* obtener los datos y borrar la informacion de la base de datos */
    this.obtenerArchivo.obtenerArchivo(this.getId).subscribe((res:any)=>{
      console.log(res);
      this.getData = res.data
    })
    })
  }

  cerrarVentana(){
    window.location.reload()
  }


  // grafico
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 167]
        }
      ],
      chart: {
        id: 'ventasChart',
        height: 350,
        width: 1000,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug"],
        labels: {
          style: {
            fontSize: '25px'
          }
        }
      }
    };
  }

  //crear PDF
  async generarPDF(){
    const result = await ApexCharts.exec('ventasChart', 'dataURI');

    const docDefinition = {
      content: [
        { text: 'Reporte de Ventas', style: 'header' },
        {
          image: result.imgURI,
          width: 500
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 20]
        }
      }
    };

    pdfMake.createPdf(docDefinition as any).open();
  }
}
