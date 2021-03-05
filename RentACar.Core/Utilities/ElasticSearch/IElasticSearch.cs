using Nest;
using System.Collections.Generic;
using System.Threading.Tasks;
using RentACar.Core.Utilities.ElasticSearch.Models;
using RentACar.Core.Utilities.Result;

namespace RentACar.Core.Utilities.ElasticSearch
{
    /*
    ElasticSearch' de Insert işleminde ilgili index'in oluşturulup oluşturulmadığı kontrol edilmelidir.
    GetIndexList() metodu ile mevcut Indexlerin listesine erişilir.Eğer index yok ise CreateNewIndexAsync()
    metodu kullanılarak index oluşturulabilinir.
    */
    public interface IElasticSearch
    {
        Task<IResult> CreateNewIndexAsync(IndexModel indexModel);
        Task<IResult> InsertAsync(ElasticSearchInsertUpdateModel model);
        Task<IResult> InsertManyAsync(string indexName, object[] items);
        IReadOnlyDictionary<IndexName, IndexState> GetIndexList();
        Task<List<ElasticSearchGetModel<T>>> GetAllSearch<T>(SearchParameters parameters) where T : class;
        Task<List<ElasticSearchGetModel<T>>> GetSearchByField<T>(SearchByFieldParameters fieldParameters) where T : class;
        Task<List<ElasticSearchGetModel<T>>> GetSearchBySimpleQueryString<T>(SearchByQueryParameters queryParameters) where T : class;
        Task<IResult> UpdateByElasticIdAsync(ElasticSearchInsertUpdateModel model);
        Task<IResult> DeleteByElasticIdAsync(ElasticSearchModel model);
    }
}
