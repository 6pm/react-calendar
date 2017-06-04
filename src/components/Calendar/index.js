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

/**
	 * Головний компонент календаря. Дані зберігаються схожим шляхом як і в redux.
	 * Всі дані зберігаються всередині в state,
	 * і в інші компоненти передаються функції, які дозволяють міняти state.
	 * В localStorage синхронізуються всі дані, крім стану папапу
	 */
export default class Calendar extends React.PureComponent {

	static propTypes = {
		events: PropTypes.array,
		view: PropTypes.string,
		currentDate: PropTypes.string,
	}

	// формат дати яка вибрана на даний момент
	static format = 'D M YYYY'
	// формат дати івента
	static eventFormat = 'D.M.YYYY H:m'

	constructor(props) {
		super(props)

		this.onViewChange = this.onViewChange.bind(this)
	}

	state = {
		// тут зберігаються всі івенти
		events: [],
		// відображення календаря. Може бути - 'week, month, year'
		view: 'week',
		// дата, яка вибрана на даний момент
		currentDate: '29 5 2017',
		// відкритий чи закритий попап для створення/редагування івентів. Не синхронізується з localStorage
		addEventPopup: false,
		// дані для ініціалізації попапа. Не синхронізується з localStorage
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

	/**
	 *  Знайти всі івенти на певний день
	 * 
	 * @param {String} day - день, на який треба знайти івенти
	 * @returns {Array} - івенти дня
	 */
	findEventsByDay = (day) => {
		const { events } = this.state

		return events.filter(e => moment(e.start, Calendar.eventFormat).format(Calendar.format) === day)
	}

	/**
	 *  Знайти івент по id
	 * 
	 * @param {String} id - id івента
	 */
	findEventById = (id) => {
		const { events } = this.state

		return events.find(item => item.id === id)
	}

	/**
	 *  Переключити вигляд(view) календаря
	 * 
	 * @param {String} viewName - новий вигляд
	 * @returns {JSX} - компонент вигляду
	 */
	getView(viewName) {
		switch(viewName) {
		case 'week': return WeekView
		case 'month': return MonthView
		case 'year': return YearView
		default: return WeekView
		}
	}

	/**
	 *  Замінити дату
	 * 
	 * @param {String} date - нова дата
	 */
	setDate = (date) => {
		this.setState({ currentDate: date })
	}

	/**
	 *  Згенерувати унікальний id
	 * 
	 * @returns {String} - id
	 */
	generateId() {
		const letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		const length = 6
		let id = ''

		for (var i = 0; i < length; i++) {
			id += letters.charAt(Math.floor(Math.random() * letters.length))
		}

		return id
	}

	/**
	 * Добавити новий івент до існуючих івентів
	 * 
	 * @param {Object} data - дані івента
	 */
	addEvent(data) {
		const { events } = this.state
		const id = this.generateId()
		const newEvent = Object.assign({}, data, {id}) 

		this.setState({ events: events.concat([ newEvent ]) })
	}

	/**
	 *  Оновити існуючий івент
	 * 
	 * @param {Object} data - день, на який треба знайти івенти
	 */
	updateEvent(data) {
		const { events } = this.state
		const withoutEdited = events.concat([]).filter(item => item.id !== data.id)

		this.setState({ events: withoutEdited.concat([ data]) })
	}

	/**
	 *  Ініціалізувати попап для редагування івентa
	 * 
	 * @param {String} id - id івента, який буде редагуватись
	 */
	initializeEventPopup = (id) => {
		const editedEvent = this.findEventById(id)

		this.setState({ popupInitData: editedEvent })
		this.onTogglePopup()
	}

	// ---------------------------------
	// ОБРОБНИКИ ІВЕНТІВ
	// ---------------------------------

	/**
	 *  Змінити view на новий
	 * 
	 * @param {Object} e - обєкт івента кліка
	 */
	onViewChange(e) {
		this.setState({ view: e.target.getAttribute('data-value') })
	}

	/**
	 *  Переключити на наступний тиждень/місяць/рік
	 */
	onPressPrev = () => {
		const { view, currentDate } = this.state
		const prevDate = moment(currentDate, Calendar.format).subtract(1, view).format(Calendar.format)
		
		this.setState({ currentDate: prevDate })
	}

	/**
	 *  Переключити на минулий тиждень/місяць/рік
	 */
	onPressNext = () => {
		const { view, currentDate } = this.state
		const nextDate = moment(currentDate, Calendar.format).add(1, view).format(Calendar.format)

		this.setState({ currentDate: nextDate })
	}

	/**
	 *  Відкрити/закрити попап для івентів
	 */
	onTogglePopup = () => {
		const { addEventPopup } = this.state
		const newValue = !addEventPopup
		
		// поміняти значення видимості попапа
		this.setState({ addEventPopup: newValue })

		// якщо закриваємо попап то очистити дані для форми
		if(!newValue) this.clearInitPopupData()
	}

	/**
	 *  Очистити дані з попереднього редагування івента
	 */
	clearInitPopupData = () => {
		this.setState({ popupInitData: false })
	}

	/**
	 *  Добавити івент. Якщо data має id - значить івент редагувався, якщо ні - створити новий івент
	 * 
	 * @param {Object} data - дані з івентом
	 */
	onSubmitEvent = (data) => {
		data.id ? this.updateEvent(data) : this.addEvent(data)
	}

	render() {
		const { popupInitData, view, currentDate, addEventPopup, events } = this.state
		const CurrentView = this.getView(view)

		return (
			<div className="dc-calendar">
				
				{/* функціональний компонент з хедером */}
				{Header({
					view: view,
					currentDate: currentDate,
					format: Calendar.format,
					onViewChange: this.onViewChange,
					onPressPrev: this.onPressPrev,
					onPressNext: this.onPressNext,
					onTogglePopup: this.onTogglePopup,
				})}

				{/* сам календар, в залежності від вибраного view */}
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

				{/*  попап для створення/редагування івентів */}
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
