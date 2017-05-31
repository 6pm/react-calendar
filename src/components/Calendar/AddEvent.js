import React from 'react'

class AddEvent extends React.PureComponent {

	render() {
		const { onTogglePopup } = this.props

		return (
			<div className="dc-popup-wrap">
				<span onClick={onTogglePopup}>close</span>
				
				<form className="dc-popup">
						Birthday:
						<h2>add event</h2>
						<input type="number" placeholder="start" />
						<input type="date" name="bday" />
						<input type="submit" />
					</form>
			</div>
		)
	}
}

export default AddEvent
