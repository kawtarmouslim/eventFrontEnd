import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{
  
  eventForm!: FormGroup;
  event!:Event
  constructor(
    private service:EventService,
    private  router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,

  ){}
  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      places: [0, [Validators.required, Validators.min(1)]],
      description: ['']
    });
    
  }
  add(){
    this.service.saveEvent(this.event).subscribe(data=>{
      this.router.navigate([]);
    })
  }

}
