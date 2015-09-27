/// <reference path="../../typings/tsd.d.ts" />

import {TodoService} from '../services/todoService';
import {Todo} from '../models/todo';

export class HomeCtrl
{
    todo: Todo;
    private todoService: TodoService;
    private location: ng.ILocationService;
    scope: ng.IScope;

    static $inject = ['$scope', '$stateParams', '$location', 'todoService'];

    constructor($scope: ng.IScope, $stateParams, $location, service: TodoService)
    {
        this.scope = $scope;
        this.todoService = service;
        this.location = $location;   
        this.todo = new Todo();        
    }

    public onInit() : void {
        this.getTodoList();
    }

    public getTodoList(): void
    {
        var self = this;
        this.todoService.getTodos().then((response) =>
        {
            this.todo = response[0];
            self.scope.$apply(() => self.todo = response[0]);
        });
    }

    public viewDetails(id: string)
    {
        this.location.path('/todo/details/' + id);
    }
}

