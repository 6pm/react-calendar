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

	/**
	 * Обробник кліка по івенту місяця. Запускає функцію, 
	 * яка ініціалізує попап для івенту.
	 * 
	 * @param {object} event - івент кліка
	 */
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
				{/* функціональний компонент DayNameTitles підключений так, 
						що він не запускає lifecycle-методи компонентів */}
				{DayNameTitles({
					wrapperClass: 'dc-view-year-names',
					itemClass: 'dc-view-year-day',
				})}
				
				{/* рендер днів */}
				{days.map((day, index) => (
					<div className={cn('dc-view-month-day', {
						'dc-month-empty': !day
					})} key={index}>
						{day && (
							<div>
								<span className="dc-view-month-day-number">{moment(day, format).format('D')}</span>
								
								{/* рендер списка івентів */}
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
