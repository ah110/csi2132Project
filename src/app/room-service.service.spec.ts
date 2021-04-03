import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import Booking from './interfaces/booking';
import Renting from './interfaces/renting';
import { RoomService } from './room-service.service';

describe('RoomService', () => {
  let roomService: RoomService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const mockHttpClient = jasmine.createSpyObj<HttpClient>('HttpClient', [ 'get', 'post', 'put', 'delete' ]);
    TestBed.configureTestingModule({
      providers: [
        RoomService,
        { provide: HttpClient, useValue: mockHttpClient },
      ],
    });
    roomService = TestBed.inject(RoomService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(roomService).toBeTruthy();
  });

  describe('bookRoom', () => {
    it('should make expected calls', () => {
      httpClientSpy.post.and.resolveTo();
      const spy_bookRoom = spyOn(roomService, 'bookRoom').and.callThrough();
      const book = new Booking();
      roomService.bookRoom(book);
      expect(spy_bookRoom).toHaveBeenCalled();
    });
  });

  describe('listAllRoom', () => {
    it('should make expected calls', () => {
      httpClientSpy.post.and.resolveTo();
      const spy_listAllRoom = spyOn(roomService, 'listAllRoom').and.callThrough();
      roomService.listAllRoom();
      expect(spy_listAllRoom).toHaveBeenCalled();
    });
  });

  describe('listRoomByName', () => {
    it('should make expected calls', () => {
      httpClientSpy.post.and.resolveTo();
      const spy_listRoomByName = spyOn(roomService, 'listRoomByName').and.callThrough();
      roomService.listRoomByName('ottawa');
      expect(spy_listRoomByName).toHaveBeenCalled();
    });
  });

  describe('checkInById', () => {
    it('should make expected calls', () => {
      httpClientSpy.post.and.resolveTo();
      const spy_checkInById = spyOn(roomService, 'checkInById').and.callThrough();
      const book = new Booking();
      roomService.checkInById(book);
      expect(spy_checkInById).toHaveBeenCalled();
    });
  });

  describe('rentRoom', () => {
    it('should make expected calls', () => {
      httpClientSpy.post.and.resolveTo();
      const spy_rentRoom = spyOn(roomService, 'rentRoom').and.callThrough();
      const rent = new Renting();
      roomService.rentRoom(rent);
      expect(spy_rentRoom).toHaveBeenCalled();
    });
  });
});
