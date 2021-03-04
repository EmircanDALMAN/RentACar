using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RentACar.Core.Utilities.Result;

namespace RentACar.Core.Utilities.Business
{
    /// <summary>
    /// General Business Rules Validator 
    /// </summary>
    public static class BusinessRules
    {
        public static IResult Run(params IResult[] logics)
        {
            return logics.FirstOrDefault(logic => !logic.IsSuccess);
        }
    }
}
