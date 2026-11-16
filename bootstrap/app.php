<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Illuminate\Database\QueryException $exception, \Illuminate\Http\Request $request) {
            $service = match ($exception->getConnectionName()) {
                'replicado' => 'Replicado USP',
                config('database.default') => 'banco de dados local',
                default => 'banco de dados',
            };
            $message = "Não foi possível acessar o {$service}. Tente novamente em alguns minutos.";

            if ($request->expectsJson()) {
                return response()->json(['message' => $message, 'service' => $service], 503);
            }

            return response()->view('errors.database', compact('message'), 503);
        });
    })->create();
