export namespace main {
	
	export class SaveDialogOptiosWrapper {
	    Title: string;
	    FileType: string;
	    DefaultFilename: string;
	
	    static createFrom(source: any = {}) {
	        return new SaveDialogOptiosWrapper(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Title = source["Title"];
	        this.FileType = source["FileType"];
	        this.DefaultFilename = source["DefaultFilename"];
	    }
	}

}

