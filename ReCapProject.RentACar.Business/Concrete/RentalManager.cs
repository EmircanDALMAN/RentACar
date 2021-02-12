﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ReCapProject.Core.Constants;
using ReCapProject.Core.Utilities.Results.Abstract;
using ReCapProject.Core.Utilities.Results.Concrete;
using ReCapProject.RentACar.Business.Abstract;
using ReCapProject.RentACar.DataAccess.Abstract;
using ReCapProject.RentACar.Entities.Concrete;
using ReCapProject.RentACar.Entities.DTOs;

namespace ReCapProject.RentACar.Business.Concrete
{
    public class RentalManager : IRentalService
    {
        private readonly IRentalDal _rentalDal;

        public RentalManager(IRentalDal rentalDal)
        {
            _rentalDal = rentalDal;
        }

        public IResult Add(Rental rental)
        {
            _rentalDal.Add(rental);
            return new SuccessResult(Messages.RentalAdded);
        }

        public IResult CheckReturnDate(int carId)
        {
            var result = _rentalDal.GetRentalDetails(x => x.CarId == carId);
            if (result.Count > 0 && result.Count(x => x.ReturnDate == null) > 0)
            {
                return new ErrorResult();
            }
            return new SuccessResult();

        }

        public IDataResult<List<Rental>> GetAll()
        {
            return new SuccessDataResult<List<Rental>>(_rentalDal.GetAll());
        }

        public IDataResult<List<RentalDetailsDto>> GetRentalDetailsDto(int carId)
        {
            return new SuccessDataResult<List<RentalDetailsDto>>(_rentalDal.GetRentalDetails(x => x.CarId == carId));
        }

        public IResult UpdateReturnDate(int Id)
        {
            var result = _rentalDal.GetAll(x => x.CarId == Id);
            var updatedRental = result.LastOrDefault();
            if (updatedRental?.ReturnDate != null)
            {
                return new ErrorResult();
            }

            if (updatedRental == null) return new SuccessResult();
            updatedRental.ReturnDate = DateTime.Now;
            _rentalDal.Update(updatedRental);

            return new SuccessResult();
        }
    }
}
