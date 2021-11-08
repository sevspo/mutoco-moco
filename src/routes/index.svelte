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
			<div class="event-title">
				<h2>The Rolling Stones</h2>
				<div class="badge">
					<div class="badge-text">top event</div>
				</div>
			</div>
			<div class="caption">
				The stones roll through Europe this winter - The Rolling Stones will play at the Letzigrund
				stadium on Friday, Dec 17 2021. On their “On Fire” tour, they will also make a stop in
				Zurich at the beginning of the winter... A heater and ticket prices are not yet known. We
				will inform you here and on social media. So check back from time to time.
			</div>
			<div class="date-info">
				<div class="date-info-wrapper">
					<div class="date-title">
						<ClockSvg />
						<div class="text">Event Date</div>
					</div>
					<div class="event-date">{eventDateString} | {eventTimeString}</div>
				</div>
			</div>
		</div>
		<div class="content content-right">
			<img
				srcset="/event-pic-mobile.jpg 580w, 
								/event-pic-desktop.jpg 800w"
				sizes="(max-width: 420px) 400px
							 (min-width: 421px) 768px"
				src="/event-pic-desktop.jpg"
				alt="party-pic"
				class="event-img"
			/>
		</div>
	</section>
	<div class="separator" />
	<section class="reminder-form">
		<div class="form-title">Set a check back reminder</div>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="date-inputs">
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

				<div class="time-picker">
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
				</div>

				<div class="counter">
					<div class="button-wrapper">
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
					</div>

					<div class="counter-viewport">
						<div class="counter-digits">
							in {reminderDays} Days
						</div>
					</div>

					<div class="button-wrapper">
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
				</div>
			</div>

			<input
				aria-label="email"
				class="email-input"
				type="email"
				bind:value={email}
				maxlength="50"
				required
				placeholder="Enter your email"
			/>

			<button
				aria-label="sumit"
				class="submit-button"
				type="submit"
				disabled={isFormInvalid}
				enterkeyhint="done">Submit</button
			>
		</form>
	</section>
</div>

<style lang="scss">
	@import '../styles/variables.scss';

	.event-info {
		margin: $whitespace-xl 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: clamp(80px, 6vw, 130px);
	}

	.content-left {
		flex: 2;
	}

	.content-right {
		flex: 1.5;

		.event-img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: $border-radius;
		}
	}

	@media (max-width: $breakpoint-m) {
		.content-left,
		.content-right {
			flex: 1 1 100%;
		}

		.content-left {
			order: 2;
		}

		.content-right {
			order: 1;
		}
	}

	.subtitle {
		color: $sub-color;
		margin-bottom: $whitespace-xs;
	}

	.event-title {
		display: flex;
		align-items: center;
		margin-bottom: $whitespace-m;

		.badge {
			background-color: $color-primary;
			color: $color-white;
			height: 30px;
			padding: 0 $whitespace-xs;
			border-radius: 10px;
			margin-left: $whitespace-xs;

			display: flex;
			align-items: center;

			.badge-text {
				font-size: 14px;
				white-space: nowrap;
			}
		}
	}

	.date-info {
		margin-top: $whitespace-l;
		background-color: $color-text;
		color: $color-white;
		border-radius: $border-radius;
		height: 130px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.date-title {
			text-align: left;
			display: flex;
			align-items: center;
		}

		.text {
			margin-left: $whitespace-xs;
		}

		.event-date {
			font-size: 25px;
			font-weight: bold;

			@media (max-width: $breakpoint-m) {
				font-size: 20px;
			}
		}
	}

	.separator {
		width: 100%;
		height: 1px;
		background-color: $separtor-color;
	}

	.reminder-form {
		margin-top: $whitespace-xl;

		.form-title {
			font-size: 25px;
			margin-bottom: $whitespace-m;
		}

		.date-inputs {
			display: flex;
			flex-wrap: wrap;
			gap: $whitespace-s;
			margin-bottom: $whitespace-s;
		}

		@media (max-width: $breakpoint-m) {
			.date-inputs {
				> * {
					flex: 1 1 100%;
				}
			}
		}

		.counter {
			display: flex;
			align-items: center;
			background-color: $input-bg-color;
			gap: $whitespace-l;
			height: $input-height;
			padding: 0 $whitespace-s;
			border-radius: $border-radius;
			font-size: $input-font-size;

			&:focus-within {
				outline: 2px solid $color-secondary;
			}

			button {
				width: 30px;
				height: 30px;
				border-radius: 50%;
				border: none;
				background-color: $color-white;
				font-size: 25px;
				font-weight: bold;
				cursor: pointer;
				outline: none;
				transition: all 0.2s ease-in-out;

				&:disabled {
					opacity: 0.5;
					cursor: not-allowed;
					&:hover {
						background-color: $color-white;
					}
				}

				&:hover {
					background-color: $color-secondary;
				}

				&:active {
					filter: brightness(0.6);
				}

				svg {
					path {
						stroke: $color-text;
					}
					width: 100%;
					height: 100%;
				}
			}

			.counter-viewport {
				min-width: 100px;
				text-align: center;

				@media (max-width: $breakpoint-m) {
					width: 100%;
				}
			}
		}

		.email-input {
			width: 100%;
			height: $input-height;
			background-color: $input-bg-color;
			border-radius: $border-radius;
			border: transparent;
			padding: 0 $whitespace-s;
			font-size: $input-font-size;
			margin-bottom: $whitespace-s;

			&:focus {
				outline: 2px solid $color-secondary;
			}
		}

		.submit-button {
			margin-bottom: $whitespace-m;
			width: 100%;
			height: $input-height;
			background-color: $color-primary;
			border-radius: $border-radius;
			font-size: $input-font-size;
			color: $color-white;
			border: none;

			&:disabled {
				// opacity: 0.5;
				background-color: $input-bg-color;
				cursor: not-allowed;
				color: $color-text;
			}
		}
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: rgb(177, 125, 125);
	}
</style>
