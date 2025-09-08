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
  public chartOptions!: Partial<ChartOptions>;

  llamarComponente = inject(LlamarComponente)
  obtenerArchivo = inject(ObtenerArchivo)
  getId!:string 
  getData: any
  data: Array<string> = []
  ingresos: Array<string> = []
  gastos: Array<string> = []

  ngOnInit(): void {
    /* recibir id de la informacion */
    this.llamarComponente.idTransfer.subscribe(response => {
      this.getId = response
    })
    /* obtener los datos, borrar la informacion de la base de datos y crear la grafica*/
    this.obtenerArchivo.obtenerArchivo(this.getId).subscribe((res:any)=>{
      //obtener datos
      this.getData = res.data
      console.log(this.getData);
      const {_id, __v, ...nuevoDato} = this.getData
      console.log(nuevoDato);
      //procesar datos
      this.data = Object.keys(nuevoDato);
      var arry =[]
      for(const meses in nuevoDato){
        console.log(meses, nuevoDato[meses][0].ingresos - nuevoDato[meses][1].gastos );
        var ingresosPorMes = nuevoDato[meses][0].ingresos
        var gastosPorMes = nuevoDato[meses][1].gastos
        var balance = ingresosPorMes - gastosPorMes
        arry.push(balance)
        this.ingresos.push(ingresosPorMes)
        this.gastos.push(gastosPorMes)
      };
      console.log(arry);
      console.log(this.ingresos);
      console.log(this.gastos);
      // crear grafico
      this.chartOptions = {
        series: [
          {
            name: "My-series",
            data: arry
          }
        ],
        chart: {
          id: 'ventasChart',
          height: 350,
          width: 1000,
          type: "area",
          zoom: {
            enabled: false
          }
        },
        title: {
          text: "My First Angular Chart"
        },
        xaxis: {
          categories: this.data,
          labels: {
            style: {
              fontSize: '25px'
            }
          }
        }
      };
    })
  }

  cerrarVentana(){
    window.location.reload()
  }

  //crear PDF
  async generarPDF(){
    const result = await ApexCharts.exec('ventasChart', 'dataURI');

    const docDefinition = {
      content: [
        { text: 'Reporte de Ventas', style: 'header' },
        {
          image: result.imgURI,
          width: 500,
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
