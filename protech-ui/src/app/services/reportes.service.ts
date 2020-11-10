import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  urlMarcas = 'https://pomber.github.io/covid19/timeseries.json';
  constructor(private httpClient: HttpClient) { }
}
