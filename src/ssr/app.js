import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withApollo } from 'react-apollo';
import Router from '../../client/router';

class App extends Component {
    
    render() {
        return (
            <div>
                <Helmet>
                    <title>Graphbook - Feed</title>
                    <meta name="description" content="Newsfeed of all your friends on Graphbook" />
                </Helmet>
                <Router location={this.props.location} context={this.props.context}/>
            </div>
        )
    }
}

export default withApollo(App)