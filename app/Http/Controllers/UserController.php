<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class UserController extends Controller
{
	public function index()
	{
		return Auth::user();
	}

	public function checkAndMarkOnboarded()
	{
		$user = Auth::user();
		if (!$user) {
			return false;
		}

		$userEntry = User::where('codpes', $user->codpes)->first();

		$onboarded = $userEntry->onboarded_at !== null;
		if(!$onboarded){
			$userEntry->onboarded_at = true;
			$userEntry->onboarded_at = now();
			$userEntry->save();
		}

		return $onboarded;
	}

	public function checkAndMarkVersionUpdate()
	{
		$user = Auth::user();
		$versionInfo = $this->getVersionInfo();
		$currentVersion = $versionInfo['version'];
		
		if (!$user) {
			return [
				'shouldShowReleaseNotice' => false,
				'versionInfo' => $versionInfo
			];
		}

		$userEntry = User::where('codpes', $user->codpes)->first();
		$lastSeenVersion = $userEntry->last_seen_version;

		$shouldShowReleaseNotice = is_null($lastSeenVersion) || $lastSeenVersion !== $currentVersion;

		if($shouldShowReleaseNotice){
			$userEntry->last_seen_version = $currentVersion;
			$userEntry->save();
		}

		return [
			'shouldShowReleaseNotice' => $shouldShowReleaseNotice,
			'versionInfo' => $versionInfo
		];
	}

	private function getVersionInfo()
	{
		$versionFile = base_path('version.json');
		
		if (!file_exists($versionFile)) {
			return [
				'version' => '-1.0.0',
				'description' => 'Não foi possível carregar informações da versão atual',
				'releaseDate' => null,
				'changelog' => []
			];
		}
		
		$versionContent = file_get_contents($versionFile);
		return json_decode($versionContent, true);
	}
}
