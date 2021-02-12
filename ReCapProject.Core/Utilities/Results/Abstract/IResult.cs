using System;
using System.Collections.Generic;
using System.Text;

namespace ReCapProject.Core.Utilities.Results.Abstract
{
    public interface IResult
    {

        bool Success { get; }
        string Message { get; }
    }
}
