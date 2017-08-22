import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  // code to run on server at startup
  
  //Middleware
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    // findOne() works as fin() but returns only one result
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      // track links:
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }

  });

});
