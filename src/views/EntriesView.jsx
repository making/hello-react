var React = require('react');
var models = require('../models.jsx');
var Pager = require('react-pager');
var EntryView = require('./EntryView.jsx');

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
        models.EntriesModel.findAll(newPage, this.state.size)
            .then(function (x) {
                this.setState(x);
            }.bind(this));
        window.scroll(0, 0);
    },
    render: function () {
        var param = '?page=' + this.state.number + '&size=' + this.state.size;
        return (
            <div>
                <EntryList data={this.state.content} />
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
                <EntryView key={entry.entryId} entry={entry}/>
            );
        });
        return (
            <div>{entries}</div>
        );
    }
});

module.exports = EntriesView;