import React, { Component } from 'react';
import $ from 'jquery';
import 'moment/min/moment.min.js';

import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';

class myoffers extends Component {

    componentDidMount(){
      const { calendar } = this.refs;
  
      $(calendar).fullCalendar({events: this.props.events});
    }
  
    render() {
      return (
        <div ref='calendar'></div>
      );
    }
  
  }

export default myoffers;