using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace RentACar.Core.CrossCuttingConcerns.Validation
{
    public static class ValidationTool
    {
        /// <summary>
        ///  Generic validation tool for any object
        /// </summary>
        /// <param name="validator"></param>
        /// <param name="entity"></param>
        public static void Validate(IValidator validator, object entity)
        {
            var context = new ValidationContext<object>(entity);
            var result = validator.Validate(context);
            if (!result.IsValid)
                throw new ValidationException(result.Errors);
        }
    }
}
