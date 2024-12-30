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
		<button class="btn"><a href="{base}/batting/floats">Character Ranges</a></button>	
		<button class="btn"><a href="{base}/batting/exitVelocity">Exit Velocity</a></button>	
		<button class="btn"><a href="{base}/batting/HAngles">Horizontal Ranges</a></button>	
		<button class="btn"><a href="{base}/batting/hTrajMultipliers">Horizontal Power Multipliers</a></button>	
		<button class="btn"><a href="{base}/batting/curveEffects">Curve</a></button>	
		<button class="btn"><a href="{base}/batting/RegularVAngles">Vertical Ranges</a></button>		
		<button class="btn"><a href="{base}/batting/VRangeProbabilities">Vertical Probabilities</a></button>		
		<button class="btn"><a href="{base}/batting/StarVAngles">Star Vertical Ranges</a></button>
		<button class="btn"><a href="{base}/batting/battingMisc">Other</a></button>	
	</nav>
</div>
<slot />