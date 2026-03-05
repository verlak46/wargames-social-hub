import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wargame } from '../../shared/models/IWargame';
import { firestore } from '../../app.config';
import { collection, onSnapshot, query, where } from '@firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private readonly firestore = firestore;

  getActiveWargames(): Observable<Wargame[]> {
    const ref = collection(this.firestore, 'wargames');
    const q = query(ref, where('active', '==', true));

    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const games: Wargame[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Wargame[];
        subscriber.next(games);
      });

      return { unsubscribe };
    });
  }
}
