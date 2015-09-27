/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../_reference.ts" /> 

import {TodoService} from '../services/todoService';

export class Services
{
    constructor()
    {
        angular.module('ngTodo.services', []).service('todoService', TodoService);
    }
}
