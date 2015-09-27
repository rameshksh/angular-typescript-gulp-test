/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../_reference.ts" />

import {TodoService} from '../../services/todoService';
import {Todo} from '../../models/todo';

export class TodoIndexCtrl {    

    todos: Array<Todo>;
    todo: Todo;
    todoService: TodoService;
    location: ng.ILocationService;
    scope: any;

    static $inject = ['$scope','$stateParams', '$location', 'todoService'];

    constructor($scope: ng.IScope, $stateParams, $location, service: TodoService) {
        this.scope = $scope;        
        this.todoService = service;
        this.location = $location;

        this.todo = new Todo();
        this.todos = [];
    }

    getTodoList(): void
    { 
        var self = this;
                       
        this.todoService.getTodos().then((response) => {
            self.scope.$apply(() => self.todos = response);
        });
    }

    addTodo(): void {
        var newTodo = new Todo();       

        if (this.scope.todo) {

            newTodo.Title = this.scope.todo.Title;
            newTodo.Description = this.scope.todo.Description;
            newTodo.CreatedDate = new Date().toDateString();
            newTodo.ModifiedDate = new Date().toDateString();
            newTodo.DueDate = new Date().toDateString();
            newTodo.Status = true;

            if (newTodo.Title != "") {
                this.todoService.addTodo(newTodo).then((response) => {
                    if (response) {
                        this.location.path('/todos');
                    }
                });
            }
        }        
    }

    getDetails(id) : void {
        this.location.path('/todo/details/' + id);
    }

    removeTodo(id): void {
        if (id) {
            this.todoService.removeTodo(id).then((response) => {
                if (response) {
                    this.location.path('/todos');
                }
            });
        }
    }  

    public onInit() : void
    {
        this.getTodoList();
    }
}

