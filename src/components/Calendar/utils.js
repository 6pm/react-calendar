/**
	* Згенерувати массив з днями місяця з офсетами на початку.
	* Наприклад, якщо 1 день місяця буде починатись в четвер, 
	* то на початку массива буде 3 елемента зі значенням false.
	* 
	*
	* firstDay(Moment object) - перший день місяця
	*/
export function getDaysInMonth(firstDay) {
	const monthAndYear = firstDay.format('M YYYY')
	const offset = [...Array(firstDay.isoWeekday() - 1).keys()]
	const days = [...Array(firstDay.daysInMonth()).keys()]
	const dates = []
	
	// заповнити місяць офсетами - для відображення відступів в тижні
	offset.forEach(i => dates.push(false))

	// заповнити датами днів тижня
	days.forEach(day => {
		dates.push(`${day+1} ${monthAndYear}`)
	})
	
	return dates
}
