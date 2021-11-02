<script lang="ts">
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte';
</script>

<svelte:head>
	<title>Mutoco-moco</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<h2 class="test">Installation</h2>

<DatePicker datePickerType="single" on:change>
	<DatePickerInput labelText="Meeting date" placeholder="mm/dd/yyyy" />
</DatePicker>

<style lang="scss">
	.test {
		color: red;

		&:hover {
			color: blue;
		}
	}
</style>
