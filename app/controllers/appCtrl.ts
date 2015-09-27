/// <reference path="../../typings/tsd.d.ts" />


export class AppCtrl
{
    isHomeActiveTab: boolean;
    isAboutActiveTab: boolean;
    isTodoActiveTab: boolean;
    location: ng.ILocationService;
    scope: any;

    static $inject = ['$scope','$location'];

    public constructor($scope, $location)
    {         
        this.scope = $scope;
        this.location = $location;

        this.isHomeActiveTab = false;
        this.isAboutActiveTab = false;
        this.isTodoActiveTab = false;
    }

   public setActiveTab(): void
    {
        var url = this.location.url();

        this.isHomeActiveTab = false;
        this.isAboutActiveTab = false;
        this.isTodoActiveTab = false;

        if (url.indexOf('home') == 1)
        {
            this.isHomeActiveTab = true;

        } else if (url.indexOf('about') == 1)
        {
            this.isAboutActiveTab = true;
        } else
        {
            this.isTodoActiveTab = true;
        }
    }    
}
