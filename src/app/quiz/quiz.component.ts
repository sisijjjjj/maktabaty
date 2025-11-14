import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz',
 

  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizForm: FormGroup;

  morphologies = ['A (pyramide)', 'H (rectangle)', 'X (sablier)', 'O (ronde)', 'V (inversé)'];
  couleurs = ['Rouge', 'Bleu', 'Vert', 'Noir', 'Blanc', 'Beige', 'Rose', 'Marron'];
  vetements = ['Robes', 'Pantalons', 'Jupes', 'Chemises', 'Vestes', 'Accessoires'];
  evenements = ['Casual', 'Professionnel', 'Soirée', 'Mariage', 'Voyage'];
  saisons = ['Printemps', 'Été', 'Automne', 'Hiver'];

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      morphologie: ['', Validators.required],
      couleurs: [[], Validators.required],
      vetements: [[], Validators.required],
      budget: ['', [Validators.required, Validators.min(10)]],
      evenement: ['', Validators.required],
      saison: ['', Validators.required]
    });
  }

  onCheckboxChange(event: any, controlName: string) {
    const currentValues = this.quizForm.get(controlName)?.value || [];
    if (event.target.checked) {
      currentValues.push(event.target.value);
    } else {
      const index = currentValues.indexOf(event.target.value);
      if (index > -1) currentValues.splice(index, 1);
    }
    this.quizForm.get(controlName)?.setValue(currentValues);
  }

  onSubmit() {
    if (this.quizForm.valid) {
      console.log('Résultats du quiz :', this.quizForm.value);
      // Tu peux ici router vers la page de profil ou suggestions
    }
  }
}
