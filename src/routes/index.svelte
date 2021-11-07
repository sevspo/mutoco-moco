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

	let invalid: boolean = false;

	let value: Date = new Date();
</script>

<svelte:head>
	<title>Mutoco-moco</title>
</svelte:head>

<div>{eventDateString} | {eventTimeString}</div>

<DatePicker datePickerType="single" bind:value dateFormat="d.m.Y" {maxDate} {minDate}>
	<DatePickerInput placeholder="Bitte Datum eingeben" />
</DatePicker>

<TimePicker placeholder="hh:mm">
	<!-- <TimePickerSelect value="PM">
		<SelectItem value="am" text="AM" />
		<SelectItem value="pm" text="PM" />
	</TimePickerSelect> -->
</TimePicker>

<!-- <input type="date" class="input-date" title="date" aria-label="Reminder Date" /> -->

<!-- <input type="time" class="input-date" title="date" aria-label="Reminder Date" /> -->
<style lang="scss">
</style>
