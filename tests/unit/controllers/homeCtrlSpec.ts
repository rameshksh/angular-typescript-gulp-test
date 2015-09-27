/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../app/_reference.ts" />

import {HomeCtrl} from '../../../app/controllers/homeCtrl';
import {Services} from '../../../app/common/services';
import {TodoService} from '../../../app/services/todoService';
import {Todo} from '../../../app/models/todo';

export function main() {
    describe('Home controller ', () => {

        var controller: HomeCtrl;
        var scope: ng.IScope;
        var stateParams: any;
        var todoService: TodoService;
        var location: ng.ILocationService;
        var todoList: Array<Todo>;
        var todosPromise: Promise<Array<Todo>>;
                
        beforeEach(function ()
        {
            todoList = new Array<Todo>();

            var todo = new Todo();
            todo.Title = '123';
            todo.Description = '123';
            todoList.push(todo);

            new Services();

           angular.mock.module("ngTodo.services"); 

        });

        beforeEach(angular.mock.inject(function ($rootScope: ng.IRootScopeService, _$location_: ng.ILocationService,  $controller, $injector) {
            scope = <any>$rootScope.$new();
            stateParams = { id: '...' };
            todoService = $injector.get('todoService');
            location = _$location_;

            todosPromise = new Promise<Array<Todo>>(function (resolve, reject) { resolve(todoList) });

            spyOn(todoService, "getTodos").and.returnValue(todosPromise);

            controller = new HomeCtrl(scope, stateParams, location, todoService);

        }));

        afterEach(function ()
        {
            controller = null;
            scope.$destroy();            
        });

        it("should initialize todoService correctly", () => {
            expect(todoService).toBeDefined();
        }); 

        it("should initialize location service correctly", () => {
            expect(location).toBeDefined();
        }); 

        it("should initialize scope service correctly", () => {
            expect(scope).toBeDefined();
        });
       
        it('should have defined value of todo', () => {
            expect(controller.todo).toBeDefined();
        });

        it('should have set default value of todo onInit call', () => { 
            controller.onInit();
                      
            expect(todoService.getTodos).toHaveBeenCalled();  
        });        
    }); 
}

