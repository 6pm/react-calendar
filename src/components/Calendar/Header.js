import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

/**
	 * Заголовок з кнопками для управління календарем
	 * 
	 * @param {String} view - який вид календаря
	 * @param {String} format - формат вибраної дати
	 * @param {String} currentDate - дата, яка зараз вибрана
	 * @param {Function} onTogglePopup - функція для відкриття/закриття попапу для івентів
	 * @param {Function} onPressPrev - обробник нажаття кнопки "prev"
	 * @param {Function} onPressNext - обробник нажаття кнопки "next"
	 * @param {Function} onViewChange - зміна виду календаря
	 */
const Header = (props) => {
	return (
		<div className="dc-header">
			<div className="dc-header-column">
				<button onClick={props.onTogglePopup}>Add event</button>
			</div>
			
			<div className="dc-header-title dc-header-column">
				<button onClick={props.onPressPrev}>&larr;</button>
				{formatTitle(props.currentDate, props.format, props.view )}
				<button onClick={props.onPressNext}>&rarr;</button>
			</div>

			<div className="dc-header-views dc-header-column">
				<button onClick={props.onViewChange} data-value="week">Week</button>
				<button onClick={props.onViewChange} data-value="month">Month</button>
				<button onClick={props.onViewChange} data-value="year">Year</button>
			</div>
		</div>
	)
}

Header.propTypes = {
	view: PropTypes.string.isRequired,
	format: PropTypes.string.isRequired,
	currentDate: PropTypes.string.isRequired,
	onTogglePopup: PropTypes.func.isRequired,
	onPressPrev: PropTypes.func.isRequired,
	onPressNext: PropTypes.func.isRequired,
	onViewChange: PropTypes.func.isRequired,
}

export default Header


function formatTitle(currentDate, format, view) {
	let result = false

	switch (view) {
	case 'week': {
		const start = moment(currentDate, format).format('D MMM YYYY')
		const end = moment(currentDate, format).add(7, 'days').format('D MMM YYYY')
		result = `${start} - ${end}`
		break
	}
	case 'month': {
		result = moment(currentDate, format).format('MMMM YYYY')
		break
	}
	case 'year': {
		result = moment(currentDate, format).format('YYYY')
		break
	}
	default: {
		result = moment(currentDate, format).format('D MMM YYYY')
	}}

	return result
}