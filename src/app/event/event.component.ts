import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../models/event';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{
  
eventForm: FormGroup;

  constructor(
    private service: EventService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire
    this.eventForm = this.fb.group({
      titre: [''],
      type: [''],
      nombrePlase: [0],
      description: [''],
      dateDebut: [''],
      dateFin: ['']
    });
  }

  ngOnInit(): void {
    
  }
  add(): void {
    const formValue = {
      ...this.eventForm.value,
      dateDebut: this.eventForm.value.dateDebut ? new Date(this.eventForm.value.dateDebut).toISOString() : null,
      dateFin: this.eventForm.value.dateFin ? new Date(this.eventForm.value.dateFin).toISOString() : null
    };

    this.service.saveEvent(formValue).subscribe({
      next: () => {
        alert('Événement créé !');
        this.router.navigate(['']);
      },
      error: () => {
        alert('Erreur lors de la création');
      }
    });
  }
}

 

