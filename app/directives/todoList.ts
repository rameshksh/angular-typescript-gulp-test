/// <reference path="../../typings/tsd.d.ts" />

import {IDirective} from 'angular';

import {TodoService} from 'services/todoService';

export class TodoList implements ng.IDirective {

    todos: Array<Object>;
    todoService: TodoService;

    static instance(): ng.IDirective {

        var service = new TodoService();

        return new TodoList(service);
    }

    templateUrl = 'templates/directives/list.html';
    restrict = 'E';
    scope = {
        filter: '='
    };
    controller: ($scope: ng.IScope) => void;
    controllerAs = 'vm';
    bindToController = true;

    constructor(service: TodoService) {
        this.todos = [];
        this.todoService = service;

        this.controller = function ($scope: ng.IScope) {
            var vm = this;
            vm.message = 'Hello';

            this.todoService.getTodos().then((response) => {
                this.todos = response;
            });
        };

    }

    getTodoList() {
        this.todos = [];

        this.todoService.getTodos().then((response) => {
            this.todos = response;
        });
    }

    getDetails(event, id) {
        //new Location().go('/todo/details/' + id);
        debugger;
    }

    removeTodo(event, id) {
        this.todoService.removeTodo(id);
        this.getTodoList();
    }
}