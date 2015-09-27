/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../_reference.ts" /> 

import {AppCtrl} from '../controllers/appCtrl';
import {HomeCtrl} from '../controllers/homeCtrl';
import {AboutCtrl} from '../controllers/aboutCtrl';
import {TodoIndexCtrl} from '../features/todo/indexCtrl';
import {TodoDetailsCtrl} from '../features/todo/detailsCtrl';
import {TodoEditCtrl} from '../features/todo/editCtrl';

import {Services} from './services';

export class Controllers
{
    constructor()
    {
        new Services();

        angular.module('ngTodo.controllers', ['ngTodo.services'])
            .controller('appCtrl', AppCtrl)
            .controller('aboutCtrl', AboutCtrl)
            .controller('homeCtrl', HomeCtrl)
            .controller('todoDetailsCtrl', TodoDetailsCtrl)
            .controller('todoEditCtrl', TodoEditCtrl)
            .controller('todoIndexCtrl', TodoIndexCtrl);
    }
}

