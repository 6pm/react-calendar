import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'


export default class WeekEvents extends React.PureComponent {

	static propTypes = {
		currentDate: PropTypes.string.isRequired,
		format: PropTypes.string.isRequired,
		eventFormat: PropTypes.string.isRequired,
		events: PropTypes.array.isRequired,
		hourHeight: PropTypes.number.isRequired,
		initializeEventPopup: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)

		this.updateContainerWidth = this.updateContainerWidth.bind(this)
	}

	state = {
		containerWidth: 0, 
	}

	componentDidMount = () => {
		this.updateContainerWidth()

		window.addEventListener('resize', this.updateContainerWidth)
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.updateContainerWidth)
	}

	updateContainerWidth() {
		const { weekEventsContainer } = this.refs
		const daysInWeek = 7
		const dayWidth = weekEventsContainer && weekEventsContainer.offsetWidth / daysInWeek

		this.setState({ containerWidth: dayWidth })
	}

	onWeekEventClick = (e) => {
		const { initializeEventPopup } = this.props
		const eventId = e.target.getAttribute('data-id')
		
		initializeEventPopup(eventId)
	}

	getLeftOffset = (startDate) => {
		const { currentDate, format } = this.props
		const { containerWidth } = this.state
		
		// дізнатись який офсет буде в залежності від дня тижня
		const start = moment(startDate, 'D.M.YYYY H:m')
		const current = moment(currentDate, format)
		const dayOffset = start.diff(current, 'days')
		
		return dayOffset * containerWidth
	}

	getTopOffset = (startDate) => {
		const { eventFormat, hourHeight } = this.props
		const hours = moment(startDate, eventFormat).hours()
		const minutes = moment(startDate, eventFormat).minutes() / 60
		const offset = hours + minutes

		return offset * hourHeight
	}
	

	render() {
		const { events, hourHeight } = this.props
		const daysInWeek = 7
		const hoursInDay = 24

		return (
			<div className="dc-week-events" ref={'weekEventsContainer'}>
				{[...Array(daysInWeek * hoursInDay)].map((x, index) => (
					<span className="dc-week-hour" key={index} />
				))}

				{events.map(event => (
					<div 
						className="dc-week-event"
						title={`${event.title} - ${event.start}`}
						onClick={this.onWeekEventClick}
						data-id={event.id}
						style={{
							'height': Number(event.duration) * hourHeight,
							'left': this.getLeftOffset(event.start),
							'top': this.getTopOffset(event.start),
						}}
						key={event.id}
					>
						<span role="img" aria-label="jsx-a11y/accessible-emoji">{event.icon}</span>
						{event.title}
					</div>
				))}
			</div>
			
		)
	}
}
