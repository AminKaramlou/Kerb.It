if (Meteor.isClient) {
  var timeinterval;

  Meteor.startup(function (endtime) {
    var endtime = 'September 8 2015 14:50:30 UTC-0400';
    timeinterval = setInterval(function () {
      Meteor.call("getCurrentTime", function (error, result) {
        Session.set("time", result);
        var t = getTimeRemaining(endtime);
        Session.set("t", t);
      });
    }, 1000);
  });

  function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Session.get('time');
    var seconds = ("0" + Math.floor( (t/1000) % 60 )).slice(-2);
    var minutes = ("0" + Math.floor( (t/1000/60) % 60 )).slice(-2);
    var hours = ("0" + Math.floor( (t/(1000*60*60)) % 24 )).slice(-2);
    var days = Math.floor( t/(1000*60*60*24) );

    console.log(t)
    if(t <= 0)
      clearInterval(timeinterval);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };

  }

  Template.countdown.helpers({
    t: function () {
      return Session.get("t");
    }
  });

  Template.body.helpers({
    ended:function () {
      console.log(Session.get("t").total <= 0);
      return Session.get("t").total <= 0;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

  Meteor.methods({
    'getCurrentTime': function (){
      return Date.parse(new Date());
    }
  });
}