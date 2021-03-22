using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace Core.Utilities.FileHelper
{
    public class FileHelper
    {
        private static string _wwwRoot = "wwwroot";
        
        public static string SaveImageFile(string fileName,IFormFile extension)
        {
            string imageExtension = Path.GetExtension(extension.FileName); 
            string newImageName = string.Format("{0:D}{1}", Guid.NewGuid(), imageExtension);
            string imageFile = Path.Combine(_wwwRoot, fileName);
            string fullImagePath = Path.Combine(imageFile, newImageName); 
            string webImagePath = string.Format("/"+ fileName + "/{0}", newImageName);
            if(!Directory.Exists(imageFile))
                Directory.CreateDirectory(imageFile);

            using (var fileStream = File.Create(fullImagePath))
            {
                extension.CopyTo(fileStream);
                fileStream.Flush();
            }
            return webImagePath;
        }

        public static bool DeleteImageFile(string fileName)
        {
            var fullPath = Path.Combine(fileName);
            if (!File.Exists(_wwwRoot + fullPath)) return false;
            File.Delete(_wwwRoot + fullPath);
            return true;
        }
    }
}