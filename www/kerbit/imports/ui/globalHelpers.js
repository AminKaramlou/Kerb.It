import { Template } from 'meteor/templating';

Template.registerHelper('formatDate', (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", 
                        "December"];
    return date.getDate() + " " + monthNames[date.getMonth()] + ", " + 
           date.getFullYear() + " at " + date.getHours()  + ":" +
           date.getMinutes() ;
});
Template.registerHelper('formatPostcode', (postcode) => {
    let cut = 3;
    if (!isNaN(parseInt(postcode[1]))) {
      cut = 2;
    }
    const format = postcode.substring(0,cut) + " " + postcode.substring(cut);
    return format.toUpperCase();
});
