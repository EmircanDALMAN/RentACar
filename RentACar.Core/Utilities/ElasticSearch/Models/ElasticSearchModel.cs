using System;
using System.Collections.Generic;
using System.Text;
using Nest;

namespace RentACar.Core.Utilities.ElasticSearch.Models
{
    public class ElasticSearchModel
    {
        public Id ElasticId { get; set; }
        public string IndexName { get; set; }
    }
}
