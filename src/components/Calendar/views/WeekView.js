import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import WeekEvents from './../WeekEvents'


export default class WeekView extends React.PureComponent {

	static propTypes = {
		currentDate: PropTypes.string.isRequired,
		format: PropTypes.string.isRequired,
		eventFormat: PropTypes.string.isRequired,
		setDate: PropTypes.func.isRequired,
		events: PropTypes.array.isRequired,
		initializeEventPopup: PropTypes.func.isRequired,
	}

	state = {
		hourHeight: 40,
	}

	componentWillMount = () => {
		this.fixStartOfWeek()
	}

	/**
	 * Поставити currentDate найближчим минулим понеділком.
	 * Параметр currentDate може не початком тижня, а іншим днем, наприклад середою.
	 * Так як всі відображення календаря починається з понеділка,
	 * то currentDate встановлюється понеділком.
	 */
	fixStartOfWeek() {
		const { currentDate, format, setDate } = this.props
		const firstDayOfWeek = moment(currentDate, format).startOf('isoweek').format('D M YYYY')

		if(firstDayOfWeek !== currentDate) {
			setDate(firstDayOfWeek)
		}
	}

	render() {
		const { initializeEventPopup, currentDate, format, eventFormat, events } = this.props
		const { hourHeight } = this.state

		return (
			<div>
				<div className="dc-week-timeline">
					<div className="dc-week-timeline-hour" />
					{[...Array(24)].map((x, index) =>
						<div className="dc-week-timeline-hour" key={index}>{`${index}:00`}</div>
					)}
				</div>

				<div className="dc-week-content">
					{[...Array(7)].map((x, index) => (
						<div className="dc-week-title" key={index}>
							{moment(currentDate, format).add(index, 'd').format('dddd D')}
						</div>
					))}
				</div>

				{/* рендер івентів */}
				<WeekEvents
					currentDate={currentDate}
					format={format}
					eventFormat={eventFormat}
					events={events}
					hourHeight={hourHeight}
					initializeEventPopup={initializeEventPopup}
				/>
				
			</div>
		)
	}
}

