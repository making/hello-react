var React = require('react');
var models = require('./models.jsx');
var EntriesView = require('./views/EntriesView.jsx');
var LinksView = require('./views/LinksView.jsx');
var RecentPostsView = require('./views/RecentPostsView.jsx');

var HelloWorld = React.createClass({
    render: function () {
        return (
            <div>
                <h1>React.js Sample</h1>
                <EntriesView />
                <h3>Recent Posts</h3>
                <RecentPostsView />
                <h3>Links</h3>
                <LinksView />
            </div>
        );
    }
});


module.exports = HelloWorld;
