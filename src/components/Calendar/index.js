import React from 'react'
import moment from 'moment'
import './index.css'

import Header from './Header.js'
import AddEvent from './AddEvent'

// wiews
import WeekView from './views/WeekView'
import MonthView from './views/MonthView'
import YearView from './views/YearView'


class Calendar extends React.PureComponent {

	static format = 'D.MM.YYYY HH:mm'

	state = {
		// відображення календаря. Може бути - 'week, month, year'
		view: 'week',
		currentDate: moment().format(Calendar.format),
		addEventPopup: false,
	}

	constructor(props) {
		super(props)

		this.onViewChange = this.onViewChange.bind(this)
	}
  
	componentWillMount = () => {
		const { defaultView } = this.props

		if(defaultView) {
			this.setState({ view: defaultView })
		}
	}

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

		this.setState({ addEventPopup: !addEventPopup })
	}

	getView(viewName) {
		switch(viewName) {
		case 'week': return WeekView
		case 'month': return MonthView
		case 'year': return YearView
		default: return WeekView
		}
	}

	render() {
		const { view, currentDate, addEventPopup } = this.state

		const CurrentView = this.getView(view)

		return (
			<div className="dc-calendar">
				<Header
					view={view}
					currentDate={currentDate}
					onViewChange={this.onViewChange}
					onPressPrev={this.onPressPrev}
					onPressNext={this.onPressNext}
					onTogglePopup={this.onTogglePopup}
				/>

				<CurrentView
					view={view}
					currentDate={currentDate}
					format={Calendar.format}
				/>

				
				{addEventPopup && (
					<AddEvent
						onTogglePopup={this.onTogglePopup}
					/>
				)}
				

			</div>
		)
	}

}

export default Calendar
