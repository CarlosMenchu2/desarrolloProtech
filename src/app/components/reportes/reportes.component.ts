import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, SingleDataSet } from 'ng2-charts';
/* import * as pluginAnnotations from 'chartjs-plugin-annotation'; */

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  // --------------------------------------- Datos gráfico de líneas 1 ------------------------------------------------------
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'grey',
      backgroundColor: 'rgba(26,42,64,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // --------------------------------------- Datos gráfico de pie 1 (Marcas) ------------------------------------------------------
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabelsMarcas: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartDataMarcas: SingleDataSet = [300, 500, 100];
  public pieChartTypeMarcas: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // --------------------------------------- Datos gráfico de pie 2 ------------------------------------------------------
  public pieChartLabelsCategorias: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartDataCategorias: SingleDataSet = [300, 500, 100];
  public pieChartTypeCategorias: ChartType = 'pie';

  constructor() { }
  ngOnInit(): void {
  }

}
