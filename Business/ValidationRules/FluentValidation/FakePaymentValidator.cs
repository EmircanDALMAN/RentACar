using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Business.Constants;
using Core.Entities.Concrete;
using FluentValidation;

namespace Business.ValidationRules.FluentValidation
{
    public class FakePaymentValidator : AbstractValidator<FakeCreditCardModel>
    {
        public FakePaymentValidator()
        {
            RuleFor(f => f.CardNumber).NotEmpty();
            RuleFor(f => f.CardNumber).MinimumLength(16);
            RuleFor(f => f.CardNumber).MaximumLength(16);
            RuleFor(f => f.CardHolderName).NotEmpty().MaximumLength(50);
            RuleFor(f => f.ExpirationMonth).NotEmpty().LessThan(1)
                .GreaterThan(12);
            RuleFor(p => p.ExpirationYear).NotEmpty()
                .LessThan(DateTime.Now.Year).GreaterThan(DateTime.Now.AddYears(30).Year);
        }
    }
}
