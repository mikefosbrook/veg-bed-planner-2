import { http, HttpResponse } from 'msw';
import bedMockData from './bed-mock-data';

function getBeds() {
  return http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/beds/`, () => {
    return HttpResponse.json(bedMockData, { status: 200 });
  });
}

function deleteBed() {
  return http.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/beds/:id`, () => {
    return new HttpResponse(null, { status: 200 });
  });
}

// function createBed() {
//   return http.post(`${process.env.NEXT_PUBLIC_BASE_URL}/beds/`, ({ body }) => {
//     return new HttpResponse(body, { status: 201 });
//   });
// }

export const handlers = [getBeds(), deleteBed() /*createBed()*/];
