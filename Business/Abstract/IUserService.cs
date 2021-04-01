using Core.Utilities.Results;
using System.Collections.Generic;
using Core.Entities.Concrete;
using Entities.DTOs;

namespace Business.Abstract
{
    public interface IUserService
    {
        IResult Add(User user);
        IResult Update(User user);
        IResult UpdateForAuthorized(UserUpdateForAuthorizedDto userUpdateForAuthorized);
        IResult Delete(User user);
        IDataResult<List<User>> GetAll();
        IDataResult<User> GetById(int userId);
        IDataResult<User> GetLastRegisterUser();
        IDataResult<List<OperationClaim>> GetClaims(int id);
        IDataResult<User> GetByMail(string email);
        IDataResult<UserFindeksReturnDto> GetUserFindeks(UserFindeksDto userFindeksDto);
        IDataResult<User> GetMostRentedUser();
    }
}
