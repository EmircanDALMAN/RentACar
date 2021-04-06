using Business.Abstract;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Performance;
using Core.Aspects.Autofac.Transaction;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Logging.Log4Net.Loggers;
using Core.Entities;
using Core.Utilities.Results;

namespace Business.Concrete
{
    public class PaymentManager : IPaymentService
    {
        [LogAspect(typeof(FileLogger))]
        [ValidationAspect(typeof(FakePaymentValidator))]
        [PerformanceAspect(5)]
        public IResult MakePayment(IPaymentModel paymentModel)
        {
            return new SuccessResult();
        }
    }
}
