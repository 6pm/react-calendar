import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

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
	}

	static dayFormat = 'D M YYYY'

  // componentDidMount = () => {
    
  //   console.log(daysInYear)
  // }

	getFirstDaysInMonths = () => {
		const { currentDate, format } = this.props
		const year = moment(currentDate, format).format('YYYY')
		
		return [...Array(12).keys()].map(month => moment([1, `${month + 1}`, year], YearView.dayFormat))
	}

	getDaysInMonth(firstDay) {
		const monthAndYear = firstDay.format('M YYYY')
		const offset = [...Array(firstDay.isoWeekday() - 1).keys()]
		const days = [...Array(firstDay.daysInMonth()).keys()]
		const dates = []
		
		// заповнити місяць офсетами - для відображення відступів в тижні
		offset.forEach(i => dates.push(false))

		// заповнити датами днів тижня
		days.forEach(day => {
			dates.push(`${day+1} ${monthAndYear}`)
		})
		
		return dates
	}

	getFullDates() {
		const months = this.getFirstDaysInMonths() 
		
		return months.map(day => this.getDaysInMonth(day))
	}

	// МЕТОДИ ДЛЯ РЕНДЕРУ ОКРЕМИХ ЕЛЕМЕНТІВ

	renderDay(day, index) {
		if (day) {
			return <span
				onClick={this.onDayClick}
				data-day={day}
				className="dc-view-year-day"
				key={index}
			>{day.split(' ')[0]}</span>
		}
		
		return <span className="dc-view-year-day dc-empty" key={index}></span>
	}

	renderMonthName(month) {
		const lastDate = month[month.length - 1]
		const momentDate = moment(lastDate, YearView.dayFormat)

		return momentDate.format('MMMM')
	}

	renderWeekdayNames() {
		const names = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

		return (
			<div className="dc-view-year-names">
				{names.map(name => (
					<span className="dc-view-year-day" key={name}>{name}</span>
				))}
			</div>  
		)
	}

	// ОБРОБНИКИ ІВЕНТІВ
	onDayClick = (e) => {
		const day = e.target.getAttribute('data-day')

		console.log(day)
	}

	render() {
		const months = this.getFullDates()

		return (
			<div>
				{months.map((month, key) => 
					<div className="dc-view-year-month" key={key}>
						<span className="dc-view-year-month-title">{this.renderMonthName(month)}</span>
						
						{this.renderWeekdayNames()}

						{month.map((day, index) => this.renderDay(day, index))}
					</div>)
				}
			</div>
		)
	}
}

export default YearView