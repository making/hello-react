var React = require('react');
var models = require('./models.js');

var HelloWorld = React.createClass({
    render: function () {
        return (
            <div>
                <h1>React.js Sample</h1>
                <TagBox />
            </div>
        );
    }
});

var TagBox = React.createClass({
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
                <TagList data={this.state.data} />
            </div>
        );
    }
});

var TagList = React.createClass({
    render: function () {
        var tags = this.props.data.map(function (tag) {
            return (
                <Tag tagName={tag.tagName}/>
            );
        });
        return (
            <ul>{tags}</ul>
        );
    }
});

var Tag = React.createClass({
    render: function () {
        return (
            <li>{this.props.tagName}</li>
        );
    }
});

module.exports = HelloWorld;
