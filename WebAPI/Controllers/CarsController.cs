using System.Threading;
using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _carService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("lastaddedcar")]
        public IActionResult GetLastAddedCar()
        {
            var result = _carService.GetLastAddedCar();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("getnowrented")]
        public IActionResult GetNowRentedCars()
        {
            var result = _carService.GetNowRentedCars();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("getnowrentedcount")]
        public IActionResult GetNowRentedCarsCount()
        {
            var result = _carService.GetNowRentedCars();
            if (result.Success)
            {
                return Ok(result.Data.Count);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbringnewest")]
        public IActionResult GetBringNewestCar()
        {
            var result = _carService.GetBringNewestCar();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("id")]
        public IActionResult GetById(int id)
        {
            var result = _carService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("CarsByBrandAndColor")]
        public IActionResult CarsByBrandAndColor(int brandId, int colorId)
        {
            var result = _carService.GetCarDetailsByBrandAndColor(brandId, colorId);
            if (result.Success) return Ok(result);
            return BadRequest(result);

        }
        [HttpGet("count")]
        public IActionResult GetAllCarsCount()
        {
            var result = _carService.GetAll();
            if (result.Success)
            {
                return Ok(result.Data.Count);
            }

            return BadRequest(result.Message);
        }

        [HttpGet("mostrented")]
        public IActionResult GetMostRentedCar()
        {
            var result = _carService.GetMostRentedCar();
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("details")]
        public IActionResult GetCarDetails()
        {
            var result = _carService.GetCarDetails();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("detailsbyid")]
        public IActionResult GetCarDetailsById(int carId)
        {
            var result = _carService.GetCarDetailsById(carId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("add")]
        public IActionResult Add(Car car)
        {
            var result = _carService.Add(car);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("delete")]
        public IActionResult Delete(Car car)
        {
            var result = _carService.Delete(car);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public IActionResult Update(Car car)
        {
            var result = _carService.Update(car);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("detailsbycolor")]
        public IActionResult GetCarsByColor(int id)
        {
            var result = _carService.GetCarsDetailByColorId(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("detailsbybrand")]
        public IActionResult GetCarsByBrand(int id)
        {

            var result = _carService.GetCarsDetailByBrandId(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        //[HttpGet("getbrandandcolor")]
        //public IActionResult GetCarBrandandColor(int brandId,int colorId)
        //{
        //    //Thread.Sleep(5000);
        //    var result = _carService.GetCarBrandandColor(brandId,colorId);
        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }
        //    return BadRequest(result);
        //}

        //[HttpGet("detailsbymodelyear")]
        //public IActionResult GetCarByModelYear(int min, int max)
        //{
        //    var result = _carService.GetCarDetails(m => m.ModelYear >= min && m.ModelYear <= max);
        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }
        //    return BadRequest(result);
        //}
    }
}