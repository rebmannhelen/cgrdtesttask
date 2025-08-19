<script>
	import { enhance } from '$app/forms';

	let username = '';
	let password = '';

	export let falseAttempt;
</script>

<form action="?/login" method="post" use:enhance>
	<div class="flex flex-col gap-4">
		{#if falseAttempt}
			<div class="error-message">
				<p>Wrong Login Data!</p>
			</div>
		{/if}
		<input
			class="input"
			type="text"
			placeholder="Username"
			id="username"
			name="username"
			bind:value={username}
		/>
		<input
			class="input"
			type="text"
			placeholder="Password"
			id="password"
			name="password"
			bind:value={password}
		/>
		<button class="button" type="submit">Login</button>
	</div>
</form>
