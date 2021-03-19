using Core.Entities.Concrete;
using Entities.Concrete;

namespace Entities.DTOs
{
    public class RentalPaymentDto
    {
        public Rental Rental { get; set; }
        public FakeCreditCardModel FakeCreditCardModel { get; set; }
    }
}