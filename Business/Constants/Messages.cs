namespace Business.Constants
{
    public static class Messages
    {
        public static string MaintenanceTime = "Sistem şuan bakımdadır.";

        public static string CarAdded = "Araç eklendi";
        public static string CarUpdated = "Araç güncellendi";
        public static string CarDeleted = "Araç silindi";
        public static string CarListed = "Araçlar listelendi";
        public static string CarPriceInvalid = "Araç günlük fiyatı için girdiğiniz değer 0 dan büyük olmalıdır.";

        public static string BrandNameInvalid = "Marka adı en az 3 karakter olmalıdır.";
        public static string BrandAdded = "Marka eklendi";
        public static string BrandUpdated = "Marka güncellendi";
        public static string BrandDeleted = "Marka silindi";
        public static string BrandListed = "Markalar listelendi";

        public static string ColorNameInvalid = "Renk adı en az 3 karakter olmalıdır.";
        public static string ColorAdded = "Renk eklendi";
        public static string ColorUpdated = "Renk güncellendi";
        public static string ColorDeleted = "Renk silindi";
        public static string ColorListed = "Renkler listelendi";

        public static string CompanyNameInvalid = "Firma adı en az 3 karakter olmalıdır.";
        public static string CustomerAdded = "Müşteri eklendi";
        public static string CustomerUpdated = "Müşteri güncellendi";
        public static string CustomerDeleted = "Müşteri silindi";
        public static string CustomerListed = "Müşteri listelendi";

        public static string RentalAdded = "Araç kiralandı";
        public static string RentalUpdated = "Kiralanan araç güncellendi";
        public static string RentalDeleted = "Kiralanan araç silindi";
        public static string RentalListed = "Kiralanan araçlar listelendi";
        public static string CarDelivered = "Araç teslim edildi";
        public static string CarDeliveredBefore = "Araç daha önce teslim edilmiş";
        public static string NoReturnDate = "Araç henüz teslim edilmemiş";

        public static string UserAdded = "Kullanıcı eklendi";
        public static string UserUpdated = "Kullanıcı güncellendi";
        public static string UserDeleted = "Kullanıcı silindi";
        public static string UserListed = "Kullanıcı listelendi";

        public static string CarImageAdded = "Araç resmi eklendi!";
        public static string CarImageUpdated = "Araç resmi güncellendi!";
        public static string CarImageDeleted = "Araç resmi silindi!";

        public static string CarDailyPriceInvalid = "Aracın günlük fiyatı sıfırdan büyük olmalı!";
        public static string CarNameInvalid = "Araç ismi geçersiz!";
        public static string CarIsntAvailable = "Araç müsait değil!";
        public static string CarImageCountExceeded = "Bir araca maksimum 5 resim eklenebilir!";
        public static string CarImageNotFound = "Araç resmi bulunamadı!";
        public static object InvalidImageFileFormat = "Resim dosya formatı hatalı!";

        public static string UserNotFound = "Kullanıcı bulunamadı";
        public static string PasswordError = "Şifre hatalı";
        public static string SuccessfulLogin = "Sisteme giriş başarılı";
        public static string UserAlreadyExists = "Bu kullanıcı zaten mevcut";
        public static string UserRegistered = "Kullanıcı başarıyla kaydedildi";
        public static string AccessTokenCreated = "Access token başarıyla oluşturuldu";

        public static string AuthorizationDenied = "Yetkiniz yok";
        public static string CarRentalSuccess = "Araç Başarıyla Kiralandı";
        public static string UserDateYearError = "Doğum Tarihi 4 Karakter Olmalıdır";
        public static string UserIdentityError = "TC Kimlik Numarası 11 Hane Olmalıdır";
        public static string UserDateYearNotEmpty = "Doğum Tarihi Alanı Boş Bırakılamaz";
        public static string UserIdentityNotEmpty = "TC Kimlik Numarası Boş Bırakılamaz";

        public static string CarNotFound = "Bu Id ' ye Sahip Araç Bulunamadı";
        public static string CustomerAlreadyExists = "Bu Kullanıcı Zaten Kayıtlı";
        public static string UserBlocked = "Kullanıcı Bloklanmış";
        public static string RentalAddedAndPaymentSuccessful = "Ödeme Başarılı. Araç Kiralandı";
    }
}