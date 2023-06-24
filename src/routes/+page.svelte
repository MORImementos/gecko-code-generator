<script lang="ts">
	import { convertToHex } from "$lib/codeGen";
	import { floatRead, floatWrite } from "$lib/stores";
	import { derived, writable } from "svelte/store";
	
	const byte = 'byte'
	const word = 'word'
	const short = 'short'
	const float = 'float'
	const halfword = 'halfword'

	let modifiedAddress = '';
    let currentCode = '';

	const generatedCodes = writable<string[]>([]);
	// function addGeneratedCode(code: string, rowIndex:number,) {
    // 	generatedCodes.set((codes: any) => [...codes, code]);
  	// }
	function addGeneratedCode(code: string, rowIndex: number, columnIndex: number) {
		generatedCodes.update((codes) => {
			const updatedCodes = [...codes];
			// console.log($generatedCodes)
			if (!updatedCodes[rowIndex]) {
			// console.log(updatedCodes[rowIndex])
			updatedCodes[rowIndex] = [];
			}
			updatedCodes[rowIndex][columnIndex] = code;
			// console.log(updatedCodes)
			return updatedCodes;
		});
	}

	const change = derived([floatRead, floatWrite], ([$floatRead, $floatWrite]) => {
	  return $floatRead.flat().join() !== $floatWrite.flat().join();
	});
  
	function resetInput(rowIndex: number, columnIndex: number) {
	  const value = $floatRead[rowIndex + 2][columnIndex + 2];
	  $floatWrite[rowIndex + 2][columnIndex + 2] = value;
	  $generatedCodes[rowIndex + 2][columnIndex + 2] = undefined
	  
	}

	

	function modifyAddress(add: number, offset: number, codeType: string = "byte") {
		let codePrefix = "";
		if (codeType === "byte") {
		codePrefix = "00";
	} else if (codeType === "short" || codeType === "halfword") {
		codePrefix = "02";
	} else if (codeType === "float" || codeType === "word") {
		codePrefix = "04";
	}
	const modifiedAddress = (parseInt(add, 16) + offset).toString(16).replace(/^80/, codePrefix).toUpperCase();
	return modifiedAddress;
	}
	
	const hasChanges = derived([floatRead, floatWrite], ([$floatRead, $floatWrite]) => {
    return $floatRead.flat().join() !== $floatWrite.flat().join();
  });

  function resetAll() {
    // Reset all values to their defaults
    for (let i = 0; i < $floatRead.length; i++) {
      for (let j = 0; j < $floatRead[i].length; j++) {
        $floatWrite[i][j] = $floatRead[i][j];
		$generatedCodes[i][j] = undefined
      }
    }
  }

//   function genCode(add: string, code: string, rowIndex: number, columnIndex: number) {
//     const generatedCode = `${add} ${code}`;
//     generatedCodes.update((codes) => [...codes, generatedCode]);
//     return generatedCode;
//   }
// function genCode(add: string, code: string, rowIndex: number, columnIndex: number) {
//   let generatedCode = `${add} ${code}`;
//   if ($floatRead[rowIndex + 2][columnIndex + 2] === $floatWrite[rowIndex + 2][columnIndex + 2]) {
// 	generatedCode = ""
//   }
//   addGeneratedCode(generatedCode, rowIndex, columnIndex);
//   return generatedCode;
// }

function genCode(add: string, code: string, rowIndex: number, columnIndex: number) {
  let generatedCode = `${add} ${code}`;
  const isStartingValue = $floatRead[rowIndex + 2][columnIndex + 2] === $floatWrite[rowIndex + 2][columnIndex + 2];
//   console.log(isStartingValue)
  if (isStartingValue) {
    generatedCode = '';
  }
  
  addGeneratedCode(generatedCode, rowIndex, columnIndex);
//   console.log(generatedCode);
  return generatedCode;
}




</script>

<div class="flex justify-center items-center h-100vh p-4">
	{#if floatWrite}
		<div class="table-container card variant-ghost-primary text-token h-[100%] w-[100%] flex flex-col">
			{#if $hasChanges}
				<button class="btn btn-sm variant-filled-primary w-[10%] m-2 p-2" on:click={resetAll}>
			  		Reset All
				</button>
		  	{/if}			
			<table class="table table-hover table-interactive table-compact flex  table-auto  justify-center align-middle w-auto p-4 m-4">
				<thead class="flex-auto variant-ringed-primary">
					<tr class="flex-auto variant-ringed-primary">
						<th class="flex-auto text-center variant-ringed-primary">{$floatWrite[0][0]}</th>
						{#each $floatWrite[0].slice(2) as header}
							<th class="column-width flex-auto text-center variant-ringed-primary">{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="flex-auto variant-ringed-primary">
					{#each $floatWrite.slice(2) as row, rowIndex}
						<tr class="flex-auto">
							<td class="table-cell-fit flex-auto justify-center items-center text-center ">{row[0]}</td>
							{#each row.slice(2, row.length - 1) as stat, columnIndex}
								<td class="flex-column">
									<div class="flex-col flex">
								{#if $floatWrite[0][columnIndex + 2] === "Trimmed Bat"}
									<input class="variant-ghost-primary input text-center" type="number" bind:value={$floatWrite[rowIndex + 2][columnIndex + 2]} step="1" min="0" max="1" />
									{#if $floatRead[rowIndex + 2][columnIndex + 2] !== $floatWrite[rowIndex + 2][columnIndex + 2]}
										<button class="btn btn-sm variant-filled-primary flex-auto m-2 p-2" on:click={() => resetInput(rowIndex, columnIndex)}>Reset</button>
										<!-- <div>{modifyAddress($floatRead[rowIndex + 2][1], $floatRead[1][columnIndex + 2], word)} {convertToHex($floatWrite[rowIndex + 2][columnIndex + 2], word).toUpperCase()}</div>	 -->
										<div>{genCode(modifyAddress($floatRead[rowIndex + 2][1], $floatRead[1][columnIndex + 2], word), convertToHex($floatWrite[rowIndex + 2][columnIndex + 2], word).toUpperCase(), rowIndex, columnIndex)}</div>
																		
									{/if}
								{:else}
									<input class="variant-ghost-primary input text-center" type="number" bind:value={$floatWrite[rowIndex + 2][columnIndex + 2]} step="0.01" />
									{#if $floatRead[rowIndex + 2][columnIndex + 2] !== $floatWrite[rowIndex + 2][columnIndex + 2]}
										<button class="btn btn-sm variant-filled-primary" on:click={() => resetInput(rowIndex, columnIndex)}>Reset</button>
										<div>{genCode(modifyAddress($floatRead[rowIndex + 2][1], $floatRead[1][columnIndex + 2], float), convertToHex($floatWrite[rowIndex + 2][columnIndex + 2], float).toUpperCase(), rowIndex, columnIndex)}</div>
										
									{/if}

								{/if}
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	<div>
		Generated Codes:
		{#each $generatedCodes as code}
		<div>{code}</div>
		{/each}
	  </div>

	<!-- <div>{$generatedCodes}</div> -->

</div>


<style>
	.column-width {
		width: calc(100% / 10);
	}

</style>