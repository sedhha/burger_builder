import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

import GithubConstants from '../../../constants/githubconstants';

const navigationItems = (props) => (

    <ul className = {classes.NavigationItems}>
        <NavigationItem link = {GithubConstants.HomePage} active>
        Burger Builder
        </NavigationItem>
        <NavigationItem link = {GithubConstants.Orders}>
        Checkout
        </NavigationItem>
    </ul>

);

export default navigationItems;