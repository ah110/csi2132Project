import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import {RoomService} from '../../room-service.service';
import { RoomListComponent } from './room-list.component';
import Booking from '../../interfaces/booking';
import Room from '../../interfaces/room';

describe('RoomListComponent', () => {
  let roomListComponent: RoomListComponent;
  let fixture: ComponentFixture<RoomListComponent>;
  let roomServiceSpy: jasmine.SpyObj<RoomService>

  beforeEach(() => {
    const mockRoomService = {
     bookRoom: (employee: Booking) => of({}),
      checkInById: (employee:Booking ) => of({}),
      listRoomByName: (name: string) => of({
        booking_id: '',
        customer_id: '',
        room_id: '',
        rent_from: '',
        rent_to: '',
      }),
      listAllRoom: () => of([])
    };

    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
      providers: [
        RoomListComponent,
        { provide: RoomService, useValue: mockRoomService },
      ],
    });

    fixture = TestBed.createComponent(RoomListComponent);
    roomListComponent = fixture.componentInstance;

    roomServiceSpy = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(roomListComponent).toBeTruthy();
    });
    it('should init', () => {
      const spy_ngOnInit = spyOn(roomListComponent, 'ngOnInit').and.callThrough();
     roomListComponent.ngOnInit();
      expect(spy_ngOnInit).toHaveBeenCalled();
    });
  });

  describe('identify', () => {
    it('should makes expected calls without item', () => {
      const spy_identify = spyOn(roomListComponent, 'identify').and.callThrough();
      roomListComponent.identify(0, null);
      expect(spy_identify).toHaveBeenCalled();
    });
    it('should makes expected calls with item', () => {
      const spy_identify = spyOn(roomListComponent, 'identify').and.callThrough();
      const room = { room_id: 1 } as Room;
      roomListComponent.identify(0, room);
      expect(spy_identify).toHaveBeenCalled();
    });
  });
});
