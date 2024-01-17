import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//key: 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

@Injectable({
  providedIn: 'root',
})
export class AIService {
private apiUrl = 'https://api.openai.com/v1'; // Replace with the actual OpenAI API URL

  constructor(private http: HttpClient) {}

  getInvestmentRecommendations(savings: number): Observable<any> {
    const prompt = `Given the user has savings of ${savings}, provide investment recommendations.`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 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',
    });

    return this.http.post(`${this.apiUrl}/completions`, { prompt, model: 'gpt-3.5-turbo' }, { headers });
  }
}
