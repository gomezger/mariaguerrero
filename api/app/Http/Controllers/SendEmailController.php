<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Response\Response;
use Illuminate\Support\Facades\Mail;

class SendEmailController extends Controller
{
    protected $to;
    protected $data;

    public function __construct(){
        $this->to = 'info@mariaguerrerodeco.com	';
    }


    public function contact(Request $request){

        try{
            //tomar datos
            $this->data = $request->json()->all();
            
            Mail::send('emails.contact', $this->data, function($message){
                $message->from($this->data['from'], $this->data['name']);
                $message->to($this->to)->subject($this->data['subject']);            
            });

            return Response::success('Correo enviado','email',$this->data);
        
        }catch(\Exception $e){
            return Response::error(400,'Correo no enviado',[$e->getMessage(),'El correo no se envió']);            
        }

    }

    public function budget(Request $request){

        try{
            //tomar datos
            $this->data = $request->json()->all();
            
            Mail::send('emails.budget', $this->data, function($message){
                $message->from($this->data['from'], $this->data['name']);
                $message->to($this->to)->subject("Presupuesto (web)");            
            });

            return Response::success('Correo enviado','email',$this->data);
        
        }catch(\Exception $e){
            return Response::error(400,'Correo no enviado',[$e->getMessage(),'El correo no se envió']);            
        }

    }
}
