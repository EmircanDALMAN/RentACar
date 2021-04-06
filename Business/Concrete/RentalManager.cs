using Business.Abstract;
using Business.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System.Collections.Generic;
using Business.BusinessAspects.Autofac;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Performance;
using Core.Aspects.Autofac.Transaction;

namespace Business.Concrete
{
    public class RentalManager : IRentalService
    {
        private readonly IRentalDal _rentalDal;
        private readonly IPaymentService _paymentService;

        public RentalManager(IRentalDal rentalDal, IPaymentService paymentService)
        {
            _rentalDal = rentalDal;
            _paymentService = paymentService;
        }

        [SecuredOperation("Rental.Add")]
        [CacheRemoveAspect("IRentalService.Get")]
        public IResult Add(Rental rental)
        {
            _rentalDal.Add(rental);
            return new SuccessResult(Messages.RentalAdded);
        }
        [TransactionScopeAspect]
        public IResult AddRentalAndPayment(RentalPaymentDto rentalPaymentDto)
        {
            _paymentService.MakePayment(rentalPaymentDto.FakeCreditCardModel);
            _rentalDal.Add(rentalPaymentDto.Rental);
            return new SuccessResult(Messages.RentalAddedAndPaymentSuccessful);
        }

        [CacheRemoveAspect("IRentalService.Get")]
        [SecuredOperation("Rental.Delete")]
        public IResult Delete(Rental rental)
        {
            _rentalDal.Delete(rental);
            return new SuccessResult(Messages.RentalDeleted);
        }
        public IDataResult<List<Rental>> GetAll()
        {
            return new SuccessDataResult<List<Rental>>(_rentalDal.GetAll(), Messages.RentalListed);
        }
        [PerformanceAspect(5)]
        public IDataResult<Rental> GetById(int id)
        {
            return new SuccessDataResult<Rental>(_rentalDal.Get(b => b.Id == id));
        }
        public IDataResult<List<RentalDetailDto>> GetRentalDetailsById(int id)
        {
            return new SuccessDataResult<List<RentalDetailDto>>(_rentalDal.GetRentalDetailsById(id));
        }
        public IDataResult<List<RentalDetailDto>> GetRentalDetails()
        {
            return new SuccessDataResult<List<RentalDetailDto>>
                (_rentalDal.GetRentalDetails());
        }
        [CacheRemoveAspect("IRentalService.Get")]
        [SecuredOperation("Rental.Update")]
        public IResult Update(Rental rental)
        {
            _rentalDal.Update(rental);
            return new SuccessResult(Messages.RentalUpdated);
        }
    }
}
