const time = [3, 3, false],
	  user = [
	    {
	  		userID: '5678',
	  		name: 'Jabol',
	  		sessionsCompleted: 3,
	  	}, {
	  		userID: '9012',
	  		name: 'Youcef',
	  		sessionsCompleted: 1,
	  	}, {
	  		userID: '01234',
	  		name: 'Pascal',
	  		sessionsCompleted: 1,
	  	}, {
	  		userID: '3456',
	  		name: 'Aurelie',
	  		sessionsCompleted: 2,
	  	}, {
	  		userID: '7890',
	  		name: 'Noam',
	  		sessionsCompleted: 5,
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

