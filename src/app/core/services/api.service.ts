import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Wargame } from '../../shared/models/IWargame';

export type ExperienceLevel = 'beginner' | 'casual' | 'competitive';

export interface UserLocation {
  type: 'Point';
  coordinates: [number, number];
}

export interface AuthUser {
  provider: string;
  _id: string;
  googleId?: string | null;
  email: string;
  name: string;
  picture: string | null;
  favoriteGames: string[];
  experienceLevel?: ExperienceLevel;
  location?: UserLocation | null;
  onboardingCompleted?: boolean;
  createdAt: string;
  __v: number;
}

export interface AuthGoogleResponse {
  token: string;
  user: AuthUser;
}

export interface AuthPasswordRequest {
  email: string;
  password: string;
}

export interface AuthPasswordResponse {
  token: string;
  user: AuthUser;
}

export interface UpdateProfilePayload {
  name?: string;
  favoriteGames?: string[];
  experienceLevel?: ExperienceLevel;
  location?: UserLocation | null;
  onboardingCompleted?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl.replace(/\/$/, '');

  constructor(private readonly http: HttpClient) {}

  getWargames(): Observable<Wargame[]> {
    return this.http.get<Wargame[]>(`${this.baseUrl}/wargames`);
  }

  authGoogle(token: string): Observable<AuthGoogleResponse> {
    return this.http.post<AuthGoogleResponse>(`${this.baseUrl}/auth/google`, { token });
  }

  authRegister(payload: AuthPasswordRequest): Observable<AuthPasswordResponse> {
    return this.http.post<AuthPasswordResponse>(`${this.baseUrl}/auth/register`, payload);
  }

  authLogin(payload: AuthPasswordRequest): Observable<AuthPasswordResponse> {
    return this.http.post<AuthPasswordResponse>(`${this.baseUrl}/auth/login`, payload);
  }

  getProfile(): Observable<AuthUser> {
    return this.http.get<{ user: AuthUser }>(`${this.baseUrl}/user/profile`).pipe(map((res) => res.user));
  }

  updateProfile(payload: UpdateProfilePayload): Observable<AuthUser> {
    return this.http.patch<AuthUser>(`${this.baseUrl}/user/profile`, payload);
  }
}
