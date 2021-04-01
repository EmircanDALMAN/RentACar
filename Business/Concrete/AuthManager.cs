using Business.Abstract;
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Core.Entities.Concrete;
using Core.Utilities.Business;
using Core.Utilities.Results;
using Core.Utilities.Security.Hashing;
using Core.Utilities.Security.JWT;
using Entities.DTOs;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {
        private readonly IUserService _userService;
        private readonly ITokenHelper _tokenHelper;

        public AuthManager(IUserService userService, ITokenHelper tokenHelper)
        {
            _userService = userService;
            _tokenHelper = tokenHelper;
        }

        [CacheRemoveAspect("IUserService.Get")]
        public IDataResult<User> Register(UserForRegisterDto userForRegisterDto, string password)
        {
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);
            var user = new User
            {
                Email = userForRegisterDto.Email,
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Status = true
            };
            _userService.Add(user);
            return new SuccessDataResult<User>(user, Messages.UserRegistered);
        }

        public IDataResult<User> Login(UserForLoginDto userForLoginDto)
        {
            var result = BusinessRules.Run
            (CheckUserExistsByEmail(userForLoginDto.Email),
                CheckUserIsBlocked(userForLoginDto.Email));
            if (result != null) return new ErrorDataResult<User>(result.Message);

            var user = _userService.GetByMail(userForLoginDto.Email).Data;
            if (!HashingHelper.VerifyPasswordHash(userForLoginDto.Password, user.PasswordHash, user.PasswordSalt))
            {
                return new ErrorDataResult<User>(Messages.PasswordError);
            }

            return new SuccessDataResult<User>(user, Messages.SuccessfulLogin);
        }

        private IResult CheckUserExistsByEmail(string email)
        {
            var user = _userService.GetByMail(email).Data;
            if (user != null)
            {
                return new SuccessResult();
            }
            return new ErrorResult(Messages.UserNotFound);
        }
        private IResult CheckUserIsBlocked(string email)
        {
            var user = _userService.GetByMail(email).Data;
            if (user.Status == false)
            {
                return new ErrorResult(Messages.UserBlocked);
            }
            return new SuccessResult();
        }
        public IResult UserExists(string email)
        {
            if (_userService.GetByMail(email).Data != null)
            {
                return new ErrorResult(Messages.UserAlreadyExists);
            }
            return new SuccessResult();
        }

        [CacheRemoveAspect("IUserService.Get")]
        public IResult Update(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);
            var updatedUser = new User
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Status = user.Status,
            };
            _userService.Update(updatedUser);
            return new SuccessResult(Messages.UserUpdated);
        }

        public IDataResult<AccessToken> CreateAccessToken(User user)
        {
            var claims = _userService.GetClaims(user.Id).Data;
            var accessToken = _tokenHelper.CreateToken(user, claims);
            return new SuccessDataResult<AccessToken>(accessToken);
        }
    }
}