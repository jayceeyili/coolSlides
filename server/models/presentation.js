const models = require('../../database/models/index');

module.exports.storePresentation = function (presentation, callback) {
  // callback(null, { hello: 'world' });
  // return;
  models.Presentation.create({
    title: presentation.title,
    user_id: presentation.author
  })
  .then((presentationCreationResult) => {
    console.log('In presentation model after pres creation:', presentationCreationResult);
    presentation.id = presentationCreationResult.dataValues.id;
    Promise.all(presentation.slides.map((slide, i) => models.Slide.create({
      image_url: slide.secure_url,
      thumbnail_url: slide.thumbnail_url,
      slide_index: i,
      presentation_id: presentationCreationResult.dataValues.id
    })
      .then((slideCreationResult) => {
        console.log('In presentation model after slide creation:', slideCreationResult);
        presentation.slides[i].id = slideCreationResult.dataValues.id;
      })
      // .catch((err) => {
      //   console.log('Error creating slide in storePresentation:', err);
      //   callback(err, null);
      // });
    ))
    .then((/* undefined*/) => {
      console.log('Success storing presentation!');
      callback(null, presentation);
    })
    .catch((err) => {
      console.log('Error creating presentation in storePresentation:', err);
      callback(err, null);
    });
  });
};

module.exports.getAllPresentations = function (userId, callback) {
  models.Presentation.findAll({
    user_id: userId
  })
  .then((presentations) => {
    console.log('presentations:', presentations);
  })
  .catch((err) => {
    console.log('Error retrieving all presentations:', err);
    callback(err, null);
  });
};

// -=--=-=-

const mvpPres = {
  title: 'MVP Presentation',
  id: 1,
  slides: [
    {
      original: 'http://i.imgur.com/1NDbR9t.jpg',
      thumbnail: 'http://i.imgur.com/1NDbR9t.jpg',
      id: 14234,
      bookmark: false,
      note: '',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/kTQhA6J.jpg',
      thumbnail: 'http://i.imgur.com/kTQhA6J.jpg',
      id: 47684,
      bookmark: false,
      note: 'I like this slide',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/jUkgkhB.jpg',
      thumbnail: 'http://i.imgur.com/jUkgkhB.jpg',
      id: 65847,
      bookmark: false,
      note: '',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/8IzciiM.jpg',
      thumbnail: 'http://i.imgur.com/8IzciiM.jpg',
      id: 56734,
      bookmark: false,
      note: 'I do not like this slide',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/ULvmW7i.jpg',
      thumbnail: 'http://i.imgur.com/ULvmW7i.jpg',
      id: 43573,
      bookmark: false,
      note: 'just so so',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/aSgIylL.jpg',
      thumbnail: 'http://i.imgur.com/aSgIylL.jpg',
      id: 34512,
      bookmark: false,
      note: '',
      tweet: false
    }
  ]
};

module.exports.getPresentation = function (presentationIndex) {
  return mvpPres;
};
