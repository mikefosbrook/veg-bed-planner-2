import { http, HttpResponse } from 'msw';
import bedMockData from './bed-mock-data';

function getBeds() {
  return http.get('http://localhost:4000/beds/', () => {
    return HttpResponse.json(bedMockData, { status: 200 });
  });
}

function deleteBed() {
  return http.delete(`http://localhost:4000/beds/:id`, () => {
    return new HttpResponse(null, { status: 200 });
  });
}

export const handlers = [getBeds(), deleteBed()];
