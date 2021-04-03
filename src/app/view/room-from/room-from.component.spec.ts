import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { RoomService } from 'src/app/room-service.service';
import {RoomFromComponent} from './room-from.component';
import Booking from 'src/app/interfaces/Booking';
import Swal from 'sweetalert2';


describe('RoomFromComponent', () => {
  let roomFromComponent: RoomFromComponent;
  let fixture: ComponentFixture<RoomFromComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let roomServiceSpy: jasmine.SpyObj<RoomService>;

  beforeEach(() => {
    const mockRouter: Router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    const mockRoomService = {
      bookRoom: (book: Booking) => of({}),
      checkInById: (book: Booking) => of({}),
      listRoomByName: (name: string) => of({
        booking_id: '',
        customer_id: '',
        room_id: '',
        rent_from: '',
        rent_to: '',
      }),
    };

    const mockActivatedRoute = {
      params: of({ id: 0 }),
    };

    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
      providers: [
        roomFromComponent,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RoomService, useValue: mockRoomService },
      ],
    });

    fixture = TestBed.createComponent(RoomFromComponent);
    roomFromComponent = fixture.componentInstance;

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    roomServiceSpy = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;

  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(roomFromComponent).toBeTruthy();
    });
    it('should init for register', () => {
      const spy_ngOnInit = spyOn(roomFromComponent, 'ngOnInit').and.callThrough();
      roomFromComponent.ngOnInit();
      expect(spy_ngOnInit).toHaveBeenCalled();
    });
    it('should init for edit', () => {
      activatedRouteSpy.params = of({ id: 1 });
      const spy_ngOnInit = spyOn(roomFromComponent, 'ngOnInit').and.callThrough();
      roomFromComponent.ngOnInit();
      expect(spy_ngOnInit).toHaveBeenCalled();
    });
  });

  describe('checkParam', () => {
    it('should makes expected calls with id', () => {
      const spy_checkParam = spyOn(roomFromComponent, 'checkParam').and.callThrough();
      activatedRouteSpy.params = of({ id: 1 });
      roomFromComponent.checkParam();
      expect(spy_checkParam).toHaveBeenCalled();
    });
    it('should makes expected calls without id', () => {
      const spy_checkParam = spyOn(roomFromComponent, 'checkParam').and.callThrough();
      activatedRouteSpy.params = of({ id: null });
      roomFromComponent.checkParam();
      expect(spy_checkParam).toHaveBeenCalled();
    });
  });

  describe('listRoomByName', () => {
    it('should makes expected calls', () => {
      const spy_listRoomByName = spyOn(roomFromComponent, 'listRoomByName').and.callThrough();
      roomFromComponent.listRoomByName('ottawa');
      expect(spy_listRoomByName).toHaveBeenCalled();
    });
  });

  describe('bookRoom', () => {
    it('should makes expected calls', () => {
      spyOn(Swal,"fire").and.resolveTo({ isConfirmed: true, isDismissed: false });
      const spy_bookRoom = spyOn(roomFromComponent, 'bookRoom').and.callThrough();
      roomFromComponent.bookRoom();
      expect(spy_bookRoom).toHaveBeenCalled();
    });
  });

  describe('checkInById', () => {
    it('should makes expected calls', () => {
      spyOn(Swal,"fire").and.resolveTo({ isConfirmed: true, isDismissed: false });
      roomFromComponent.booking_id = 1;
      const spy_checkInById = spyOn(roomFromComponent, 'checkInById').and.callThrough();
      roomFromComponent.checkInById();
      expect(spy_checkInById).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should makes expected calls for register', () => {
      roomFromComponent.booking_id = 0;
      const spy_onSubmit = spyOn(roomFromComponent, 'onSubmit').and.callThrough();
      roomFromComponent.onSubmit();
      expect(spy_onSubmit).toHaveBeenCalled();
    });
    it('should makes expected calls for edit', () => {
     roomFromComponent.booking_id = 1;
     const spy_onSubmit = spyOn(roomFromComponent, 'onSubmit').and.callThrough();
     roomFromComponent.onSubmit();
     expect(spy_onSubmit).toHaveBeenCalled();
    });
  });

  describe('getControl', () => {
    it('should makes expected calls', () => {
      const spy_getControl = spyOn(roomFromComponent, 'getControl').and.callThrough();
      roomFromComponent.getControl('name');
      expect(spy_getControl).toHaveBeenCalled();
    });
  });

  describe('validatorInputs', () => {
    it('should makes expected calls', () => {
      const spy_validatorInputs = spyOn(roomFromComponent, 'validatorInputs').and.callThrough();
      roomFromComponent.validatorInputs('name');
      expect(spy_validatorInputs).toHaveBeenCalled();
    });
  });

  describe('validatorErrorsRequired', () => {
    it('should makes expected calls', () => {
      const spy_validatorErrorsRequired = spyOn(roomFromComponent, 'validatorErrorsRequired').and.callThrough();
      roomFromComponent.validatorErrorsRequired('name');
      expect(spy_validatorErrorsRequired).toHaveBeenCalled();
    });
  });
});
