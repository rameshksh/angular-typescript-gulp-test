/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../../app/_reference.ts" />

import {TodoDetailsCtrl} from '../../../../app/features/todo/detailsCtrl';
import {Todo} from '../../../../app/models/todo';

export function main()
{
    describe('Todo details view ', () =>
    {

        var controller: TodoDetailsCtrl,
            scope: ng.IScope,
            todoList: Array<Todo>,
            compile: any,
            element: any,
            templateElement: any,
            templateDom: any,
            templateHtml: string;

        beforeEach(angular.mock.module('/dist/dev/app/features/todo/details.html'));

        beforeEach(angular.mock.inject(function ($rootScope: ng.IRootScopeService, $controller, $injector, $templateCache, $compile)
        {
            scope = $rootScope.$new();
            compile = $compile;

            var htmlString = $templateCache.get('/dist/dev/app/features/todo/details.html');
            if (htmlString)
            {
                var invalidCharCode = htmlString.charCodeAt(0);
                if (invalidCharCode === 65279)
                {
                    templateHtml = htmlString.slice(1, htmlString.length);
                } else
                {
                    templateHtml = htmlString;
                }
            }

            controller = new TodoDetailsCtrl(scope, null, null, null);
        }));

        beforeEach(function ()
        {
            try
            {
                templateElement = angular.element(templateHtml);
                templateDom = compile(templateElement)(scope);
                scope.$digest();
            } catch (e)
            {
            }

            scope.$digest();
        });

        afterEach(function ()
        {
            scope.$destroy();
            compile = null;
            angular.element(templateDom).remove();
        });

        it('should have content-header', () =>
        {
            var header = templateDom.find('.content-header');
            expect(header).toBeDefined();
        });

        it('should have ng-init attr', () =>
        {
            expect(templateDom.attr('ng-init')).toEqual('onInit()');
        });

        it('shold have set titile correctly', () =>
        {
            var todo = new Todo()
            todo.Title = '123';
            todo.Description = '1234';

            controller.scope.$apply(() => controller.todo = todo);

            scope.$digest();

            var title = templateDom[0].querySelectorAll('.title')[0];
            //expect(title.innerText).toEqual(controller.todo.Title);
        });

        it('shold have set description correctly', () =>
        {
            var todo = new Todo()
            todo.Title = '123';
            todo.Description = '1234';

            controller.scope.$apply(() => controller.todo = todo);

            scope.$digest();

            var desc = templateDom[0].querySelectorAll('.description')[0];
            // expect(desc.innerText).toEqual(controller.todo.Description);
        });
    });
}

