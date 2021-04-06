using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using System;
using System.Collections.Generic;
using Business.BusinessAspects.Autofac;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Performance;
using Core.Entities.Concrete;
using Entities.DTOs;

namespace Business.Concrete
{
    public class UserManager : IUserService
    {
        private readonly IUserDal _userDal;

        public UserManager(IUserDal userDal)
        {
            _userDal = userDal;
        }

        [ValidationAspect(typeof(UserValidator))]
        [CacheRemoveAspect("IUserService.Get")]
        public IResult Add(User user)
        {
            _userDal.Add(user);
            return new SuccessResult(Messages.UserAdded);
        }
        [CacheRemoveAspect("IUserService.Get")]
        public IResult UpdateForAuthorized(UserUpdateForAuthorizedDto userUpdateForAuthorized)
        {
            var user = _userDal.Get(u => u.Id == userUpdateForAuthorized.Id);
            if (user == null)
            {
                return new ErrorResult(Messages.UserNotFound);
            }
            var updatedUser = new User
            {
                Email = userUpdateForAuthorized.Email,
                FirstName = userUpdateForAuthorized.FirstName,
                Id = userUpdateForAuthorized.Id,
                LastName = userUpdateForAuthorized.LastName,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt,
                Status = userUpdateForAuthorized.Status
            };
            _userDal.Update(updatedUser);
            return new SuccessResult(Messages.UserUpdated);
        }
        [CacheRemoveAspect("IUserService.Get")]
        public IResult Delete(User user)
        {
            _userDal.Delete(user);
            return new SuccessResult(Messages.UserDeleted);
        }
        public IDataResult<List<User>> GetAll()
        {
            return new SuccessDataResult<List<User>>(_userDal.GetAll(), Messages.UserListed);
        }
        [PerformanceAspect(5)]
        public IDataResult<User> GetById(int id)
        {
            return new SuccessDataResult<User>(_userDal.Get(b => b.Id == id));
        }
        public IDataResult<User> GetLastRegisterUser()
        {
            return new SuccessDataResult<User>(_userDal.GetLastRegisterUser());
        }
        [CacheRemoveAspect("IUserService.Get")]
        public IResult Update(User user)
        {
            _userDal.Update(user);
            return new SuccessResult(Messages.UserUpdated);
        }
        public IDataResult<List<OperationClaim>> GetClaims(int id)
        {
            return new SuccessDataResult<List<OperationClaim>>(_userDal.GetClaims(id));
        }
        public IDataResult<User> GetByMail(string email)
        {
            var user = _userDal.Get(u => u.Email == email);
            return new SuccessDataResult<User>(user);
        }
        [ValidationAspect(typeof(UserFindeksValidator))]
        public IDataResult<UserFindeksReturnDto> GetUserFindeks(UserFindeksDto userFindeksDto)
        {
            Random random = new Random();
            return new SuccessDataResult<UserFindeksReturnDto>(new UserFindeksReturnDto
            {
                UserFindeks = random.Next(1, 1900)
            });
        }
        public IDataResult<User> GetMostRentedUser()
        {
            return new SuccessDataResult<User>(_userDal.GetMostRentedUser());
        }
    }
}
