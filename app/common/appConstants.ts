export class AppConstants
{
    public static get BOOK_SHELF_NONE(): string { return "None"; }
    public static get BOOK_SHELF_FULL(): string { return "Full"; } 

    public static get HttpVerb(): Object
    {
        return { GET: "GET", POST: "POST", DELETE: "DELETE", PUT: "PUT" };
    }
    public static get HttpMappings(): Array<Object>
    {
        return [{
            "name": "filterApi",
            "hostname": "localhost",
            "scheme": "http",
            "pattern": "/shopping.data/api/common/get-filters/"
        }];
    }
}