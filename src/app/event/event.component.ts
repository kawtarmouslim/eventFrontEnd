import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../models/evenement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventForm!: FormGroup;
  nameError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.eventForm = this.formBuilder.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      description: ['', Validators.required],
      nombrePlase: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData: Evenement = this.eventForm.value;
      this.eventService.createEvenement(formData).subscribe({
        next: (response: Evenement) => {
          console.log('Événement créé avec succès', response);
          this.router.navigate(['event/all']);
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'événement', error);
          if (error.status === 400) {
            this.nameError = 'Le nom de l\'événement existe déjà. Veuillez en choisir un autre.';
          } else {
            this.nameError = 'Une erreur s\'est produite lors de l\'ajout de l\'événement.';
          }
        }
      });
    }
  }
}

 

