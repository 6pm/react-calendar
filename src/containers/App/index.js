import React from 'react'

import Calendar from './../../components/Calendar/index.js'


class App extends React.PureComponent {
	render() {
		return (
			<div className="row">

				<Calendar
					view={'week'}
					// currentDate={'1 5 2018'}
					events={[
						{ id: '1df1s', start: '29.05.2017 6:00', duration: '1.5', title: 'go to gym', icon: '💪' },
						{ id: '1asdf', start: '29.05.2017 8:00', duration: '0.5', title: 'eat', icon: '🍗' },
						{ id: '11df1', start: '29.05.2017 9:00', duration: '5', title: 'make money', icon: '💵' },
						{ id: 'sdf11', start: '29.05.2017 14:20', duration: '2', title: 'buy new shoes', icon: '👟' },
						{ id: 'ldll2', start: '29.05.2017 16:50', duration: '2', title: 'play PS4', icon: '🎮' },
						{ id: 'sdf00', start: '29.05.2017 19:10', duration: '0.4', title: 'dinner', icon: '🍕' },
						{ id: '45mm5', start: '29.05.2017 22:00', duration: '2', title: 'go to rest', icon: '💤' },
						{ id: '2ds2s', start: '30.05.2017 8:00', duration: '2', title: 'play with son', icon: '🏀' },
						{ id: '24ll4', start: '30.05.2017 12:00', duration: '1', title: 'win dev-challenge)', icon: '🥇' },
						{ id: '3sd3z', start: '1.06.2017 16:30', duration: '4', title: 'drink with cowockers', icon: '🍾' },
					]}
				/>
			</div>    
		)
	}
}

export default App
