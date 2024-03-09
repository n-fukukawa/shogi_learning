<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;
use Throwable;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;


    protected function onSuccess(string $message = null)
    {
        session()->flash('message', [
            'status' => 'success', 
            'text' => $message ?? '保存しました',
        ]);
    }


    protected function onError(Throwable $e, string $message = null)
    {
        Log::error($e);

        session()->flash('message', [
            'status' => 'error', 
            'text' => $message ?? '保存できませんでした',
        ]);
    }
}
