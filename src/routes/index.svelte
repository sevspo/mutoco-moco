<script lang="ts">
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte/src/DatePicker';
	import { TimePicker, TimePickerSelect } from 'carbon-components-svelte/src/TimePicker';
	import { SelectItem } from 'carbon-components-svelte/src/Select';

	// import { DatePicker } from 'attractions';

	const eventDate = new Date('12-17-2021 18:00');
	const eventDateString = eventDate.toDateString();
	const eventTimeString = eventDate.toLocaleTimeString();

	const minDate = new Date();
	const maxDate = eventDate;

	let isFormValid: boolean = false;

	let date: Date | string = new Date();

	let hasTimeError: boolean = false;

	let time = '12:00';

	// regex pattern for european date format
	// const datePattern =
	// /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

	$: {
		if (!isValidTime(time)) {
			hasTimeError = true;
		} else {
			hasTimeError = false;
		}

		if (time === '' || date === '') {
			isFormValid = true;
		} else {
			isFormValid = false;
		}
	}

	// function to check if timestring is valid
	function isValidTime(timeString: string): boolean {
		const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
		return timeRegex.test(timeString);
	}

	function handleSubmit(e) {
		if (date instanceof Date) {
			const reminderDate = new Date(`${date.toDateString()} ${time}`);
			console.log(reminderDate);
		}
	}

	// function createTimeFromString(timeString: string): number {
	// 	const [h, m, s] = timeString.split(':');
	// 	const hms = parseInt(h, 10) * 1000 * 60 * 60;
	// 	const mms = parseInt(m, 10) * 1000 * 60;
	// 	const sms = parseInt(s, 10) * 1000;
	// 	return hms + mms + sms;
	// }
</script>

<svelte:head>
	<title>Mutoco-Moco</title>
</svelte:head>

<div>{eventDateString} | {eventTimeString}</div>

<form on:submit|preventDefault={handleSubmit}>
	<DatePicker
		datePickerType="single"
		bind:value={date}
		dateFormat="d.m.Y"
		{maxDate}
		{minDate}
		required
	>
		<DatePickerInput placeholder="Bitte Datum eingeben" pattern=".*" />
	</DatePicker>

	<TimePicker
		bind:value={time}
		placeholder="hh:mm"
		maxlength="5"
		invalid={hasTimeError}
		invalidText="Bitte korrekte uhrzeit eingeben"
		pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
		required
	>
		<!-- <TimePickerSelect value="PM">
			<SelectItem value="am" text="AM" />
			<SelectItem value="pm" text="PM" />
		</TimePickerSelect> -->
	</TimePicker>

	<button class="button" type="submit" disabled={isFormValid}>Submit</button>
</form>

<style lang="scss">
</style>
