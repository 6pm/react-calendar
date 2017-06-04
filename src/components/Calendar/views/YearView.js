import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import DayNameTitles from './../DayNameTitles.js'

import { getDaysInMonth } from './../utils.js'


export default class YearView extends React.PureComponent {

	static propTypes = {
		view: PropTypes.string.isRequired,
		currentDate: PropTypes.string.isRequired,
		format: PropTypes.string.isRequired,
		findEventsByDay: PropTypes.func.isRequired,
		initializeEventPopup: PropTypes.func.isRequired,
	}

	/**
	 * Обробник кліка по івенту року. Запускає функцію, 
	 * яка ініціалізує попап для івенту.
	 * 
	 * @param {object} event - івент кліка
	 */
	onYearEventClick = (e) => {
		const { initializeEventPopup } = this.props
		const eventId = e.target.getAttribute('data-id')

		initializeEventPopup(eventId)
	}

	/**
	 * Отримати всі перші дні місяців року
	 * 
	 * @returns {Array} - массив з датами перших днів 12 місяців
	 */
	getFirstDaysInMonths() {
		const { currentDate, format } = this.props
		const year = moment(currentDate, format).format('YYYY')
		
		return [...Array(12).keys()].map(month => moment([1, `${month + 1}`, year], format))
	}

	/**
	 * Отримати всі дні, які є в році
	 * 
	 * @returns {Array} - массив з 365 чи 366(якщо високосний рік) елементами
	 */
	getFullDates() {
		const months = this.getFirstDaysInMonths()
		
		return months.map(day => getDaysInMonth(day))
	}

	// МЕТОДИ ДЛЯ РЕНДЕРУ ОКРЕМИХ ЕЛЕМЕНТІВ

	/**
	 * Рендер 1 дня
	 * 
	 * @param {String} day - дата дня
	 * @param {Number} index - індекс дня
	 * @returns {JSX} - JSX-елемент
	 */
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

	/**
	 * Рендер всіх івентів для одного дня
	 * 
	 * @param {String} day - дата дня
	 * @returns {JSX} - JSX-елемент зі списком івентів, якщо вони існують
	 */
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

	/**
	 * Рендер одного івента 
	 * 
	 * @param {Object} event - обєкт івента
	 * @returns {JSX} - JSX-елемент з івентом
	 */
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

	/**
	 * Отримати назву місяця по даті
	 * 
	 * @param {Object} month - дата
	 * @returns {String} - назва місяця
	 */
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
				{/* рендер всіх місяців в році */}
				{months.map((month, key) => (
					<div className="dc-view-year-month" key={key}>
						<h2 className="dc-view-year-month-title">{this.renderMonthName(month)}</h2>

						{/* функціональний компонент */}
						{DayNameTitles({
							wrapperClass:'dc-view-year-names',
							itemClass:'dc-view-year-day',
						})}

						{/* рендер одного місяця */}
						{month.map((day, index) => this.renderDay(day, index))}
					</div>
					)
				)}
			</div>
		)
	}
}
