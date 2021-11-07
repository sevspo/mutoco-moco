<script lang="ts">
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte/src/DatePicker';
	import { TimePicker, TimePickerSelect } from 'carbon-components-svelte/src/TimePicker';
	import { SelectItem } from 'carbon-components-svelte/src/Select';
	import ClockSvg from '$lib/clock-svg.svelte';

	const eventDate = new Date('12-17-2021 18:00');
	const eventDateString = eventDate.toDateString();
	const eventTimeString = eventDate.toLocaleTimeString();

	const minDate = new Date();
	const maxDate = eventDate;

	const daysUntilEvent = Math.floor(
		(eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);

	let isFormInvalid: boolean = false;

	let date: Date | string = new Date();

	let hasTimeError: boolean = false;

	let time = '12:00';

	let email: string = '';

	let reminderDays: number = 0;

	$: {
		if (!isValidTime(time)) {
			hasTimeError = true;
		} else {
			hasTimeError = false;
		}

		if (time === '' || date === '' || email === '') {
			isFormInvalid = true;
		} else {
			isFormInvalid = false;
		}
	}

	// function to check if timestring is valid
	function isValidTime(timeString: string): boolean {
		const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
		return timeRegex.test(timeString);
	}

	function updateDaysUntilEvent(e: CustomEvent<any>) {
		reminderDays = Math.floor(
			(e.detail.selectedDates[0].getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
		);
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
			}
		}
	}

	function handleSubmit(e) {
		if (date instanceof Date) {
			// const reminderDate = new Date(`${date.toDateString()} ${time}`);
			alert(`On ${date.toDateString()} at ${time} a reminder will be sent to ${email}!`);
		}
	}
</script>

<svelte:head>
	<title>Mutoco-Moco</title>
</svelte:head>

<div class="main-container">
	<section class="event-info">
		<div class="content content-left">
			<div class="subtitle">Letzigrund Stadion, Zurich</div>
			<div class="title">
				<h2>The Rolling Stones</h2>
				<div class="badge">top event</div>
			</div>
			<div class="caption">
				The stones roll through Europe this winter - The Rolling Stones will play at the Letzigrund
				stadium on Friday, Dec 17 2021. On their “On Fire” tour, they will also make a stop in
				Zurich at the beginning of the winter... A heater and ticket prices are not yet known. We
				will inform you here and on social media. So check back from time to time.
			</div>
			<div class="date-info">
				<div class="date-title">
					<ClockSvg />
					<div class="title">Event Date</div>
					<div class="event-date">{eventDateString} | {eventTimeString}</div>
				</div>
			</div>
		</div>
		<div class="content content-right">
			<img
				srcset="../static/event-pic-mobile.jpg 580w, 
								../static/event-pic-desktop.jpg 800w"
				sizes="(max-width: 420px) 420px"
				src="../static/event-pic-desktop.jpg"
				alt="party-pic"
				class="event-img"
			/>
		</div>
	</section>
	<div class="separator" />
	<section class="reminder-form">
		<div class="form-title">Set a check back reminder</div>
		<form on:submit|preventDefault={handleSubmit}>
			<DatePicker
				aria-label="Date picker"
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
				aria-label="Time picker"
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

			<input
				aria-label="email"
				type="email"
				bind:value={email}
				maxlength="50"
				required
				placeholder="Enter your email"
			/>

			<button aria-label="sumit" class="button" type="submit" disabled={isFormInvalid}
				>Submit</button
			>
		</form>
	</section>
</div>

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
