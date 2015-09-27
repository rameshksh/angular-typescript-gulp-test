/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../../app/_reference.ts" />

import {TodoIndexCtrl} from '../../../../app/features/todo/indexCtrl';
import {Services} from '../../../../app/common/services';
import {TodoService} from '../../../../app/services/todoService';
import {Todo} from '../../../../app/models/todo';

export function main() {
    describe('Todo index controller:', () => {

        var controller: TodoIndexCtrl;
        var todo: Todo;
        var scope: any;
        var stateParams: any;
        var todoService: TodoService;
        var location: ng.ILocationService;
        var todos: Array<Todo>;
        var getTodosPromise: Promise<Array<Todo>>;
        var addTodosPromise: Promise<boolean>;
        var removeTodosPromise: Promise<boolean>;

        beforeEach(function () {
            todos = new Array<Todo>();

            todo = new Todo();
            todo.Title = '123';
            todo.Description = '123';

            todos.push(todo);

            new Services();

            angular.mock.module("ngTodo.services");

        });

        beforeEach(angular.mock.inject(function ($rootScope: ng.IRootScopeService, _$location_: ng.ILocationService, $controller, $injector) {
            scope = <any>$rootScope.$new();
            stateParams = { id: '...' };
            todoService = $injector.get('todoService');
            location = _$location_;

            getTodosPromise = new Promise<Array<Todo>>(function (resolve, reject) { resolve(todos) });
            addTodosPromise = new Promise<boolean>(function (resolve, reject) { resolve(true) });
            removeTodosPromise = new Promise<boolean>(function (resolve, reject) { resolve(true) });
            
            //spyOn(todoService, 'getTodos').and.callFake(() => {
            //    return getTodosPromise;
            //});
                        
            spyOn(todoService, "getTodos").and.returnValue(getTodosPromise);
            spyOn(todoService, "addTodo").and.returnValue(addTodosPromise);
            spyOn(todoService, "removeTodo").and.returnValue(removeTodosPromise);

            controller = new TodoIndexCtrl(scope, stateParams, location, todoService);

        }));

        afterEach(function ()
        {            
            scope.$destroy();
        });

        describe('should initialize', () => {
            it("todoService correctly", () => {
                expect(todoService).toBeDefined();
            });

            it("location service correctly", () => {
                expect(location).toBeDefined();
            });

            it("scope service correctly", () => {
                expect(scope).toBeDefined();
            });

            it('value of todos with empty array', () => {
                expect(controller.todos.length).toEqual(0);
            });

            it('default value of todo on initialization of view', () =>
            {
                controller.onInit();
                scope.$digest();
                getTodosPromise.then(function () {
                    expect(controller.todos.length).toEqual(todos.length);
                });
            });           
        });     

        describe('get todos', () =>
        {

            it('should set with specific value when called ', () =>
            {
                controller.getTodoList();
                scope.$digest();
                getTodosPromise.then(function ()
                {
                    expect(controller.todo).toBe(todos[0]);
                });
            });

            it('should have called getTodos service method', () =>
            {
                controller.getTodoList();
                scope.$digest();
                expect(todoService.getTodos).toHaveBeenCalled();
            });
        });
        

        describe('add todos', () => {                 

            it('should get model values from scope', () => {               
                scope.todo = todo;
                scope.$digest();
                controller.addTodo();
                expect(scope.todo.Title).toEqual(todo.Title);
            });

            it('should call addTodo if todo has valid data ', () => {
                scope.todo = todo;
                scope.$digest();
                controller.addTodo();
                expect(todoService.addTodo).toHaveBeenCalled();
            });

           
        });

        describe('remove todos', () =>
        {
            beforeEach(() =>
            {
                controller.removeTodo("abc");
                scope.$digest();
            });

            it('should call removeTodo if id passed as params', () =>
            {  
                removeTodosPromise.then(function (response)
                {
                    expect(response).toEqual(true);
                });
            });
        });
    });
}

