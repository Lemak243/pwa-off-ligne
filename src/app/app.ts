import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:online)': 'retourInternet()',
    '(window:offline)': 'perteInternet()'
  },
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/signalement';

  readonly enLigne = signal(navigator.onLine);

  readonly enAttente = signal(
    localStorage.getItem('signalement') ?? ''
  );

  readonly sauvegardeEnCours = signal(false);
  readonly description = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/\S/)]
  });

  constructor(){
    this.synchroniser();
  }

  retourInternet(){
    this.enLigne.set(true);
    this.synchroniser();
  }

  perteInternet(){
    this.enLigne.set(false);
  }

  enregistrer(contenu: string){
    const texte = contenu.trim();

    if(!texte || this.enAttente()){
      return;
    }

    localStorage.setItem('signalement', texte);

    this.enAttente.set(texte);
    this.description.reset();

    this.synchroniser();
  }

  synchroniser() {
    if(!this.enLigne() || !this.enAttente() || this.sauvegardeEnCours()){
      return;
    }

    this.sauvegardeEnCours.set(true);

    this.http.post(this.apiUrl, {
      contenu : this.enAttente()
    }).subscribe({
      next: () => {
        localStorage.removeItem('signalement');

        this.enAttente.set('');

        this.sauvegardeEnCours.set(false);
      },

      error: (erreur) => {
        console.error('Erreur de synchronisation', erreur);
        this.sauvegardeEnCours.set(false);
      }
    });
  }

}
