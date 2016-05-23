/**
 * Activity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	avatar: {
    	type: 'string'
    },
    username: {
    	type: 'string'
    },
    serieName: {
    	type: 'string'
    },
    imageSerie: {
    	type: 'string'
    },
    type: {
    	type: 'string'
    }
    owners: {
		collection: 'user',
		via: 'activity'
    }
  }
};

