<script lang="ts">
		// The ordering of these imports is critical to your app working properly
		import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import { base } from '$app/paths'
</script>

<div class="card btn-group flex text-primary-500">
	<nav>
		<button class="btn"><a href="{base}/hitboxes/characters">Character Hitboxes</a></button>	
		<button class="btn"><a href="{base}/hitboxes/hitboxMisc">Minimums and Scalers</a></button>	
	</nav>
</div>
<div class="flex text-primary-500">
	Hitboxes are calculated as Global Scaler*Character Scaler*Hitbox Value, and then a minimum of Global Scaler * Hitbox Minimum Value is applied.<br>
	Air or Hard Grounder Radius: The radius around a fielder to catch a ball when the ball is in the air, or the ball is a fast-moving grounder.<br>
	Slow Grounder Radius: The radius around a fielder to catch a ball when the ball is a slow-moving grounder.<br>
	Air or Hard Grounder Centered Radius: For fly balls or fast-moving grounders, if the ball is caught within this radius, then the bobble chances are lower.<br>
	Height: The height of the fielder's hitbox.<br>
	Dive Range: Added tange between the fielder's position and the landing spot for catching balls while diving.<br>
	Height for Infield Dives: When a fielder is diving for a line-drive, the game checks if the ball's trajectory has a height lower than this value when the ball's ground position is within the dive range.
</div>
<slot />