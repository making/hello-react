var React = require('react');
var models = require('../models.jsx');

var LinksView = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        models.LinksModel.findAll()
            .then(function (x) {
                this.setState({data: x});
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <LinkList data={this.state.data} />
            </div>
        );
    }
});

var LinkList = React.createClass({
    render: function () {
        var links = this.props.data.map(function (link) {
            return (
                <Link key={link.url} link={link}/>
            );
        });
        return (
            <ul>{links}</ul>
        );
    }
});

var Link = React.createClass({
    render: function () {
        return (
            <li>
                <a href={this.props.link.url}>{this.props.link.linkName}</a>
            </li>
        );
    }
});

module.exports = LinksView;