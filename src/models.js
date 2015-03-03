var React = require('react');
var rest = require('rest');
var mime = require('rest/interceptor/mime');
var pathPrefix = require('rest/interceptor/pathPrefix');

var client = rest.wrap(mime)
    .wrap(pathPrefix, {prefix: 'http://blog.ik.am/api/v1/'});

var returnEntity = function (response) {
    return response.entity;
}

var RecentPostsModel = {
    findAll: function () {
        return client({path: 'recentposts'})
            .then(returnEntity);
    }
}

var LinksModel = {
    findAll: function () {
        return client({path: 'links'})
            .then(returnEntity);
    }
};

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

var TagsModel = {
    findAll: function () {
        return client({path: 'tags'})
            .then(returnEntity);
    }
};

var CategoriesModel = {
    findAll: function () {
        return client({path: 'categoriess'})
            .then(returnEntity);
    }
};

module.exports = {
    RecentPostsModel: RecentPostsModel,
    LinksModel: LinksModel,
    EntriesModel: EntriesModel,
    TagsModel: TagsModel,
    CategoriesModel: CategoriesModel
};