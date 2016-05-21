module.exports = {

    attributes: {
    	schema: false,
        owners: {
	      collection: 'user',
	      via: 'series'
	    },
	    episodes: {
	      collection: 'progressseries',
	      via: 'mySerie',
          dominant: true
	    },
		serie: {
		    type: 'json'
	    },
	    imdb: {
	    	type: 'string'
	    },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.owners;
            delete obj.episodes;
            return obj;
        }
	}	
}
