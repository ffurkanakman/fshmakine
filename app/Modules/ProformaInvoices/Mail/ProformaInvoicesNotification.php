<?php

namespace App\Modules\ProformaInvoices\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProformaInvoicesNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->subject('Yeni ProformaInvoices Bildirimi')
                    ->view('modules.ProformaInvoices.emails.notification')
                    ->with(['data' => $this->data]);
    }
}