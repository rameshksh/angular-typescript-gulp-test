/// <reference path="../../typings/tsd.d.ts" />

import {IModule} from 'angular';

export class Routing {
    app: IModule;    

    static getRoutes(app: IModule): void {
        app.config((
            $stateProvider: ng.ui.IStateProvider,
            $urlRouterProvider: ng.ui.IUrlRouterProvider) => {


            $urlRouterProvider
                .otherwise("/home");

            // Now set up the states
            $stateProvider
                .state('home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "views/home.html",
                        controller: 'homeCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
                .state('about', {
                url: "/about",
                views: {
                    'menuContent': {
                        templateUrl: "views/about.html",
                        controller: 'aboutCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
                .state('todos', {
                url: "/todos",
                views: {
                    'menuContent': {
                        templateUrl: "features/todo/index.html",
                        controller: 'todoIndexCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
                .state('tododetails', {
                url: "/todo/details/:id",
                views: {
                    'menuContent': {
                        templateUrl: "features/todo/details.html",
                        controller: 'todoDetailsCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
                .state('todoedit', {
                url: "/todo/edit/:id",
                views: {
                    'menuContent': {
                        templateUrl: "features/todo/edit.html",
                        controller: 'todoEditCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
        });
    }
}

