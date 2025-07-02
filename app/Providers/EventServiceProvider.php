<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
	/**
	 * @var array<string, array<int, string>>
	 */
	protected $listen = [
		Registered::class => [
			SendEmailVerificationNotification::class,
		],
		
		\SocialiteProviders\Manager\SocialiteWasCalled::class => [
			'Uspdev\SenhaunicaSocialite\SenhaunicaExtendSocialite@handle',
		],
	];
	
	
	/**
	*@return void
	*/
	public function boot()
	{
		parent::boot();
	}
}
