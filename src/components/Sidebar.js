import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class Sidebar extends React.Component {

  constructor(props){
    super(props);
    this.state={
      title: props.title
    }
  }

  componentDidMount() {
    this.sidebarBehavior();
  }

  sidebarBehavior() {
    $(window).scroll(function() {
      if(($('body').scrollTop() >= $('.static-sidebar').offset().top) && (!$('.sidebar-title').hasClass('fix-it'))) {
        $('.sidebar-title').addClass('fix-it');
      }
      else if(($('body').scrollTop() < $('.static-sidebar').offset().top) && ($('.sidebar-title').hasClass('fix-it'))){
        $('.sidebar-title').removeClass('fix-it');
      }
    });
  }

  render() {
    return (
      <div className="static-sidebar">
        <h1 className="sidebar-title">{this.state.title}</h1>
        <ul>
        </ul>
      </div>
    );
  };
}

export default Sidebar;
