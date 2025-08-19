<script lang="ts">
	import { enhance } from '$app/forms';

	let newsDeleted = false;
	let newsCreated = false;
	let updateNews = false;
	let title: string = '';
	let description: string = '';
	let id: string = '';

	export let data;
	export let form;

	$: {
		if (form?.addedPost === 'success') {
			newsDeleted = false;
			newsCreated = true;
		}
		if (form?.deletedPost === 'success') {
			newsDeleted = true;
			newsCreated = false;
		}
		if (form?.updatedPost === 'success') {
			updateNews = false;
		}
	}

	function editNews(postId: any, postTitle: string, postDescription: string) {
		id = postId;
		title = postTitle;
		description = postDescription;
		updateNews = true;
		newsDeleted = false;
		newsCreated = false;
	}
</script>

<div>
	<!-- Message Display -->
	{#if newsDeleted}
		<div class="success-message mb-4">
			<p>News was deleted!</p>
		</div>
	{/if}
	{#if newsCreated}
		<div class="success-message mb-4">
			<p>News was successfully created!</p>
		</div>
	{/if}
	<!-- Newsfeed -->
	{#if data?.news.length > 0}
		<div class="mb-8 flex flex-col gap-4">
			<p class="subheading">All News</p>
			<!-- News Boxes -->
			{#each data?.news as newsbox}
				<div class="newsbox">
					<div class="flex gap-4">
						<p class="font-semibold">{newsbox.title}</p>
						<p>{newsbox.description}</p>
					</div>
					<div class="iconbar">
						<!-- update Button-->
						<button on:click={editNews(newsbox.id, newsbox.title, newsbox.description)}>
							<img class="icon" src="./pencil.svg" alt="pencil" />
						</button>
						<!-- delte Button -->
						<form action="?/deletePost" method="post" use:enhance>
							<input type="hidden" name="id" value={newsbox.id} />
							<button type="submit">
								<img class="icon" src="./close.svg" alt="close" />
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	{/if}
	<div class="flex flex-col gap-4">
		<!-- Create News-->
		{#if !updateNews}
			<p class="subheading">Create News</p>
			<form action="?/addPost" method="post" use:enhance>
				<div class="flex flex-col gap-4">
					<input class="input" type="text" placeholder="Title" name="title" bind:value={title} />
					<input
						class="input"
						type="textarea"
						placeholder="Description"
						name="description"
						bind:value={description}
					/>
					<button type="submit" class="button">Create</button>
				</div>
			</form>
		{:else}
			<!-- Edit News -->
			<p class="subheading">Edit News</p>
			<form action="?/updatePost" method="post" use:enhance>
				<div class="flex flex-col gap-4">
					<input type="hidden" name="id" bind:value={id} />
					<input class="input" type="text" placeholder="Title" name="title" bind:value={title} />
					<input
						class="input"
						type="textarea"
						placeholder="Description"
						name="description"
						bind:value={description}
					/>
					<button type="submit" class="button">Save</button>
				</div>
			</form>
		{/if}
		<!-- Logout -->
		<form action="?/logout" method="post" use:enhance>
			<button type="submit" class="button">Logout</button>
		</form>
	</div>
</div>
