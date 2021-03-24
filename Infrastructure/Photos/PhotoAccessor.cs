using System;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            if (file.Length > 0) {
                await using var stream = file.OpenReadStream();
                var uploadParmas = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(520).Width(520).Crop("fill")
                };

                var result = await _cloudinary.UploadAsync(uploadParmas);

                if (result.Error != null)
                {
                    throw new Exception(result.Error.Message);
                }

                return new PhotoUploadResult
                {
                    PublicId = result.PublicId,
                    Url = result.SecureUrl.ToString()  // secureUrl: https
                };
            }

            return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}