<script lang="ts">
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte/src/DatePicker';
	// import { DatePicker } from 'attractions';
</script>

<svelte:head>
	<title>Mutoco-moco</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="container">
	<DatePicker class="date-picker" datePickerType="single" on:change dateFormat="d.m.Y">
		<DatePickerInput labelText="Meeting date" placeholder="dd.mm.yyyy" />
	</DatePicker>
</div>

<!-- <input type="date" class="input-date" title="date" aria-label="Reminder Date" /> -->

<!-- <input type="time" class="input-date" title="date" aria-label="Reminder Date" /> -->
<style lang="scss">
</style>
