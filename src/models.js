var React = require('react');
var rest = require('rest');
var mime = require('rest/interceptor/mime');
var pathPrefix = require('rest/interceptor/pathPrefix');

var client = rest.wrap(mime)
    .wrap(pathPrefix, {prefix: 'http://blog.ik.am/api/v1/'});


var createBaseModel = function (path, others) {
    var baseModel = {
      findAll: function () {
          return client({path: path})
              .then(function (response) {return response.entity;});
      }
    };
    if (others) {
        for (prop in others) {
            baseModel[prop] = others[prop];
        }
    }
    return baseModel;
};

var returnEntity = function (response) {
    return response.entity;
}

var RecentPostsModel = createBaseModel('recentposts');

var LinksModel = createBaseModel('links');

var EntriesModel = {
    findAll: function (page, size) {
        page = page || 0;
        size = size || 3;
        return client({
            path: 'entries', params: {
                page: page,
                size: size
            }
        })
            .then(returnEntity);
    },
    findOne: function (entryId) {
        return client({path: 'entries/' + entryId})
            .then(returnEntity);
    }
};

var TagsModel = createBaseModel('tags');

var CategoriesModel = createBaseModel('links');

module.exports = {
    RecentPostsModel: RecentPostsModel,
    LinksModel: LinksModel,
    EntriesModel: EntriesModel,
    TagsModel: TagsModel,
    CategoriesModel: CategoriesModel
};