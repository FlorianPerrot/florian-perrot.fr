<?php

require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();
$app['debug'] = true;
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new Silex\Provider\TwigServiceProvider(), array('twig.path' => __DIR__.'/views',));

$app['twig'] = $app->share($app->extend('twig', function($twig, $app) {
    $twig->addFunction(new \Twig_SimpleFunction('asset', function ($asset) {
		// Hors-ligne

        return sprintf('/florian-perrot/%s', ltrim($asset, '/'));
		// En Ligne
        //return sprintf('http://www.florian-perrot.fr/%s', ltrim($asset, '/'));
    }));
    return $twig;
}));

ob_start( 'ob_gzhandler' );

$app->get('', function() use ($app) {
	$age = (int) ((time() - strtotime("04/07/1993")) / 3600 / 24 / 365);
	return $app['twig']->render('cv_chrome.twig',array('age'=>$age));
})
->bind('homepage');

$app->get('cv/', function() use ($app) {
	$age = (int) ((time() - strtotime("04/07/1993")) / 3600 / 24 / 365);
	return $app['twig']->render('cv_chrome.twig',array('age'=>$age));
})
->bind('cv');

$app->get('new/', function() use ($app) {
    $age = (int) ((time() - strtotime("04/07/1993")) / 3600 / 24 / 365);
    return $app['twig']->render('base.twig',array('age'=>$age));
})
    ->bind('cv');


$app->run();
