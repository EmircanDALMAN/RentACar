using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using ReCapProject.Entities.Concrete;

namespace ReCapProject.Business.ValidationRules.FluentValidation
{
    public class CarImageValidator : AbstractValidator<CarImage>
    {
        public CarImageValidator()
        {
            RuleFor(r => r.CarId).NotEmpty();
            RuleFor(r => r.ImagePath).NotEmpty();
            RuleFor(r => r.Date).NotEmpty();
        }
    }
}
