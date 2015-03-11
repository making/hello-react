var React = require('react');
var models = require('../models.jsx');

var CategoriesView = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        models.CategoriesModel.findAll()
            .then(function (x) {
                this.setState({data: x});
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <h2>All Categories</h2>
                <CategoryList data={this.state.data} />
            </div>
        );
    }
});

var CategoryList = React.createClass({
    render: function () {
        var categories = this.props.data.map(function (category) {
            var key = category.categoryName.join('::');
            return (
                <Category key={key} categoryName={category.categoryName}/>
            );
        });
        return (
            <ul>{categories}</ul>
        );
    }
});

var Category = React.createClass({
    render: function () {
        var name = this.props.categoryName.join('::');
        return (
            <li>
                <a>{name}</a>
            </li>
        );
    }
});

module.exports = CategoriesView;