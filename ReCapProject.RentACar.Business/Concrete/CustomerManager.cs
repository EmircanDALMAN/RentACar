using System;
using System.Collections.Generic;
using System.Text;
using ReCapProject.Core.Utilities.Results.Abstract;
using ReCapProject.Core.Utilities.Results.Concrete;
using ReCapProject.RentACar.Business.Abstract;
using ReCapProject.RentACar.DataAccess.Abstract;
using ReCapProject.RentACar.Entities.Concrete;

namespace ReCapProject.RentACar.Business.Concrete
{
    public class CustomerManager : ICustomerService
    {
        readonly ICustomerDal _customerDal;

        public CustomerManager(ICustomerDal customerDal)
        {
            _customerDal = customerDal;
        }

        public IDataResult<List<Customer>> GetAll()
        {
            return new SuccessDataResult<List<Customer>>(_customerDal.GetAll());
        }


    }
}
