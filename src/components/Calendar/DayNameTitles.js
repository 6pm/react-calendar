import React from 'react'
import PropTypes from 'prop-types'

const DayNameTitles = (props) => {
	const names = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

	return (
		<div className="dc-view-year-names">
			{names.map(name => (
				<span className="dc-view-year-day" key={name}>{name}</span>
			))}
		</div>  
	)
}

DayNameTitles.propTypes = {
	wrapperClass: PropTypes.string,
	itemClass: PropTypes.string,
}

export default DayNameTitles