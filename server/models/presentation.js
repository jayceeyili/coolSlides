const mvpPres = {
  title: 'MVP Presentation',
  id: 1,
  slides: [
    {
      original: 'http://i.imgur.com/1NDbR9t.jpg',
      thumbnail: 'http://i.imgur.com/1NDbR9t.jpg'
      id: 14234,
      bookmark: false,
      note: '',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/kTQhA6J.jpg',
      thumbnail: 'http://i.imgur.com/kTQhA6J.jpg'
      id: 47684,
      bookmark: false,
      note: 'I like this slide',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/jUkgkhB.jpg',
      thumbnail: 'http://i.imgur.com/jUkgkhB.jpg'
      id: 65847,
      bookmark: false,
      note: '',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/8IzciiM.jpg',
      thumbnail: 'http://i.imgur.com/8IzciiM.jpg'
      id: 56734,
      bookmark: false,
      note: 'I do not like this slide',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/ULvmW7i.jpg',
      thumbnail: 'http://i.imgur.com/ULvmW7i.jpg'
      id: 43573,
      bookmark: false,
      note: 'just so so',
      tweet: false
    },
    {
      original: 'http://i.imgur.com/aSgIylL.jpg',
      thumbnail: 'http://i.imgur.com/aSgIylL.jpg'
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
