using System;
using System.Collections.Generic;
using System.Text;
using ReCapProject.Core.Utilities.Results.Abstract;
using ReCapProject.RentACar.Entities.Concrete;

namespace ReCapProject.RentACar.Business.Abstract
{
    public interface ICustomerService
    {
        IDataResult<List<Customer>> GetAll();
    }
}
