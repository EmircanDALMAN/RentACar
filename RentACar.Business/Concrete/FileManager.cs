using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using RentACar.Business.Abstract;
using RentACar.Business.Constants;
using RentACar.Core.Utilities.Result;
using RentACar.Entities.Concrete;

namespace RentACar.Business.Concrete
{
    /// <summary>
    /// General File Manager for storing Images
    /// </summary>
    public class FileManager:IFileProcess
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _fileDirectory;

        public FileManager(IHostingEnvironment environment)
        {
            this._environment = environment;
            _fileDirectory = environment.ContentRootPath + "/images/";
        }
        /// <summary>
        /// Upload to server's assets folder
        /// </summary>
        /// <param name="fileName">Guid File Name</param>
        /// <param name="file">Image</param>
        /// <returns></returns>
        public async Task<IResult> Upload(string fileName, IFormFile file)
        {
            await using (var fileStream = new FileStream(Path.Combine(_fileDirectory, fileName.ToString() + ".png"), FileMode.Create, FileAccess.Write))
            {
                 await file.CopyToAsync(fileStream);
            }
            return new SuccessResult(Messages.Add_Message(nameof(CarImage)));
        }
        /// <summary>
        /// Delete file from given path
        /// </summary>
        /// <param name="path">Guid file path</param>
        /// <returns></returns>
        public IResult Delete(string path)
        {
            var roadPath = Path.Combine(_fileDirectory, path+ ".png");
            if (File.Exists(roadPath))
            {
                File.Delete(roadPath);
            }
            return new SuccessResult();
        }
    }
}
