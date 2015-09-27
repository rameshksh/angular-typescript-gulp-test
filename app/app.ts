/// <reference path="../typings/tsd.d.ts" />
/// <reference path="_reference.ts" />

import {Routing} from './common/routing';
import {Controllers} from './common/controllers';
import {AppCtrl } from './controllers/appCtrl';

export class App
{
    constructor()
    {
        new Controllers();

        let app = angular.module('ngTodo', ['ui.router', 'ngTodo.controllers']);

        app.run(function ($rootScope: ng.IRootScopeService,  $location : ng.ILocationService)
        {
            $rootScope.$on('$locationChangeSuccess', function ()
            {
                new AppCtrl($rootScope.$new(), $location).setActiveTab();
            });
        });

        Routing.getRoutes(app);

        angular.element(document)
            .ready(() => angular.bootstrap(document.body, [app.name]));
    }
}

new App();
