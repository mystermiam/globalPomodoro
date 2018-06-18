const time = [3, 3, false],
	  user = [
	    {
	  		userID: '5678',
	  		name: 'Jabol',
	  	}, {
	  		userID: '9012',
	  		name: 'Youcef',
	  	}, {
	  		userID: '01234',
	  		name: 'Gionisos',
	  	}, {
	  		userID: '3456',
	  		name: 'Aurelie'
	  	}, {
	  		userID: '7890',
	  		name: 'Noam'
	  	}
	  ];


export default {
    getTimeLeft(cb){
        cb(time);
    },

    getUsers(cb){
    	cb(user);
    }

}

