using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using Business.BusinessAspects.Autofac;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Performance;
using Core.Utilities.Business;
using Entities.DTOs;

namespace Business.Concrete
{
    public class CustomerManager : ICustomerService
    {
        private readonly ICustomerDal _customerDal;

        public CustomerManager(ICustomerDal customerDal)
        {
            _customerDal = customerDal;
        }

        [ValidationAspect(typeof(CustomerValidator))]
        [CacheRemoveAspect("ICustomerService.Get")]
        [SecuredOperation("Customer.Add")]
        public IResult Add(Customer customer)
        {
            var result = BusinessRules.Run
                (CheckIfExistsCustomer(customer.UserId));
            if (result != null) return result;

            _customerDal.Add(customer);
            return new SuccessResult(Messages.CustomerAdded);

        }
        [CacheRemoveAspect("ICustomerService.Get")]
        [SecuredOperation("Customer.Delete")]
        public IResult Delete(Customer customer)
        {
            _customerDal.Delete(customer);
            return new SuccessResult(Messages.CustomerDeleted);
        }
        [CacheAspect()]
        public IDataResult<List<Customer>> GetAll()
        {
            return new SuccessDataResult<List<Customer>>(_customerDal.GetAll(), Messages.CustomerListed);
        }
        [CacheAspect()]
        [PerformanceAspect(5)]
        public IDataResult<Customer> GetById(int id)
        {
            return new SuccessDataResult<Customer>(_customerDal.Get(b => b.UserId == id));
        }
        [CacheRemoveAspect("ICustomerService.Get")]
        public IResult Update(Customer customer)
        {
            _customerDal.Update(customer);
            return new SuccessResult(Messages.CustomerUpdated);
        }

        private IResult CheckIfExistsCustomer(int userId)
        {
            var customer = _customerDal.Get(c => c.UserId == userId);
            if (customer != null)
            {
                return new ErrorResult(Messages.CustomerAlreadyExists);
            }
            return new SuccessResult();
        }
        [CacheAspect()]
        public IDataResult<List<CustomerDetailDto>> GetCustomerDetails()
        {
            return new SuccessDataResult<List<CustomerDetailDto>>(_customerDal.GetCustomerDetails());
        }
    }
}
