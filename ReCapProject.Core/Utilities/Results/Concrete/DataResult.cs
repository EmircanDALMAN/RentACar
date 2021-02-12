using System;
using System.Collections.Generic;
using System.Text;
using ReCapProject.Core.Utilities.Results.Abstract;

namespace ReCapProject.Core.Utilities.Results.Concrete
{
    public class DataResult<T> : Result, IDataResult<T>
    {
        public DataResult(bool success, string message, T data) : base(success, message)
        {
            Data = data;
        }

        public DataResult(bool success, T data) : base(success)
        {
            Data = data;
        }

        public T Data { get; }
    }
}
