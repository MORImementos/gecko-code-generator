<script>
// @ts-nocheck
  import { floatRead, floatWrite } from "$lib/stores";
  import { convertToHex, modifyAddress } from "$lib/codeGen";
  import { clickToCopyAction, messagesStore, history } from "svelte-legos";
  import { generateRandomFloat, generateRandomInt } from "$lib/helpers/helpers";

  let joinedCodes = "";
  
  let originalValues = structuredClone($floatRead)
  // initialize array of undefined values for tracking the contents of changes
  let codeArray = Array.apply(null, Array($floatRead.length)).map(function () {
    return Array.apply(null, Array($floatWrite[0].length)).map(function () {
    })
  })

  // initialize array of undefined values for tracking whether changes have occured or not
  let changedArray = Array.apply(null, Array($floatRead.length)).map(function () {
    return Array.apply(null, Array($floatWrite[0].length)).map(function () {
    })
  })

  // initialize array of undefined values for tracking codes of changed values
  $: codeGenArray = Array.apply(null, Array($floatWrite.length)).map(function () {
    return Array.apply(null, Array($floatWrite[0].length)).map(function () {
    })
  })
	
function updateArray (rIndex, cIndex, value) {
    codeArray[rIndex][cIndex] = Number(value)

    if (Number(codeArray[rIndex][cIndex]) === $floatRead[rIndex][cIndex]) {
      codeArray[rIndex][cIndex] = undefined;
      changedArray[rIndex][cIndex] = undefined;
    } else {
      changedArray[rIndex][cIndex] = true;
    }
  }

function generateCode(add, code, rIndex, cIndex) {
	let generatedCode = `${add} ${code}`;
  joinedCodes = "";

	if (Number(codeArray[rIndex][cIndex]) === $floatRead[rIndex][cIndex]) {
		generatedCode = undefined
		codeGenArray[rIndex][cIndex] = generatedCode
    console.log(codeGenArray[rIndex][cIndex])
	} else {
	  codeGenArray[rIndex][cIndex] = generatedCode;
    console.log(codeGenArray[rIndex][cIndex])

	}
  codeGenArray.forEach(row => {
    row.forEach(val => {
      if (val) {
        joinedCodes += `${val}\n`
      }
    })
  })
  // console.log(joinedCodes)
	return generatedCode
}

function handleCopyDone() {
	messagesStore("Copied!");
}

function resetAll() {
    // Reset all values to their defaults
    for (let i = 0; i < originalValues.length; i++) {
      for (let j = 0; j < originalValues[i].length; j++) {
        $floatWrite[i][j] = originalValues[i][j];
        codeArray[i][j] = undefined
        changedArray[i][j] = undefined
        codeGenArray[i][j] = undefined
        joinedCodes = ""
      }
    }
  }

function resetCell(rIndex, cIndex) {
  // Reset all values to their defaults
  $floatWrite[rIndex][cIndex] = originalValues[rIndex][cIndex];
  codeArray[rIndex][cIndex] = undefined        
	changedArray[rIndex][cIndex] = undefined
  codeGenArray[rIndex][cIndex] = undefined
  joinedCodes = ""
}

let sliceList = $floatWrite.slice(2);
let valuesOnly = sliceList.map((list) => list.slice(2, list.length - 1));

</script>
<button on:click={() => {
  generateRandomFloat(valuesOnly, -5, 5);
  // generateRandomInt(valuesOnly, 0, 1);
}}>Randomize Stats</button>
<div class="table-container">
<table class="table">
  <thead>
    <tr>
      {#if joinedCodes}
        <th class="card">
          <button use:clickToCopyAction={joinedCodes} on:copy-done={handleCopyDone}>Click to Copy</button>
          <button class="btn variant-filled-surface" on:click={resetAll}>Reset All</button>
        </th>
      {/if}
      <!-- char name -->
      <th>{$floatWrite[0][0]}</th>
      <!-- rest of headers -->
    {#each $floatWrite[0].slice(2, $floatWrite[0].length) as header}
      <th>{header}</th>
    {/each}
    </tr>
  </thead>
  <tbody>
		
	{#each $floatWrite.slice(2, $floatWrite.length) as row, rIndex}
		<tr>
      {#if joinedCodes}
        <td class="table-cell-fit"></td>
      {/if}
		  <td>{row[0]}</td>
		  {#each row.slice(2, row.length - 2) as column, cIndex}
		    <td>
        {#if changedArray[rIndex + 2][cIndex + 2] !== true}

					<input class="variant-ringed-primary input text-center" type="number" bind:value={$floatWrite[rIndex + 2][cIndex + 2]} on:input={
            updateArray(rIndex + 2, cIndex + 2, $floatWrite[rIndex + 2][cIndex + 2])} step="0.01">
					<div hidden>{resetCell(rIndex + 2, cIndex + 2)}</div>
		    {:else if changedArray[rIndex + 2][cIndex + 2] === true}
					<input class="variant-filled-error input text-center" type="number" bind:value={$floatWrite[rIndex + 2][cIndex + 2]} on:input={
            updateArray(rIndex + 2, cIndex + 2, $floatWrite[rIndex + 2][cIndex + 2])} step="0.01">
					<div hidden>{generateCode(modifyAddress($floatRead[rIndex + 2][1], $floatRead[1][cIndex + 2], 'float'), convertToHex(codeArray[rIndex + 2][cIndex + 2], 'float'), rIndex + 2, cIndex + 2)}</div>
		    {/if}
		    </td>
		  {/each}
			<!-- separate to make it easier to call function since it uses a word -->
			<td>	
        {#if changedArray[rIndex + 2][row.length - 2] !== true}
				<input class="variant-ringed-primary input text-center" type="number" bind:value={$floatWrite[rIndex + 2][row.length - 2]} on:input={updateArray(rIndex + 2, row.length - 2, $floatWrite[rIndex + 2][row.length - 2])} step="1" min="0" max="1">
		    {:else if changedArray[rIndex + 2][row.length - 2] === true}
          <input class="variant-filled-error input text-center" type="number" bind:value={$floatWrite[rIndex + 2][row.length - 2]} on:input={updateArray(rIndex + 2, row.length - 2, $floatWrite[rIndex + 2][row.length - 2])} step="1" min="0" max="1">
          <div hidden>{generateCode(modifyAddress($floatRead[rIndex + 2][1], $floatRead[1][row.length - 2], 'word'), convertToHex(codeArray[rIndex + 2][row.length - 2], 'word'), rIndex + 2, row.length - 2)}</div>
		    {/if}
			</td>
		</tr>
	{/each}
	</tbody>
</table>
</div>

    <div>
      {#each codeGenArray.slice(2) as row, ind}
        {#each row.slice(2) as col, ind2}
          {#if col}
            {col}<br/>
          {/if}
        {/each}
      {/each}
    </div>