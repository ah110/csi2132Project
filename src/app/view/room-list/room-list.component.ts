import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import Booking from '../../interfaces/booking';
import { RoomService } from '../../room-service.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Room from '../../interfaces/room';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  icons = {
    faTrash,
    faEdit
  }
  rooms: Room[] = [];

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.listAllRoom();
  }

  identify(index: number, item: Room): number {
    return item?.room_id;
  }
  listAllRoom(): void {
    this.roomService.listAllRoom().subscribe((data: Room[]) => {
      this.rooms = data;
    });
  }

}
