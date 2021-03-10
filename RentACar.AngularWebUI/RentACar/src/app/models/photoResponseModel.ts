import {ResponseModel} from './responseModel';
import {Photo} from './photo';

export interface CarResponseModel extends ResponseModel{
  data:Photo[]
}
