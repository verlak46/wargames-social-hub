import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Wargame } from '../../shared/models/IWargame';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getWargames(): Observable<Wargame[]> {
    return this.http.get<Wargame[]>(`${this.baseUrl}/wargames`);
  }
}
