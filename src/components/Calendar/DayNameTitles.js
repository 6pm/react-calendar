import React from 'react'
import PropTypes from 'prop-types'

/**
	 * Отримати назви місяців в скороченому вигляді
	 * 
	 * @param {String} wrapperClass - назва класу, який огортає компонент
	 * @param {String} itemClass - назва класу, який додається до кожного елемента місяця
	 */
const DayNameTitles = (props) => {
	const names = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

	return (
		<div className={props.wrapperClass}>
			{names.map(name => (
				<span className={props.itemClass} key={name}>{name}</span>
			))}
		</div>  
	)
}

DayNameTitles.propTypes = {
	wrapperClass: PropTypes.string,
	itemClass: PropTypes.string,
}

export default DayNameTitles
