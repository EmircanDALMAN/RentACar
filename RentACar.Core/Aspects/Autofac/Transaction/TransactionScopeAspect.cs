using System;
using System.Collections.Generic;
using System.Text;
using System.Transactions;
using Castle.DynamicProxy;
using RentACar.Core.Utilities.Interceptors;

namespace RentACar.Core.Aspects.Autofac.Transaction
{
    public class TransactionScopeAspect : MethodInterception
    {
        public override void Intercept(IInvocation invocation)
        {
            using var transactionScope = new TransactionScope();
            try
            {
                invocation.Proceed();
                transactionScope.Complete();
            }
            catch (System.Exception)
            {
                transactionScope.Dispose();
                throw;
            }
        }
    }
}
