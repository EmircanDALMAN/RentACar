using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReCapProject.Business.Abstract;
using ReCapProject.Entities.Concrete;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarImagesController : ControllerBase
    {
        private ICarImageService _carImageService;

        public CarImagesController(ICarImageService carImageService)
        {
            _carImageService = carImageService;
        }

        [HttpPost("add")]
        public IActionResult Add(CarImage carImage)
        {
            _carImageService.Add(carImage);
            return Ok();
        }

        [HttpPost("delete")]
        public IActionResult Delete(CarImage carImage)
        {
            _carImageService.Delete(carImage);
            return Ok();
        }
        [HttpPost("update")]
        public IActionResult Update(CarImage carImage)
        {
            _carImageService.Update(carImage);
            return Ok();
        }

        [HttpGet("getcarimage")]
        public IActionResult GetById( int carImageId)
        {
            _carImageService.GetById(carImageId);
            return Ok();
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            _carImageService.GetAll();
            return Ok();
        }

        [HttpGet("getallbycarid")]
        public IActionResult GetAllByCarId(int carId)
        {
            _carImageService.GetPhotosByCarId(carId);
            return Ok();
        }
    }
}
