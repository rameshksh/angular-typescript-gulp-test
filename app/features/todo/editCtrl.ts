/// <reference path="../../../typings/tsd.d.ts" />

import {TodoService} from 'services/todoService';
import {Todo} from '../../models/todo';



export class TodoEditCtrl {
    todo: Todo;
    stateParams: any;
    todoService: TodoService;
    scope: ng.IScope;
    location: ng.ILocationService;

    static $inject = ['$scope', '$stateParams', '$location', 'todoService'];

    constructor($scope: ng.IScope, $stateParams, $location, service: TodoService) {

        this.scope = $scope;
        this.stateParams = $stateParams;
        this.todoService = service;
        this.location = $location;

        this.todo = new Todo();
    }

    public getTodoDetails(): void
    {
        var self = this;

        var id = this.stateParams.id;

        this.todoService.getTodoDetail(id).then((response) => {
            self.scope.$apply(() => self.todo = response);
        });
    }

    private formatDateTime(date) : string {
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    public saveTodo(): void
    {
        var self = this;

        this.todoService.updateTodo(self.todo).then((response) => {
            this.location.path('todo/details/' + self.todo.Id);
        });
    }

    public resetForm()
    {
        var self = this;
        self.scope.$apply(() => self.todo = new Todo());
    }

    public onInit(): void
    {
        this.getTodoDetails();
    }
}

