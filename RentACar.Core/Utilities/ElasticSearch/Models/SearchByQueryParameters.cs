using System;
using System.Collections.Generic;
using System.Text;

namespace RentACar.Core.Utilities.ElasticSearch.Models
{
    public class SearchByQueryParameters : SearchParameters
    {
        public string QueryName { get; set; }
        public string Query { get; set; }
        public string[] Fields { get; set; }
    }
}
