<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { base } from '$app/paths'
</script>

<div class="card btn-group flex text-primary-500">

	<nav>
		<!-- <button class="btn"><a href="/batting">Batting Stats</a></button>
		<button class="btn"><a href="/defense">Defensive Stats</a></button> -->
		<button class="btn"><a href="{base}/general">Character Stats</a></button>
		<!-- <button class="btn"><a href="/hitboxes">Hitboxes</a></button> -->
		<button class="btn"><a href="{base}/floats">Batting Floats</a></button>
		<button class="btn"><a href="{base}/chemistry">Chemistry</a></button>
		<button class="btn"><a href="{base}/battingLaunchAngles/RegularAngles">Batting Launch Angles</a></button>
		<button class="btn"><a href="{base}/battingMisc">Other Batting</a></button>
		<button class="btn"><a href="{base}/mgtt-game/star">MGTT Star Characters</a></button>
	</nav>
	</div>
<slot />
