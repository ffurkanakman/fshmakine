export const ROUTES = {

    AUTH: {
        LOGIN: "/Kullanici/Giris",
        REGISTER: "/Kullanici/KayitOl",
        FORGOT_PASSWORD: "/Kullanici/SifremiUnuttum",
        RESET_PASSWORD: "/Kullanici/SifreyiSifirla",
        VERIFY_EMAIL: "/Kullanici/MailAktiflestir",
        TWO_FACTOR: "/Kullanici/2Faktor",
    },
    UI: {
        USER: "/Kullanici",
        LANDING: "/",
        LISTING: "/Ilanlar",
        DETAIL: "/Detay",
        ERROR : '/Hata',
        PROJECTS: '/Projeler',
        NEW_PROJECT: '/YeniProje',
        EDIT_PROJECT: '/ProjeGuncelle/:id',
        VIEW_PROJECT: '/ProjeGoruntule/:id',
        USERS: '/Kullanicilar',
        NEW_USER: '/YeniKullanici',
        VIEW_USER: '/KullaniciGoruntule/:id',
        EDIT_USER: '/KullaniciDuzenle/:id',
        CLIENTS: '/Musteriler',
        NEW_CLIENT: '/YeniMusteri',
        VIEW_CLIENT: '/MusteriGoruntule/:id',
        EDIT_CLIENT: '/MusteriDuzenle/:id',
        TEKLIFSAYFASI:'/Teklif',
    }
}
