<?php

namespace App\Modules\SalesOffer\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SalesOfferNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->subject('Yeni SalesOffer Bildirimi')
                    ->view('modules.SalesOffer.emails.notification')
                    ->with(['data' => $this->data]);
    }
}