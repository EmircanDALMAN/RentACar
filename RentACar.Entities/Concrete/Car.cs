using System.Collections.Generic;
using System.Text.Json.Serialization;
using RentACar.Core.Entities;
using RentACar.Entities.Attributes;

namespace RentACar.Entities.Concrete
{
    public class Car:IEntity
    {
        public virtual int Id { get; set; }
        public virtual int BrandId { get; set; }
        public virtual int ColorId { get; set; }
        public virtual int ModelYear { get; set; }
        public virtual int DailyPrice { get; set; }
        public virtual string Description { get; set; }

        //Relations
        [SkipProperty]
        [JsonIgnore]
        public virtual Brand  Brand { get; set; }
        [SkipProperty]
        [JsonIgnore]
        public virtual Color Color { get; set; }
    }
}
