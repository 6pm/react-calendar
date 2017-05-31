import React from 'react'

import Calendar from './../../components/Calendar/index.js'


class App extends React.PureComponent {
	render() {
		return (
			<div className="row">

				<Calendar
					defaultView={'year'}
					events={[
						{ start: '10.05.2017 14:00', duration: '2h', title: 'first event' },
						{ start: '11.05.2017 09:30', duration: '30m', title: 'second event' },
					]}
				/>
			</div>    
		)
	}
}

export default App
