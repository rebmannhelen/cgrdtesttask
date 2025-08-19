<script lang="ts">
	import Login from './components/login.svelte';
	import Newsfeed from './components/newsfeed.svelte';

	let falseAttempt = false
	let login = false
	
	export let form:any
	export let data:any

	$: {
		if (form?.validUser == false) falseAttempt = true
		if (form?.validUser == true) login = true
		if (form?.logout == true) login = false
	}

</script>

<div class="background">
	<div class="content">
		<div class="logo">
			<img src="/logo.svg" alt="logo" />
		</div>
		{#if !login}
			<Login {falseAttempt}/>
		{:else}
			<Newsfeed {data} {form}/>
		{/if}
	</div>
</div>
