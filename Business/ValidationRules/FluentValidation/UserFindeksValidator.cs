using Business.Constants;
using Entities.DTOs;
using FluentValidation;

namespace Business.ValidationRules.FluentValidation
{
    public class UserFindeksValidator : AbstractValidator<UserFindeksDto>
    {
        public UserFindeksValidator()
        {
            RuleFor(u=>u.DateYear.ToString())
                .NotEmpty().WithMessage(Messages.UserDateYearNotEmpty)
                .MinimumLength(4).WithMessage(Messages.UserDateYearError)
                .MaximumLength(4).WithMessage(Messages.UserDateYearError);
            RuleFor(u=>u.TcNo.ToString())
                .NotEmpty().WithMessage(Messages.UserIdentityNotEmpty)
                .MinimumLength(11).WithMessage(Messages.UserIdentityError)
                .MaximumLength(11).WithMessage(Messages.UserIdentityError);
        }
    }
}