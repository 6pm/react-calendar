import React from 'react'

import './index.css'

const Header = (props) => {
	return (
		<div className="dc-header">
			<div className="dc-header-column">
				<button onClick={props.onTogglePopup}>Add event</button>
			</div>
			
			<div className="dc-header-title dc-header-column">
				<button onClick={props.onPressPrev}>&larr;</button>
				{props.currentDate}
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

export default Header