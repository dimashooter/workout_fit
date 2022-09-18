export const makeDate = () => {
	let date = new Date();
	let month = date.getMonth() < 10 ? '0' + date.getMonth().toString() : date.getMonth();
	let day = date.getDay() < 10 ? '0' + date.getDay().toString() : date.getDay();
	let min = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes();
	let currentTime = month + ' ' + day + ' ' + date.getHours() + ':' + min + ':' + date.getSeconds();
	return currentTime;
};
