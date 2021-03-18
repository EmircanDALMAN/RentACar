using System;
using System.Collections.Generic;
using System.Text;
using Core.Entities;
using Core.Utilities.Results;

namespace Business.Abstract
{
    public interface IPaymentService
    {
        IResult MakePayment(IPaymentModel paymentModel);
    }
}
