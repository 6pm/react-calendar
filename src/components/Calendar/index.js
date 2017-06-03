import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Header from './Header.js'
import AddEvent from './AddEvent'

// wiews
import WeekView from './views/WeekView'
import MonthView from './views/MonthView'
import YearView from './views/YearView'

import './styles.css'


export default class Calendar extends React.PureComponent {

	static propTypes = {
		events: PropTypes.array,
		view: PropTypes.string,
		currentDate: PropTypes.string,
	}

	static format = 'D M YYYY'
	static eventFormat = 'D.M.YYYY H:m'

	constructor(props) {
		super(props)

		this.onViewChange = this.onViewChange.bind(this)
	}

	state = {
		events: [],
		// відображення календаря. Може бути - 'week, month, year'
		view: 'week',
		currentDate: '29 5 2017',
		addEventPopup: false,
		popupInitData: false
	}
  
	componentWillMount = () => {
		const { view, currentDate, events } = this.props
		const localState = localStorage.getItem('dcCalendarState')

		if (localState) {
			this.setState(JSON.parse(localState))
		} else {
			if(view) this.setState({ view })
			if(currentDate) this.setState({ currentDate })
			if(events) this.setState({ events })
		}
	}

	componentWillUpdate = (nextProps, nextState) => {
		const oldState = Object.assign({}, this.state, { popupInitData: false, addEventPopup: false })
		const newState = Object.assign({}, nextState, { popupInitData: false, addEventPopup: false })
		const oldStateStr = JSON.stringify(oldState)
		const newStateStr = JSON.stringify(newState)

		if (oldStateStr !== newStateStr) {
			localStorage.setItem('dcCalendarState', newStateStr)
		}
	}

	findEventsByDay = (day) => {
		const { events } = this.state

		return events.filter(e => moment(e.start, Calendar.eventFormat).format(Calendar.format) === day)
	}

	findEventById = (id) => {
		const { events } = this.state

		return events.find(item => item.id === id)
	}

	getView(viewName) {
		switch(viewName) {
		case 'week': return WeekView
		case 'month': return MonthView
		case 'year': return YearView
		default: return WeekView
		}
	}

	setDate = (date) => {
		this.setState({ currentDate: date })
	}

	generateId() {
		const letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		const length = 6
		let id = ''

		for (var i = 0; i < length; i++) {
			id += letters.charAt(Math.floor(Math.random() * letters.length))
		}

		return id
	}

	addEvent(data) {
		const { events } = this.state
		const id = this.generateId()
		const newEvent = Object.assign({}, data, {id}) 

		this.setState({ events: events.concat([ newEvent ]) })
	}

	updateEvent(data) {
		const { events } = this.state
		const withoutEdited = events.concat([]).filter(item => item.id !== data.id)

		this.setState({ events: withoutEdited.concat([ data]) })
	}

	initializeEventPopup = (id) => {
		const editedEvent = this.findEventById(id)

		this.setState({ popupInitData: editedEvent })
		this.onTogglePopup()
	}

	// ---------------------------------
	// ОБРОБНИКИ ІВЕНТІВ
	// ---------------------------------

	onViewChange(e, value) {
		this.setState({ view: e.target.getAttribute('data-value') })
	}

	onPressPrev = () => {
		const { view, currentDate } = this.state
		const prevDate = moment(currentDate, Calendar.format).subtract(1, view).format(Calendar.format)
		
		this.setState({ currentDate: prevDate })
	}

	onPressNext = () => {
		const { view, currentDate } = this.state
		const nextDate = moment(currentDate, Calendar.format).add(1, view).format(Calendar.format)

		this.setState({ currentDate: nextDate })
	}

	onTogglePopup = () => {
		const { addEventPopup } = this.state
		const newValue = !addEventPopup
		
		// поміняти значення видимості попапа
		this.setState({ addEventPopup: newValue })

		// якщо закриваємо попап то очистити дані для форми
		if(!newValue) this.clearInitPopupData()
	}

	clearInitPopupData = () => {
		this.setState({ popupInitData: false })
	}

	onSubmitEvent = (data) => {
		data.id ? this.updateEvent(data) : this.addEvent(data)
	}

	render() {
		const { popupInitData, view, currentDate, addEventPopup, events } = this.state

		const CurrentView = this.getView(view)

		return (
			<div className="dc-calendar">
				{Header({
					view: view,
					currentDate: currentDate,
					format: Calendar.format,
					onViewChange: this.onViewChange,
					onPressPrev: this.onPressPrev,
					onPressNext: this.onPressNext,
					onTogglePopup: this.onTogglePopup,
				})}

				<CurrentView
					view={view}
					events={events}
					currentDate={currentDate}
					format={Calendar.format}
					eventFormat={Calendar.eventFormat}
					setDate={this.setDate}
					findEventsByDay={this.findEventsByDay}
					initializeEventPopup={this.initializeEventPopup}
				/>

				
				{addEventPopup && (
					<AddEvent
						onTogglePopup={this.onTogglePopup}
						eventFormat={Calendar.eventFormat}
						onSubmitEvent={this.onSubmitEvent}
						initData={popupInitData}
					/>
				)}
				
			</div>
		)
	}
}
