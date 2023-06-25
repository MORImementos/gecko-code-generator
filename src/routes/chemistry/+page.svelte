<script>
    // @ts-nocheck
      import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
      import { chemRead, chemWrite } from "$lib/stores";
      import { convertToHex, modifyAddress } from "$lib/codeGen";
      import { clickToCopyAction } from "svelte-legos";
      import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
      let joinedCodes = "";
      
      let originalValues = structuredClone($chemRead)
    
      // initialize array of undefined values for tracking the contents of changes
      let codeArray = Array.apply(null, Array($chemRead.length)).map(function () {
        return Array.apply(null, Array($chemWrite[0].length)).map(function () {
        })
      })
    
      // initialize array of undefined values for tracking whether changes have occured or not
      let changedArray = Array.apply(null, Array($chemRead.length)).map(function () {
        return Array.apply(null, Array($chemWrite[0].length)).map(function () {
        })
      })
    
      // initialize array of undefined values for tracking codes of changed values - 
      $: codeGenArray = Array.apply(null, Array($chemWrite.length)).map(function () {
        return Array.apply(null, Array($chemWrite[0].length)).map(function () {
        })
      })
        
    function updateArray (rIndex, cIndex, value) {
        codeArray[rIndex][cIndex] = Number(value)
    
        if (Number(codeArray[rIndex][cIndex]) === $chemRead[rIndex][cIndex]) {
          codeArray[rIndex][cIndex] = undefined;
          changedArray[rIndex][cIndex] = undefined;
        } else {
          changedArray[rIndex][cIndex] = true;
        }
      }
    
    function generateCode(add, code, rIndex, cIndex) {
        let generatedCode = `${add} 000000${code}`;
      joinedCodes = "";
    
        if (Number(codeArray[rIndex][cIndex]) === $chemRead[rIndex][cIndex]) {
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
            $chemWrite[i][j] = originalValues[i][j];
            codeArray[i][j] = undefined
            changedArray[i][j] = undefined
            codeGenArray[i][j] = undefined
            joinedCodes = ""
          }
        }
      }
    
    function resetCell(rIndex, cIndex) {
      // Reset all values to their defaults
      $chemWrite[rIndex][cIndex] = originalValues[rIndex][cIndex];
      codeArray[rIndex][cIndex] = undefined        
        changedArray[rIndex][cIndex] = undefined
      codeGenArray[rIndex][cIndex] = undefined
      joinedCodes = ""
    }
    
    let sliceList = $chemWrite.slice(2);
    let valuesOnly = sliceList.map((list) => list.slice(2, list.length));
    
    function handleRandomInt() {
        generateRandomInt(valuesOnly, 1, 100);
        for (let i = 0; i < valuesOnly.length; i++) {
          for (let j = 0; j < valuesOnly[i].length; j++) {
            $chemWrite[i + 2][j + 2] = valuesOnly[i][j]
            updateArray(i + 2, j + 2, $chemWrite[i + 2][j + 2])
    
          }
        }
      }
    
    </script>
    
    
    
    {#if $chemWrite}
    
    <div class="card btn-group flex text-primary-500">
      <div class="btn flex">
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
            <svelte:fragment slot="content">
              <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
                {#each codeGenArray.slice(2) as row, ind}
                  {#each row.slice(2) as col, ind2}
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
      <button class="btn flex" on:click={() => {
        handleRandomInt()
      }}>Randomize Stats</button>
    </div>
    <div class="table-container">
    
    
    
    <table class="table table-interactive table-compact text-primary-400">
      <thead>
        <tr class="justify-center">
          <!-- char name -->
          <th class="flex-col justify-center text-center ">{$chemWrite[0][0]}</th>
          <!-- rest of headers -->
        {#each $chemWrite[0].slice(2, $chemWrite[0].length) as header}
          <th class="flex-col justify-center text-center">{header}</th>
        {/each}
        </tr>
      </thead>
      <tbody class="text-center justify-center align-middle">
            
        {#each $chemWrite.slice(2, $chemWrite.length) as row, rIndex}
            <tr>
              <td><div class="flex justify-center">{row[0]}</div><div class="flex justify-center"><img src={`src/lib/Images/${row[0]}.png`} alt={row[0]}></div></td>
              {#each row.slice(2, row.length) as column, cIndex}
                <td class="w-[20%]">
            {#if changedArray[rIndex + 2][cIndex + 2] !== true}
    
                        <input class="variant-ghost-surface input text-center w-[60px]" type="number" bind:value={$chemWrite[rIndex + 2][cIndex + 2]} on:input={
                updateArray(rIndex + 2, cIndex + 2, $chemWrite[rIndex + 2][cIndex + 2])} step="1"  min="1" max="255">
                        <div hidden>{resetCell(rIndex + 2, cIndex + 2)}</div>
                {:else if changedArray[rIndex + 2][cIndex + 2] === true}
    
                        <input class="variant-ringed-primary input text-center" type="number" bind:value={$chemWrite[rIndex + 2][cIndex + 2]} on:input={
                updateArray(rIndex + 2, cIndex + 2, $chemWrite[rIndex + 2][cIndex + 2])} step="1" min="1" max="255">
    
                        <div hidden>{generateCode(modifyAddress($chemRead[rIndex + 2][1], Number($chemRead[1][cIndex + 2]), 'byte'), convertToHex(codeArray[rIndex + 2][cIndex + 2], 'byte'), rIndex + 2, cIndex + 2)}</div>
    
              <button class="btn btn-lg " on:click={() => resetCell(rIndex + 2, cIndex + 2)}>Reset</button>
    
                {/if}
                </td>
              {/each}
            </tr>
        {/each}
        </tbody>
    </table>
    </div>
    
    
    {/if}