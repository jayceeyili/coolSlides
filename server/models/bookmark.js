const Promise = require('bluebird');
const models = require('../../database/models/index');
const getTargetPresentationSlides = Promise.promisify(require('./slide').getTargetPresentationSlides);

module.exports.addBookmark = function (bookmarkedSlideUrl, userId, presentationId) {
  getTargetPresentationSlides(presentationId)
  .then((slides) => {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].dataValues.original === bookmarkedSlideUrl) {
        models.Bookmark.create({
          slide_id: slides[i].dataValues.id,
          user_id: userId
        })
        .catch(err => console.log(err));
        break;
      }
    }
  })
  .catch(err => console.log(err));
};

module.exports.removeBookmark = function (bookmarkedSlideUrl, userId, presentationId) {
  getTargetPresentationSlides(presentationId)
  .then((slides) => {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].dataValues.original === bookmarkedSlideUrl) {
        models.Bookmark.destroy({
          where: {
            slide_id: slides[i].dataValues.id,
            user_id: userId
          }
        })
        .catch(err => console.log(err));
        break;
      }
    }
  })
  .catch(err => console.log(err));
};

module.exports.checkIsSlideBookmarked = function (slideId, userId, callback) {
  let isSlideBookmarked = false;
  models.Bookmark.findOne({
    where: {
      slide_id: slideId,
      user_id: userId
    }
  })
  .then((bookmarkQueryResult) => {
    if (bookmarkQueryResult !== null) {
      isSlideBookmarked = true;
    }
    callback(null, isSlideBookmarked);
  })
  .catch(err => console.log(err));
};
