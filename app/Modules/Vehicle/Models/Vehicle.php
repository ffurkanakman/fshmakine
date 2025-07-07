<?php

namespace App\Modules\Vehicle\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    protected $table = 'vehicles';

    protected $fillable = [
        'brand_id',
        'model',
        'type',
        'product',
        'cover_image',
        'slug',
        'description',

        // Teknik özellikler
        'guc_tipi',
        'nominal_kapasite',
        'yuk_merkezi',
        'servis_agirligi',
        'yuk_tekerlegi',
        'tahrik_tekerlegi',
        'tekerlek_sayisi',
        'direk_kapali_yuksekligi',
        'serbest_kaldirma_yuksekligi',
        'kaldirma_yuksekligi',
        'uzatilmis_direk_yuksekligi',
        'bas_ustu_koruma_yuksekligi',
        'koltuk_yuksekligi',
        'toplam_uzunluk',
        'catal_yuzune_kadar_uzunluk',
        'toplam_genislik',
        'catal_boyutu',
        'palet_icin_koridor_genisligi',
        'donus_yaricapi',
        'surus_hizi',
        'kaldirma_hizi',
        'fren_tipi',
        'surus_motoru',
        'kaldirma_motoru',
        'aku_voltaj_kapasite',
        'direksiyon_sistemi'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function gallery(): HasMany
    {
        return $this->hasMany(VehicleImage::class);
    }

    public function specifications(): HasMany
    {
        return $this->hasMany(VehicleSpecification::class);
    }

    public function brand()
    {
        return $this->belongsTo(VehicleBrand::class, 'brand_id');
    }
}
