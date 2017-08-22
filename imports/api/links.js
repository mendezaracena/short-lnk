import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import  { Mongo } from 'meteor/mongo';
import shortid from 'shortid';

export const Links =  new Mongo.Collection('links');

// Create subscription to fetch data. For more info go to meteor
// Because we need to access to userId. We will use ES5 functions
if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
    // Publication that shows everything:ß
    return Links.find({userId: this.userId});

  });
}

// Create methods to create, edit and delete data securely.
// Grab resource, select action. ie: emails.archive
Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('Not-authorized');
    }

  // url validation
    new SimpleSchema({
        url: {
        label: 'Tu link',
        type: String,
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });


    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedCount: null
    });
  },

  // Method for link visibility button
  'links.setVisibility'(_id, visible) {
    // 1) Validate if user is logged in
    if (!this.userId) {
      throw new Meteor.Error('Not-authorized');
    }

    // 2) Use simple schema to validate data from user id and visibile
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    // 2.1) call the validate()
    }).validate({ _id, visible });


    // 3) Update Mongo
    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible }
    });
  },
  // Add the new method to track links
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });
    // update the db for that link
    Links.update({ _id }, {
      $set: {
        lastVisitedCount: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
});
