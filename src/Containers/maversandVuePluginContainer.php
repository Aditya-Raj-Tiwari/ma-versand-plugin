<?php

namespace maversandVuePlugin\Containers;

use Plenty\Plugin\Templates\Twig;

class maversandVuePluginContainer
{
    public function call(Twig $twig):string
    {
        return $twig->render('maversandVuePlugin::Content.maversandVuePlugin');
    }
} 
