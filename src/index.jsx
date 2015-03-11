var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var React = require('react');

var EntriesView = require('./views/EntriesView.jsx');
var TagsView = require('./views/TagsView.jsx');
var CategoriesView = require('./views/CategoriesView.jsx');

var LinksView = require('./views/LinksView.jsx');
var RecentPostsView = require('./views/RecentPostsView.jsx');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <h1><Link to="app">Blog</Link></h1>
                <ul>
                    <li>
                        <Link to="tags">All Tags</Link>
                    </li>
                    <li>
                        <Link to="categories">All Categories</Link>
                    </li>
                </ul>
                <RouteHandler/>
                <h3>Recent Posts</h3>
                <RecentPostsView />
                <h3>Links</h3>
                <LinksView />
            </div>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="tags" handler={TagsView}/>
        <Route name="categories" handler={CategoriesView}/>
        <DefaultRoute handler={EntriesView}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('example'));
});
