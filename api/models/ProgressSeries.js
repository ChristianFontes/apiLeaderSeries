module.exports = {
	
    attributes: {
        owners: {
	      collection: 'user',
	      via: 'progressSeries'
	    },
	    mySerie: {
	      model: 'series'
	    },
	    episodeId: {
	    	type: 'string'
	    },
	    serieIMDB: {
	    	type: 'string'
	    },
	    info: {
	    	type: 'json'
	    },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.owners;
            delete obj.mySerie;
            return obj;
        }
	}	
}
