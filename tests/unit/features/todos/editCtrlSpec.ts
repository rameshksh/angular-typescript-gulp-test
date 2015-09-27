/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../../app/_reference.ts" />

import {TodoEditCtrl} from '../../../../app/features/todo/editCtrl';
import {Services} from '../../../../app/common/services';
import {TodoService} from '../../../../app/services/todoService';
import {Todo} from '../../../../app/models/todo';

export function main()
{
    describe('Todo edit controller:', () =>
    {
        var controller: TodoEditCtrl;
        var todo: Todo;
        var scope: any;
        var stateParams: any;
        var todoService: TodoService;
        var location: ng.ILocationService;
        var getTodoDetailsPromise: Promise<Todo>;

        beforeEach(function ()
        {
            todo = new Todo();
            todo.Title = '123';
            todo.Description = '123';

            new Services();

            angular.mock.module("ngTodo.services");

        });

        beforeEach(angular.mock.inject(function ($rootScope: ng.IRootScopeService, _$location_: ng.ILocationService, $controller, $injector)
        {
            scope = <any>$rootScope.$new();
            stateParams = { id: '...' };
            todoService = $injector.get('todoService');
            location = _$location_;

            getTodoDetailsPromise = new Promise<Todo>(function (resolve, reject) { resolve(todo) });           
            
            //spyOn(todoService, 'getTodos').and.callFake(() => {
            //    return getTodosPromise;
            //});
                        
            spyOn(todoService, "getTodoDetail").and.returnValue(getTodoDetailsPromise);

            controller = new TodoEditCtrl(scope, stateParams, location, todoService);

        }));

        afterEach(function ()
        {           
            scope.$destroy();
        });

        describe('should initialize', () =>
        {
            it("todoService correctly", () =>
            {
                expect(todoService).toBeDefined();
            });

            it("location service correctly", () =>
            {
                expect(location).toBeDefined();
            });

            it("scope service correctly", () =>
            {
                expect(scope).toBeDefined();
            });

            it('value of todo with empty object', () =>
            {
                expect(controller.todo).toBeDefined();
            });

            it('value of todo with object when onInit called', () =>
            {
                controller.onInit();
                scope.$digest();

                getTodoDetailsPromise.then(function ()
                {
                    expect(controller.todo).toEqual(todo);
                });
            });  

           
        });

        describe('get todo details', () =>
        {
            it('should set with specific value when called ', () =>
            {
                controller.getTodoDetails();
                scope.$digest();
                getTodoDetailsPromise.then(function ()
                {
                    expect(controller.todo).toBe(todo);
                });
            });

            it('should have called getTodoDetail service method', () =>
            {
                controller.getTodoDetails();
                scope.$digest();
                expect(todoService.getTodoDetail).toHaveBeenCalled();
            });
        });
    });
}

