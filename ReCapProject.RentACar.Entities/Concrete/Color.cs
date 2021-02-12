using System;
using System.Collections.Generic;
using System.Text;
using ReCapProject.Core.Entities;

namespace ReCapProject.RentACar.Entities.Concrete
{
    public class Color : IEntity 
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
