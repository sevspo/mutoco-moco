<script lang="ts">
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte/src/DatePicker';
	// import { DatePicker } from 'attractions';
</script>

<svelte:head>
	<title>Mutoco-moco</title>
</svelte:head>

<DatePicker datePickerType="single" on:change dateFormat="d.m.Y">
	<DatePickerInput placeholder="dd.mm.yyyy" />
</DatePicker>

<div class="container">
	<h1 class="test">Fucker</h1>
</div>

<!-- <input type="date" class="input-date" title="date" aria-label="Reminder Date" /> -->

<!-- <input type="time" class="input-date" title="date" aria-label="Reminder Date" /> -->
<style lang="scss">
</style>
