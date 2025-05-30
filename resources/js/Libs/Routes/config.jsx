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
        VIEW_USER: '/KullaniciGoruntule/:id',
        EDIT_USER: '/KullaniciDuzenle/:id'
    }
}
