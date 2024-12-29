<script>
      // @ts-nocheck
        import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
        import { battingMiscRead, battingMiscWrite } from "$lib/stores";
        import { convertToHex, modifyAddress } from "$lib/codeGen";
        import { clickToCopyAction } from "svelte-legos";
        import { base } from "$app/paths";
        import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
        let joinedCodes = "";
        
        let originalValues = structuredClone($battingMiscRead)
      
        // initialize array of undefined values for tracking the contents of changes
        let codeArray = Array.apply(null, Array($battingMiscRead.length)).map(function () {
          return Array.apply(null, Array($battingMiscWrite[0].length)).map(function () {
          })
        })
      
        // initialize array of undefined values for tracking whether changes have occured or not
        let changedArray = Array.apply(null, Array($battingMiscRead.length)).map(function () {
          return Array.apply(null, Array($battingMiscWrite[0].length)).map(function () {
          })
        })
      
        // initialize array of undefined values for tracking codes of changed values - 
        $: codeGenArray = Array.apply(null, Array($battingMiscWrite.length)).map(function () {
          return Array.apply(null, Array($battingMiscWrite[0].length)).map(function () {
          })
        })
            
      function updateArray (rIndex, cIndex, value) {
          codeArray[rIndex][cIndex] = Number(value)
      
          if (Number(codeArray[rIndex][cIndex]) === $battingMiscRead[rIndex][cIndex]) {
            codeArray[rIndex][cIndex] = undefined;
            changedArray[rIndex][cIndex] = undefined;
          } else {
            changedArray[rIndex][cIndex] = true;
          }
        }
      
      function generateCode(add, code, rIndex, cIndex) {
            let generatedCode = `${add} ${code}`;
        joinedCodes = "";
      
            if (Number(codeArray[rIndex][cIndex]) === $battingMiscRead[rIndex][cIndex]) {
                  generatedCode = undefined
                  codeGenArray[rIndex][cIndex] = generatedCode
      
            } else {
              codeGenArray[rIndex][cIndex] = generatedCode;
      
            }
        codeGenArray.forEach(row => {
          row.forEach(val => {
            if (val) {
              joinedCodes += `${val}\n`
            }
          })
        })
      
            return generatedCode
      }
      
      
      
      function resetAll() {
          // Reset all values to their defaults
          for (let i = 0; i < originalValues.length; i++) {
            for (let j = 0; j < originalValues[i].length; j++) {
              $battingMiscWrite[i][j] = originalValues[i][j];
              codeArray[i][j] = undefined
              changedArray[i][j] = undefined
              codeGenArray[i][j] = undefined
              joinedCodes = ""
            }
          }
        }
      
      function resetCell(rIndex, cIndex) {
        // Reset all values to their defaults
        $battingMiscWrite[rIndex][cIndex] = originalValues[rIndex][cIndex];
        codeArray[rIndex][cIndex] = undefined        
            changedArray[rIndex][cIndex] = undefined
        codeGenArray[rIndex][cIndex] = undefined
        joinedCodes = ""
      }
      
      let sliceList = $battingMiscWrite.slice(2);
      let valuesOnly = sliceList.map((list) => list.slice(2, list.length - 1));
      
      function handleRandomFloat() {
        generateRandomFloat(valuesOnly, -5, 5)
        for (let i = 0; i < valuesOnly.length; i++) {
            // -1 to not generate a float for the trimmed bat modifier
            for (let j = 0; j < valuesOnly[i].length - 1; j++) {
              $battingMiscWrite[i + 1][j + 2] = valuesOnly[i][j]
              updateArray(i + 1, j + 2, $battingMiscWrite[i + 1][j + 2])
      
          }
        }
      }
      
      function handleRandomInt() {
          generateRandomInt(valuesOnly, 0, 1);
          for (let i = 0; i < valuesOnly.length; i++) {
            for (let j = 8; j < valuesOnly[i].length; j++) {
              $battingMiscWrite[i + 1][j + 2] = valuesOnly[i][j]
              updateArray(i + 1, j + 2, $battingMiscWrite[i + 1][j + 2])
      
            }
          }
        }
      
      </script>
      
      
      
{#if $battingMiscWrite}

<div class="card btn-group flex text-primary-500">
      <div class="btn flex">
      <Accordion>
      <AccordionItem>
            <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
            <svelte:fragment slot="content">
            <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
            {#each codeGenArray.slice(1) as row, ind}
                  {#each row.slice(1) as col, ind2}
                  {#if col}
                  {col}<br/>
                  {/if}
                  {/each}
            {/each}
            </div>
            </svelte:fragment>
      </AccordionItem>
      </Accordion>
      </div>

      {#if joinedCodes}
      <button class="btn flex btn-lg" use:clickToCopyAction={joinedCodes} on:copy-done={handleCopyDone}>Click to Copy</button>

      <button class="btn flex btn-lg" on:click={exportCodesToFile(joinedCodes)}>Export Codes</button>

      <button class="btn flex" on:click={resetAll}>Reset All</button>
      {/if}
      <!--button class="btn flex" on:click={() => {
      handleRandomFloat();
      handleRandomInt()
      }}>Randomize Stats</button-->
</div>

<div class="table-container">
  <table class="table table-interactive table-compact text-primary-400">
    <thead>
      <tr class="justify-center">
        <th class="flex-col justify-center text-center ">Description</th>
        <th class="flex-col justify-center text-center ">Value</th>
      </tr>
    </thead>
    <tbody class="text-center justify-center align-middle">
    {#each $battingMiscWrite.slice(1, $battingMiscWrite.length) as row, rIndex}
      <tr>
        <td>
          <div class="flex justify-center">{row[0]}</div> <!--Description-->
        </td>
        <td>
          {#if changedArray[rIndex + 1][2] !== true}
            <input 
              class="variant-ghost-surface input text-center" 
              type="number"
              bind:value={$battingMiscWrite[rIndex + 1][2]} 
              on:input={updateArray(rIndex + 1, 2, $battingMiscWrite[rIndex + 1][2])} 
              step={$battingMiscRead[rIndex + 1][6]}>
            <div hidden>{resetCell(rIndex + 1, 2)}</div>
          {:else if changedArray[rIndex + 1][2] === true}
            <input 
              class="variant-ringed-primary input text-center" 
              type="number" 
              bind:value={$battingMiscWrite[rIndex + 1][2]} 
              on:input={updateArray(rIndex + 1, 2, $battingMiscWrite[rIndex + 1][2])} 
              step={$battingMiscRead[rIndex + 1][6]}>
              <div hidden>
                {generateCode(
                  modifyAddress($battingMiscRead[rIndex + 1][1], 0, $battingMiscRead[rIndex + 1][3]), 
                  convertToHex(codeArray[rIndex + 1][2], $battingMiscRead[rIndex + 1][3]), 
                  rIndex + 1, 
                  2
                )}
              </div>
            <button class="btn btn-lg " on:click={() => resetCell(rIndex + 2, cIndex + 2)}>Reset</button>
          {/if}
        </td>
<!--         {#each row.slice(2, row.length - 2) as column, cIndex}
        <td>
          {#if changedArray[rIndex + 2][cIndex + 2] !== true}
            <input 
              class="variant-ghost-surface input text-center" 
              type="number" 
              bind:value={$battingMiscWrite[rIndex + 2][cIndex + 2]} 
              on:input={
                updateArray(rIndex + 2, cIndex + 2, $battingMiscWrite[rIndex + 2][cIndex + 2])
              } 
              step="0.01">
            <div hidden>{resetCell(rIndex + 2, cIndex + 2)}</div>
          {:else if changedArray[rIndex + 2][cIndex + 2] === true}
            <input 
              class="variant-ringed-primary input text-center" 
              type="number" 
              bind:value={$battingMiscWrite[rIndex + 2][cIndex + 2]} 
              on:input={
                updateArray(rIndex + 2, cIndex + 2, $battingMiscWrite[rIndex + 2][cIndex + 2])
              } 
              step="0.01">
             <div hidden>{generateCode(modifyAddress($battingMiscRead[rIndex + 2][1], $battingMiscRead[1][cIndex + 2], 'float'), convertToHex(codeArray[rIndex + 2][cIndex + 2], 'float'), rIndex + 2, cIndex + 2)}</div>
            <button class="btn btn-lg " on:click={() => resetCell(rIndex + 2, cIndex + 2)}>Reset</button>
          {/if}
        </td>
        {/each} -->
            <!-- separate to make it easier to call function since it uses a word -->
<!--         <td>	
          {#if changedArray[rIndex + 2][row.length - 2] !== true}
            <input 
              class="variant-ghost-surface input text-center" 
              type="number" 
              bind:value={$battingMiscWrite[rIndex + 2][row.length - 2]} 
              on:input={updateArray(rIndex + 2, row.length - 2, $battingMiscWrite[rIndex + 2][row.length - 2])} 
              step="1" 
              min="0" 
              max="1">
          {:else if changedArray[rIndex + 2][row.length - 2] === true}
            <input 
              class="variant-ringed-primary input text-center" 
              type="number" 
              bind:value={$battingMiscWrite[rIndex + 2][row.length - 2]} 
              on:input={updateArray(rIndex + 2, row.length - 2, $battingMiscWrite[rIndex + 2][row.length - 2])} 
              step="1" 
              min="0" 
              max="1">
            <div hidden>{generateCode(modifyAddress($battingMiscRead[rIndex + 2][1], $battingMiscRead[1][row.length - 2], 'word'), convertToHex(codeArray[rIndex + 2][row.length - 2], 'word'), rIndex + 2, row.length - 2)}</div>
            <button class="btn " on:click={() => resetCell(rIndex + 2, row.length - 2)}>Reset</button>

          {/if}
        </td>
 -->      </tr>
    {/each}
    </tbody>
  </table>
</div>


{/if}

