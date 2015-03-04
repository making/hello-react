var React = require('react');
var models = require('./models.js');

var HelloWorld = React.createClass({
    render: function () {
        return (
            <div>
                <h1>React.js Sample</h1>
                <EntriesView />
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
            <li><a href={url}>{this.props.tagName}</a></li>
        );
    }
});

var EntriesView = React.createClass({
    getInitialState: function () {
        return {data: {content: []}};
    },
    componentDidMount: function () {
        models.EntriesModel.findAll()
            .then(function (x) {
                this.setState({data: x});
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <EntriesListView data={this.state.data} />
                <PaginationView page={this.state.data} maxDisplayCount={5} />
            </div>
        );
    }
});

var EntriesListView = React.createClass({
    render: function () {
        var entries = this.props.data.content.map(function (entry) {
            return (
                <EntryView entryId={entry.entryId} entry={entry}/>
            );
        });
        return (
            <ul>{entries}</ul>
        );
    }
});

var EntryView = React.createClass({
    render: function () {
        return (
            <li>{this.props.entry.title}</li>
        );
    }
});

var PaginationView = React.createClass({
    render: function () {
        console.log(this.props);
        var pages = [], beginAndEnd = this.calcBeginAndEnd();
        
        if (this.props.page.first) {
            pages.push(<li className="disabled">First</li>);
        } else {
            pages.push(<li>First</li>);
        }
        for (var i = beginAndEnd.begin; i <= beginAndEnd.end; i++) {
            if (i === this.props.page.number) {
              pages.push(<li><strong>Page {i}</strong></li>);
            }  else {
              pages.push(<li>Page {i}</li>);
            }
        }
        if (this.props.page.last) {
            pages.push(<li className="disabled">Last</li>);
        } else {
            pages.push(<li>Last</li>);
        }

        return (
            <ul>{pages}</ul>
        );
    },
    calcBeginAndEnd: function () {
        var begin = Math.max(0, this.props.page.number - Math.floor(this.props.maxDisplayCount / 2))
            , end = begin + this.props.maxDisplayCount - 1
            , lastPage = this.props.page.totalPages - 1;
        if (end > lastPage) {
            end = lastPage;
            begin = Math.max(0, end - (this.props.maxDisplayCount - 1));
        }
        return {
            begin: begin,
            end: end
        };
    }
});


module.exports = HelloWorld;
