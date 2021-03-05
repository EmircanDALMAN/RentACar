using System;
using System.Collections.Generic;
using System.Text;

namespace RentACar.Core.Utilities.ElasticSearch.Models
{
    public class SearchByFieldParameters : SearchParameters
    {
        public string FieldName { get; set; }
        public string Value { get; set; }
    }
}
