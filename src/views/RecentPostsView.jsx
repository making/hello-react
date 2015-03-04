var React = require('react');
var models = require('../models.jsx');

var RecentPostsView = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        models.RecentPostsModel.findAll()
            .then(function (x) {
                this.setState({data: x});
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <RecentPostList data={this.state.data} />
            </div>
        );
    }
});

var RecentPostList = React.createClass({
    render: function () {
        var recentPosts = this.props.data.map(function (entry) {
            return (
                <RecentPost key={entry.entryId} entry={entry}/>
            );
        });
        return (
            <ul>{recentPosts}</ul>
        );
    }
});

var RecentPost = React.createClass({
    render: function () {
        return (
            <li>
                <a href={this.props.entry.entryId}>{this.props.entry.title}</a>
            </li>
        );
    }
});

module.exports = RecentPostsView;