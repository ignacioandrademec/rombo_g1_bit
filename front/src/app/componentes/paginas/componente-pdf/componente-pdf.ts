import { Component, inject, OnChanges, ViewChild, Input } from '@angular/core';
import { LlamarComponente } from '../../../service/llamar-componente';
import { ObtenerArchivo } from '../../../service/obtener-archivo';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent, ApexOptions } from "ng-apexcharts";

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

export type ChartOptions = ApexOptions;

@Component({
  selector: 'app-componente-pdf',
  imports: [NgApexchartsModule,],
  templateUrl: './componente-pdf.html',
  styleUrl: './componente-pdf.css'
})
export class ComponentePDF implements OnChanges {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  llamarComponente = inject(LlamarComponente)
  obtenerArchivo = inject(ObtenerArchivo)
  @Input() getCat:any
  @Input() getId:string = ""
  @Input() getName:string = ""
  getData: any
  data: Array<string> = []
  ingresos: Array<string> = []
  gastos: Array<string> = []
  balances: Array<number> = []
  ingresosTotal: number = 0
  gastosTotal: number = 0
  balancesTotal: number = 0

  ngOnChanges(): void {

    /* obtener los datos, borrar la informacion de la base de datos y crear la grafica*/
    this.obtenerArchivo.obtenerArchivo(this.getId).subscribe((res:any)=>{
      //obtener datos
      this.getData = res.data
      console.log(this.getData);
      const {_id, __v, ...nuevoDato} = this.getData
      console.log(nuevoDato);

      //procesar datos
      this.data = Object.keys(nuevoDato);
      var arry:any = []
      for(const meses in nuevoDato){
        console.log(meses, nuevoDato[meses].ingresos - nuevoDato[meses].gastos );
        var ingresosPorMes = nuevoDato[meses].ingresos
        var gastosPorMes = nuevoDato[meses].gastos
        var balancePorMes = nuevoDato[meses].ingresos - nuevoDato[meses].gastos
        var balance = ingresosPorMes - gastosPorMes
        arry.push(balance)
        this.ingresosTotal += nuevoDato[meses].ingresos
        this.gastosTotal += nuevoDato[meses].gastos
        this.balancesTotal += balancePorMes
        this.ingresos.push(ingresosPorMes)
        this.gastos.push(gastosPorMes)
        this.balances.push(balancePorMes)
      };
      console.log("meses:",this.data);
      console.log("valores", arry);
      console.log(this.ingresos);
      console.log(this.gastos);

      // crear grafico
      if (this.getCat == "pie") {
        this.chartOptions = {
          labels: this.data,
          series: arry,
          chart: {
            id: 'ventasChart',
            width: 380,
            type: 'pie',
          },
          responsive: [{
            breakpoint: 400,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      } else {
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
            type: this.getCat,
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
      }
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
        { text: this.getName, style: 'header' },
        {
          image: result.imgURI,
          width: 500,
        },
        {
		    	style: 'tableExample',
		    	table: {
		    		headerRows: 1,
		    		body: [
		    			[{text: 'Header 1', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
		    			['Sample value 1', 'Sample value 2', 'Sample value 3'],
		    			['Sample value 1', 'Sample value 2', 'Sample value 3'],
		    			['Sample value 1', 'Sample value 2', 'Sample value 3'],
		    			['Sample value 1', 'Sample value 2', 'Sample value 3'],
		    			['Sample value 1', 'Sample value 2', 'Sample value 3'],
		    		]
		    	},
		    	layout: {
		    		hLineWidth: function (i:number, node: any) {
		    			return (i === 0 || i === node.table.body.length) ? 2 : 1;
		    		},
		    		vLineWidth: function (i:number, node: any) {
		    			return (i === 0 || i === node.table.widths.length) ? 2 : 1;
		    		},
		    		hLineColor: function (i:number, node: any) {
		    			return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
		    		},
		    		vLineColor: function (i:number, node: any) {
		    			return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
		    		},
		      },
        },
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
