<?php
namespace maversandVuePlugin\Providers;

use Plenty\Plugin\ServiceProvider;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\Templates\Twig;
use Plenty\Modules\Webshop\Template\Providers\TemplateServiceProvider;
use Plenty\Modules\Webshop\ItemSearch\Helpers\ResultFieldTemplate;
use IO\Helper\TemplateContainer;
use IO\Extensions\Functions\Partial;
use IO\Helper\ResourceContainer;

/**
 * Class  ServiceProvider
 * @package  maversandVuePlugin\Providers
 */

class maversandVuePluginServiceProvider extends TemplateServiceProvider
{
    const PRIORITY = 0;

    public function boot(Twig $twig, Dispatcher $dispatcher)
    {
        $dispatcher->listen('IO.init.templates', function (Partial $partial) {
            $partial->set('head', 'maversandVuePlugin::PageDesign.Partials.Head');
            $partial->set('header', 'maversandVuePlugin::PageDesign.Partials.Header.Header');
            $partial->set('page-design', 'maversandVuePlugin::PageDesign.PageDesign');
            $partial->set('footer', 'maversandVuePlugin::PageDesign.Partials.Footer');
            return false;
        }, 0);

        // Override Homepage
        $dispatcher->listen('IO.tpl.home', function (TemplateContainer $container) {
            $container->setTemplate('maversandVuePlugin::Homepage.Homepage');
            return false;
        }, 0);


        // Override Basket
        $dispatcher->listen('IO.tpl.basket', function (TemplateContainer $container) {
            $container->setTemplate('maversandVuePlugin::Basket.Basket');
            return false;
        }, 0);

        // Override Category View
        $dispatcher->listen('IO.tpl.category.item', function (TemplateContainer $container) {
            $container->setTemplate('maversandVuePlugin::Category.Item.CategoryItem');
            return false;
        }, 0);

        $dispatcher->listen('IO.tpl.my-account', function (TemplateContainer $container) {
            $container->setTemplate('maversandVuePlugin::MyAccount.MyAccountView');
            return false;
        }, 0);

        $container = pluginApp(ResultFieldTemplate::class);
        $container->setTemplate(ResultFieldTemplate::TEMPLATE_LIST_ITEM, 'maversandVuePlugin::ResultFields.ListItem');



    }
}