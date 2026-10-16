import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { environment } from '../environments/environment';

const url = `${environment.apiUrl}/api/todos`;

describe('TodoService', () => {
  let service: TodoService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(TodoService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lists todos', () => {
    service.list().subscribe(t => expect(t.length).toBe(1));
    const req = http.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', title: 'a', done: false }]);
  });

  it('gets a todo', () => {
    service.get('1').subscribe(t => expect(t.title).toBe('a'));
    http.expectOne(`${url}/1`).flush({ id: '1', title: 'a', done: false });
  });

  it('creates a todo', () => {
    service.create({ title: 'a', done: false }).subscribe();
    const req = http.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({ id: '1', title: 'a', done: false });
  });

  it('updates a todo', () => {
    service.update('1', { title: 'b', done: true }).subscribe();
    const req = http.expectOne(`${url}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ id: '1', title: 'b', done: true });
  });

  it('deletes a todo', () => {
    service.delete('1').subscribe();
    const req = http.expectOne(`${url}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
