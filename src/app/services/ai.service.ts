import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  getInvestmentRecommendations(savings: number): Promise<any> {
    return fetch('http://localhost:3000/recs', {
      method: 'POST',
      body: JSON.stringify({
        savings: savings
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
  }
}
