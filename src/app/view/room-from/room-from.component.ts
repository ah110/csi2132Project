import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomService } from '../../room-service.service';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import Room from '../../interfaces/room';
import { faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl } from '@angular/forms';
import Booking from '../../interfaces/booking';

@Component({
  selector: 'app-room-from',
  templateUrl: './room-from.component.html',
  styleUrls: ['./room-from.component.css']
})
export class RoomFromComponent implements OnInit {
  icons = {
    faUserPlus,
    faUserEdit
  };

  bookingForm: FormGroup = this.formBuilder.group({
    booking_id: ['', Validators.required],
    customer_id: ['', Validators.required],
    room_id: ['', Validators.required],
    rent_from: ['', Validators.required],
    rent_to: ['', Validators.required],
  });
  city_name: string = '';
  booking_id: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.checkParam();
  }


  checkParam(): void {
    this.route.params.subscribe(params => {

      if (params.name) {
        this.city_name = params.name;
        this.listRoomByName(this.city_name);
      }
    });
  }

  listRoomByName(name: string): void {
    this.roomService.listRoomByName(name).subscribe((res: Booking ) => {
      this.bookingForm.setValue({
        booking_id: res.booking_id,
        customer_id: res.customer_id,
        room_id: res.room_id,
        rent_from: res.rent_from,
        rent_to: res.rent_to
      });
    });
  }

  bookRoom(): void {
    this.roomService.bookRoom(this.bookingForm.value).subscribe(res => {
      Swal.fire({
        title: 'booking successfully!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/booking']);
      });
    });
  }

  checkInById(id: number): void {
    const book: Booking = {
      booking_id: id,
      ...this.bookingForm.value
    };
    this.roomService.checkInById(book).subscribe(res => {

      Swal.fire({
        title: 'check in successfully!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/booking/:id']);
      });
    });
  }
  onSubmit(): void {
      this.bookRoom();
  }
  submit(value: string): void {
    const id = parseInt(value);
    this.checkInById(id);
  }


  getControl(control: string): AbstractControl {
    return this.bookingForm.controls[control];
  }


  validatorInputs(control: string): boolean {
    return this.getControl(control).invalid && (this.getControl(control).dirty || this.getControl(control).touched);
  }
  validatorErrorsRequired(control: string): boolean {
    return this.getControl(control).errors.required;
  }
}
