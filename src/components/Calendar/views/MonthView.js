import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'

import DayNameTitles from './../DayNameTitles.js'

import { getDaysInMonth } from './../utils.js'


export default class MonthView extends React.PureComponent {

	static propTypes = {
		currentDate: PropTypes.string.isRequired,
		format: PropTypes.string.isRequired,
		eventFormat: PropTypes.string.isRequired,
		events: PropTypes.array.isRequired,
		findEventsByDay: PropTypes.func.isRequired,
		initializeEventPopup: PropTypes.func.isRequired,
	}

	onMonthEventClick = (e) => {
		const { initializeEventPopup } = this.props
		const eventId = e.target.getAttribute('data-id')
		
		initializeEventPopup(eventId)
	}

	render() {
		const { currentDate, format, findEventsByDay } = this.props

		const firstDay = moment(currentDate, format).startOf('month').format(format)
		const days = getDaysInMonth(moment(firstDay, format))

		return (
			<div>
				{DayNameTitles({
					wrapperClass: 'dc-view-year-names',
					itemClass: 'dc-view-year-day',
				})}
				
				{days.map((day, index) => (
					<div className={cn('dc-view-month-day', {
						'dc-month-empty': !day
					})} key={index}>
						{day && (
							<div>
								<span className="dc-view-month-day-number">{moment(day, format).format('D')}</span>
								
								<ul className="dc-view-month-events">
									{findEventsByDay(day).map(event => (
										<li 
											className="dc-view-month-event"
											onClick={this.onMonthEventClick}
											data-id={event.id}
											key={event.id}
											title={`${event.title} - ${event.start}`}
										>
											<span role="img" aria-label="jsx-a11y/accessible-emoji" data-id={event.id}>{event.icon}</span>
											{event.title}
										</li>
									))}
								</ul>
							</div>
						)}

					</div>
				))}
			</div>
		)
	}
}
