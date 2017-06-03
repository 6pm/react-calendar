import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const minDuration = 0.01
const maxDuration = 12
const initialFieldsState = {
	title: {
		value: '',
		valid: false,
	},
	icon: {
		value: '🗓',
	},
	id: {
		value: false,
	},
	start: {
		value: '',
		valid: false,
	},
	duration: {
		value: '',
		valid: false,
	},
}

export default class AddEvent extends React.PureComponent {

	static propTypes = {
		eventFormat: PropTypes.string.isRequired,
		onSubmitEvent: PropTypes.func.isRequired,
		onTogglePopup: PropTypes.func.isRequired,
		initData: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.bool,
		])
	}

	constructor(props) {
		super(props)

		this.updateField = this.updateField.bind(this)
	}

	componentWillMount = () => {
		const { initData } = this.props

		if(initData) {
			this.setInitData(initData)
		} else {
			this.setState(Object.assign({}, initialFieldsState))
		}
	}

	setInitData(initData) {
		this.setState({
			title: {
				value: initData.title,
				valid: true,
			},
			icon: {
				value: initData.icon,
			},
			id: {
				value: initData.id,
			},
			start: {
				value: initData.start,
				valid: true,
			},
			duration: {
				value: initData.duration,
				valid: true,
			},
		})
	}

	updateField = (e) => {
		const { eventFormat } = this.props
		const value = e.target.value
		const name = e.target.getAttribute('name')

		switch (name) {
		case 'title': {
			this.setState({
				[name]: {
					value: value,
					valid: !!value
				}
			})
			break
		}

		case 'start': {
			this.setState({
				[name]: {
					value: value,
					valid: moment(value, eventFormat, true).isValid()
				}
			})
			break
		}

		case 'duration': {
			const hours = Number(value)
			this.setState({
				[name]: {
					value: value,
					valid: hours && hours > minDuration && hours < maxDuration
				}
			})
			break
		}

		default: {
			this.setState({
				[name]: {
					value: value,
				}
			})
		}
		}
	}

	formNotValid() {
		const { title, start, duration } = this.state

		return ![ title, start, duration ].every(input => input.valid)
	}

	submitForm() {
		const { onSubmitEvent, onTogglePopup } = this.props
		const data = this.prepareFormData()

		onSubmitEvent(data)
		onTogglePopup()
	}

	prepareFormData() {
		const { title, icon, start, duration, id } = this.state
		const data = {
			title: title.value,
			icon: icon.value,
			start: start.value,
			duration: duration.value,
		}

		if (id.value) {
			data.id = id.value
		}

		return data

	}

	render() {
		const { onTogglePopup } = this.props
		const { title, icon, start, duration } = this.state

		return (
			<div className="dc-popup-wrap">
				<form 
					className="dc-popup"
					onSubmit={(e) => {
						this.submitForm()
						e.preventDefault()
					}}
				>
					<i onClick={onTogglePopup} className="dc-popup-close" title="close">x</i>
					
					<h2 className="dc-popup-title">Create event</h2>

					<div className="dc-popup-row">
						<label className="dc-popup-row-name" htmlFor="dc-popup-title">Title</label>
						<div className="dc-popup-row-value">
							<input onChange={this.updateField} value={title.value} name="title" id="dc-popup-title" />
							{!title.valid && (
								<span className="dc-popup-error">Title is required</span>
							)}
						</div>
					</div>

					<div className="dc-popup-row">
						<label className="dc-popup-row-name" htmlFor="dc-popup-icon">Icon</label>
						<div className="dc-popup-row-value">
							<input onChange={this.updateField} value={icon.value} name="icon" id="dc-popup-icon" />
							<span className="dc-popup-msg">You can copy emoji from <a href="http://getemoji.com/">emoji list</a> and paste into input</span>
						</div>
					</div>

					<div className="dc-popup-row">
						<label className="dc-popup-row-name" htmlFor="dc-popup-start">Start date</label>
						<div className="dc-popup-row-value">
							<input onChange={this.updateField} value={start.value} name="start" id="dc-popup-start" />
							{!start.valid && (
								<span className="dc-popup-error">Must be in format "D.M.YYYY H:m"</span>
							)}
						</div>
					</div>

					<div className="dc-popup-row">
						<label className="dc-popup-row-name" htmlFor="dc-popup-duration">Duration</label>
						<div className="dc-popup-row-value">
							<input 
								onChange={this.updateField} value={duration.value} name="duration" type="number" id="dc-popup-duration" />
							{!duration.valid && (
								<span className="dc-popup-error">Must be in format "H.m" and not greater {maxDuration} hours</span>
							)}
						</div>
					</div>
						
					<button type="submit" disabled={this.formNotValid()} >Submit</button>
				</form>
			</div>
		)
	}
}
