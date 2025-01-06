<script>
      // @ts-nocheck
        import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
        import { pitchingMiscRead, pitchingMiscWrite } from "$lib/stores";
        import { convertToHex, modifyAddress } from "$lib/codeGen";
        import { clickToCopyAction } from "svelte-legos";
        import { base } from "$app/paths";
        import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
        let joinedCodes = "";
        
        let originalValues = structuredClone($pitchingMiscRead)
      
        // initialize array of undefined values for tracking the contents of changes
        let codeArray = Array.apply(null, Array($pitchingMiscRead.length)).map(function () {
          return Array.apply(null, Array($pitchingMiscWrite[0].length)).map(function () {
          })
        })
      
        // initialize array of undefined values for tracking whether changes have occured or not
        let changedArray = Array.apply(null, Array($pitchingMiscRead.length)).map(function () {
          return Array.apply(null, Array($pitchingMiscWrite[0].length)).map(function () {
          })
        })
      
        // initialize array of undefined values for tracking codes of changed values - 
        $: codeGenArray = Array.apply(null, Array($pitchingMiscWrite.length)).map(function () {
          return Array.apply(null, Array($pitchingMiscWrite[0].length)).map(function () {
          })
        })
            
      function updateArray (rIndex, cIndex, value) {
          codeArray[rIndex][cIndex] = Number(value)
      
          if (Number(codeArray[rIndex][cIndex]) === $pitchingMiscRead[rIndex][cIndex]) {
            codeArray[rIndex][cIndex] = undefined;
            changedArray[rIndex][cIndex] = undefined;
          } else {
            changedArray[rIndex][cIndex] = true;
          }
        }
      
      function generateCode(add, code, rIndex, cIndex) {
            let generatedCode = `${add} ${code}`;
        joinedCodes = "";
      
            if (Number(codeArray[rIndex][cIndex]) === $pitchingMiscRead[rIndex][cIndex]) {
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
              $pitchingMiscWrite[i][j] = originalValues[i][j];
              codeArray[i][j] = undefined
              changedArray[i][j] = undefined
              codeGenArray[i][j] = undefined
              joinedCodes = ""
            }
          }
        }
      
      function resetCell(rIndex, cIndex) {
        // Reset all values to their defaults
        $pitchingMiscWrite[rIndex][cIndex] = originalValues[rIndex][cIndex];
        codeArray[rIndex][cIndex] = undefined        
            changedArray[rIndex][cIndex] = undefined
        codeGenArray[rIndex][cIndex] = undefined
        joinedCodes = ""
      }
      
</script>
          
{#if $pitchingMiscWrite}

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
    {#each $pitchingMiscWrite.slice(1, $pitchingMiscWrite.length) as row, rIndex}
      <tr>
        <td>
          <div class="flex justify-center">{row[0]}</div> <!--Description-->
        </td>
        <td>
          {#if changedArray[rIndex + 1][2] !== true}
            <input 
              class="variant-ghost-surface input text-center" 
              type="number"
              bind:value={$pitchingMiscWrite[rIndex + 1][2]} 
              on:input={updateArray(rIndex + 1, 2, $pitchingMiscWrite[rIndex + 1][2])} 
              step={$pitchingMiscRead[rIndex + 1][6]}>
            <div hidden>{resetCell(rIndex + 1, 2)}</div>
          {:else if changedArray[rIndex + 1][2] === true}
            <input 
              class="variant-ringed-primary input text-center" 
              type="number" 
              bind:value={$pitchingMiscWrite[rIndex + 1][2]} 
              on:input={updateArray(rIndex + 1, 2, $pitchingMiscWrite[rIndex + 1][2])} 
              step={$pitchingMiscRead[rIndex + 1][6]}>
              <div hidden>
                {generateCode(
                  modifyAddress($pitchingMiscRead[rIndex + 1][1], 0, $pitchingMiscRead[rIndex + 1][3]), 
                  convertToHex(codeArray[rIndex + 1][2], $pitchingMiscRead[rIndex + 1][3]), 
                  rIndex + 1, 
                  2
                )}
              </div>
            <button class="btn btn-lg " on:click={() => resetCell(rIndex + 2, cIndex + 2)}>Reset</button>
          {/if}
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
</div>


{/if}

