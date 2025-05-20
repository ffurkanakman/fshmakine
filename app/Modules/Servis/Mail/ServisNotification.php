<?php

namespace App\Modules\Servis\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ServisNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->subject('Yeni Servis Bildirimi')
                    ->view('modules.Servis.emails.notification')
                    ->with(['data' => $this->data]);
    }
}