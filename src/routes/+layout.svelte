<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
</script>

<div class="card btn-group flex text-primary-500">

	<nav>
		<!-- <button class="btn"><a href="/batting">Batting Stats</a></button>
		<button class="btn"><a href="/defense">Defensive Stats</a></button> -->
		<button class="btn"><a href="/general">General Stats</a></button>
		<!-- <button class="btn"><a href="/hitboxes">Hitboxes</a></button> -->
		<button class="btn"><a href="/floats">Batting Floats</a></button>
		<button class="btn"><a href="/chemistry">Chemistry</a></button>
	</nav>
	</div>
<slot />
