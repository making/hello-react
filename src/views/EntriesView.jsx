var React = require('react');
var models = require('../models.jsx');
var Pager = require('react-pager');

var EntriesView = React.createClass({
    getInitialState: function () {
        return {
            content: [],
            totalPage: 10,
            number: 0
        };
    },
    componentDidMount: function () {
        models.EntriesModel.findAll()
            .then(function (x) {
                this.setState(x);
            }.bind(this));
    },
    handlePageChanged: function (newPage) {
        this.setState({
            number: newPage
        });
    },
    render: function () {
        var param = '?page=' + this.state.number + '&size=' + this.state.size;
        return (
            <div>
                <EntryList data={this.state.content} />
                <span>{param}</span>
                <Pager total={this.state.totalPages}
                    current={this.state.number}
                    visiblePages={5}
                    onPageChanged={this.handlePageChanged} />
            </div>
        );
    }
});

var EntryList = React.createClass({
    render: function () {
        var entries = this.props.data.map(function (entry) {
            return (
                <Entry entryId={entry.entryId} entry={entry}/>
            );
        });
        return (
            <ul>{entries}</ul>
        );
    }
});

var Entry = React.createClass({
    render: function () {
        return (
            <li>{this.props.entry.title}</li>
        );
    }
});


module.exports = EntriesView;