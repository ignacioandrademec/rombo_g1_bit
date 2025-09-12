import { Component, inject, OnChanges, ViewChild, Input } from '@angular/core';
import { LlamarComponente } from '../../../service/llamar-componente';
import { ObtenerArchivo } from '../../../service/obtener-archivo';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent, ApexOptions } from "ng-apexcharts";
import { ServiceImg64 } from '../../../service/service-img64';

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
  imagenService = inject(ServiceImg64)
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
      const {_id, __v, ...nuevoDato} = this.getData

      //procesar datos
      this.data = Object.keys(nuevoDato);
      var arry:any = []
      for(const meses in nuevoDato){
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
            text: `grafica tipo ${this.getCat}`
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
    const tabla = document.getElementById("tablaIngresos")
    const imagen64S = await this.imagenService.transformarImg64("imagenLogo.png")
    
    if (!tabla) {
      console.error('Tabla no encontrada');
      return;
    }

    html2canvas(tabla).then((canvas)=>{
      const imagenBase64 = canvas.toDataURL('image/png');

      const docDefinition = {
        pageSize: 'LETTER',
        content: [
          { 
            image: imagen64S, 
            width: 50, 
            alignment: 'right'
          },
          { text: this.getName, style: 'header', alignment: 'center' },
          {
            image: result.imgURI,
            width: this.getCat == "pie" ? 350 : 600,
            alignment: 'center'
          },
          { text: 'Tabla de valores', style: 'header', alignment: 'center' },
          { 
            image: imagenBase64, 
            width: 500,
            alignment: 'center'
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
    })
  }
}
