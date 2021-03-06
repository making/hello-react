var React = require('react');
var models = require('../models.jsx');

var TagsView = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        models.TagsModel.findAll()
            .then(function (x) {
                this.setState({data: x});
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <h2>All Tags</h2>
                <TagList data={this.state.data} />
            </div>
        );
    }
});

var TagList = React.createClass({
    render: function () {
        var tags = this.props.data.map(function (tag) {
            return (
                <Tag key={tag.tagName} tagName={tag.tagName}/>
            );
        });
        return (
            <ul>{tags}</ul>
        );
    }
});

var Tag = React.createClass({
    render: function () {
        var url = 'http://blog.ik.am/#/tags/' + this.props.tagName + '/entries';
        return (
            <li>
                <a href={url}>{this.props.tagName}</a>
            </li>
        );
    }
});

module.exports = TagsView;