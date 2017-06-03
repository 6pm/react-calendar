import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import DayNameTitles from './../DayNameTitles.js'

import { getDaysInMonth } from './../utils.js'

class YearView extends React.PureComponent {

	static propTypes = {
		/**
		* The current date value of the calendar. Determines the visible view range
		*
		* @controllable onNavigate
		*/
		view: PropTypes.string.isRequired,
		currentDate: PropTypes.string.isRequired,
		format: PropTypes.string.isRequired,
		findEventsByDay: PropTypes.func.isRequired,
		initializeEventPopup: PropTypes.func.isRequired,
	}

	onYearEventClick = (e) => {
		const { initializeEventPopup } = this.props
		const eventId = e.target.getAttribute('data-id')

		initializeEventPopup(eventId)
	}

	getFirstDaysInMonths() {
		const { currentDate, format } = this.props
		const year = moment(currentDate, format).format('YYYY')
		
		return [...Array(12).keys()].map(month => moment([1, `${month + 1}`, year], format))
	}

	getFullDates() {
		const months = this.getFirstDaysInMonths()
		
		return months.map(day => getDaysInMonth(day))
	}

	// МЕТОДИ ДЛЯ РЕНДЕРУ ОКРЕМИХ ЕЛЕМЕНТІВ

	renderDay(day, index) {
		if (day) {
			return (
				<div
					data-day={day}
					className="dc-view-year-day"
					key={index}
				>
					{day.split(' ')[0]}
					{this.renderYearEvents(day)}
				</div>
			)
		}
		
		return <span className="dc-view-year-day dc-empty" key={index} />
	}

	renderYearEvents(day) {
		const { findEventsByDay } = this.props
		const events = findEventsByDay(day)

		if(events.length) {
			return (
				<div className="dc-year-events-wrap">
					<span className="dc-year-events-counter">
						{events.length}
					</span>
					<div className="dc-year-events-container">
						{events.map(event => (
							<div key={event.id}>{this.renderEvent(event)}</div>
						))}
					</div>
				</div>	
			)
		}

		return null
	}

	renderEvent(event) {
		return (
			<span
				className="dc-year-event"
				onClick={this.onYearEventClick}
				data-id={event.id}
				title={`${event.title} - ${event.start}`}
			>
				<span role="img" aria-label="jsx-a11y/accessible-emoji" data-id={event.id}>{event.icon}</span>
				{event.title}
			</span>
		)
	}

	renderMonthName(month) {
		const { format } = this.props
		const lastDate = month[month.length - 1]
		const momentDate = moment(lastDate, format)

		return momentDate.format('MMMM')
	}

	render() {
		const months = this.getFullDates()

		return (
			<div>
				{months.map((month, key) => (
					<div className="dc-view-year-month" key={key}>
						<h2 className="dc-view-year-month-title">{this.renderMonthName(month)}</h2>
						
						{DayNameTitles({
							wrapperClass:'dc-view-year-names',
							itemClass:'dc-view-year-day',
						})}

						{month.map((day, index) => this.renderDay(day, index))}
					</div>
					)
				)}
			</div>
		)
	}
}

export default YearView