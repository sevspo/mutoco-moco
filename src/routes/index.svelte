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

	const daysUntilEvent = Math.floor(
		(eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);

	let isFormValid: boolean = false;

	let date: Date | string = new Date();

	let hasTimeError: boolean = false;

	let time = '12:00';

	let reminderDays: number = 0;

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

	function updateDaysUntilEvent(e: CustomEvent<any>) {
		reminderDays =
			(e.detail.selectedDates[0].getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
	}

	function increaseReminderDays(): void {
		// get remaining days until event

		if (reminderDays < daysUntilEvent) {
			reminderDays++;

			// increase date by one day
			if (date instanceof Date) {
				date = new Date(date.setDate(date.getDate() + 1));
			}
		}
	}

	function decreaseReminderDays(): void {
		if (reminderDays > 0) {
			reminderDays--;
			if (date instanceof Date) {
				// add one day to date
				date = new Date(date.setDate(date.getDate() - 1));
				console.log(date);
			}
		}
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
		on:change={updateDaysUntilEvent}
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

	<div class="counter">
		<button
			disabled={reminderDays <= 0}
			type="button"
			on:click={decreaseReminderDays}
			aria-label="Decrease the counter by one"
		>
			<svg aria-hidden="true" viewBox="0 0 1 1">
				<path d="M0,0.5 L1,0.5" />
			</svg>
		</button>

		<div class="counter-viewport">
			<div class="counter-digits">
				in {reminderDays} Days
			</div>
		</div>

		<button
			disabled={reminderDays >= daysUntilEvent}
			type="button"
			on:click={increaseReminderDays}
			aria-label="Increase the counter by one"
		>
			<svg aria-hidden="true" viewBox="0 0 1 1">
				<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
			</svg>
		</button>
	</div>

	<button class="button" type="submit" disabled={isFormValid}>Submit</button>
</form>

<style lang="scss">
	svg {
		width: 25%;
		height: 25%;
	}
	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: rgb(177, 125, 125);
	}
</style>
