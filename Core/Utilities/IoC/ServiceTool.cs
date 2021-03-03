using System;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Utilities.IoC
{
    public static class ServiceTool
    {
        public static IServiceProvider ServiceProvider { get; private set; }

        public static IServiceCollection Create(IServiceCollection serviceCollections)
        {
            ServiceProvider = serviceCollections.BuildServiceProvider();
            return serviceCollections;
        }
    }
}