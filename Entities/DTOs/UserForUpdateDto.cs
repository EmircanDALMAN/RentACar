using Core.Entities.Concrete;

namespace Entities.DTOs
{
    public class UserForUpdateDto
    {
        public User User { get; set; }
        public string Password { get; set; }
    }
}