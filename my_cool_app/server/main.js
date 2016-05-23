import '../imports/api/tasks.js';
import { Tasks } from '../imports/api/tasks.js';

	Meteor.methods({
	'removeAll': function () 	{
	return Tasks.remove({});
}


  });

