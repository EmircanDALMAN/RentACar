import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/responseModels/listResponseModel';
import {Rental} from '../models/entityModels/rental';
import {environment} from '../../environments/environment';
import {RentalDetail} from '../models/entityModels/RentalDetail';
import {FakeCreditCard} from '../models/entityModels/fakeCreditCard';
import {ResponseModel} from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = environment.apiUrl + 'rentals/';

  constructor(private httpClient: HttpClient) {
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl + 'details');
  }

  getRentalByCar(id: number) {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl + 'detailsbycar?id=' + id);
  }

  addRental(rental: RentalDetail, fakeCreditCard: FakeCreditCard): Observable<ResponseModel> {
    console.log(fakeCreditCard);
    return this.httpClient.post<ResponseModel>
    (this.apiUrl + 'add',
      {
        rental:
          {
            'carId': rental.carId,
            'customerId': rental.customerId,
            'returnDate': rental.returnDate
          },
        fakeCreditCardModel:
          {
          'cardNumber': fakeCreditCard.cardNumber,
          'cardHolderName': fakeCreditCard.cardHolderName,
          'expirationYear': parseInt(fakeCreditCard.expirationYear.toString()),
          'expirationMonth': parseInt(fakeCreditCard.expirationMonth.toString()),
          'cvv': fakeCreditCard.cvv
        }
      });
  }
}
