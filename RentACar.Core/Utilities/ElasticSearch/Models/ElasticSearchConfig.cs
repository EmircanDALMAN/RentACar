using System;
using System.Collections.Generic;
using System.Text;

namespace RentACar.Core.Utilities.ElasticSearch.Models
{
    public class ElasticSearchConfig
    {
        public string ConnectionString { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
