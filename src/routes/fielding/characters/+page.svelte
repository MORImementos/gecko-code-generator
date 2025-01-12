<script>
    // @ts-nocheck
      import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
      import { characterHitboxesRead, characterHitboxesWrite } from "$lib/stores";
      import { convertToHex, modifyAddress } from "$lib/codeGen";
      import { clickToCopyAction } from "svelte-legos";
      import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone, charName } from "$lib/helpers/helpers";
	  import { maxValue, minValue } from "./params";
    import { base } from "$app/paths";
      let joinedCodes = "";
      
      let originalValues = structuredClone($characterHitboxesRead)


      let displayMinMax = false;

      // initialize array of undefined values for tracking the contents of changes
      let codeArray = Array.apply(null, Array($characterHitboxesRead.length)).map(function () {
        return Array.apply(null, Array($characterHitboxesWrite[0].length)).map(function () {
        })
      })
    
      // initialize array of undefined values for tracking whether changes have occured or not
      let changedArray = Array.apply(null, Array($characterHitboxesRead.length)).map(function () {
        return Array.apply(null, Array($characterHitboxesWrite[0].length)).map(function () {
        })
      })
    
      // initialize array of undefined values for tracking codes of changed values - 
      $: codeGenArray = Array.apply(null, Array($characterHitboxesWrite.length)).map(function () {
        return Array.apply(null, Array($characterHitboxesWrite[0].length)).map(function () {
        })
      })
        
    function updateArray (rIndex, cIndex, value) {
        codeArray[rIndex][cIndex] = Number(value)
    
        if (Number(codeArray[rIndex][cIndex]) === $characterHitboxesRead[rIndex][cIndex]) {
          codeArray[rIndex][cIndex] = undefined;
          changedArray[rIndex][cIndex] = undefined;
        } else {
          changedArray[rIndex][cIndex] = true;
        }
      }
    
    function generateCode(add, code, rIndex, cIndex) {
        let generatedCode = `${add} ${code}`;
      joinedCodes = "";
    
        if (Number(codeArray[rIndex][cIndex]) === $characterHitboxesRead[rIndex][cIndex]) {
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
            $characterHitboxesWrite[i][j] = originalValues[i][j];
            codeArray[i][j] = undefined
            changedArray[i][j] = undefined
            codeGenArray[i][j] = undefined
            joinedCodes = ""
          }
        }
      }
    
    function resetCell(rIndex, cIndex) {
      // Reset all values to their defaults
      $characterHitboxesWrite[rIndex][cIndex] = originalValues[rIndex][cIndex];
      codeArray[rIndex][cIndex] = undefined        
        changedArray[rIndex][cIndex] = undefined
      codeGenArray[rIndex][cIndex] = undefined
      joinedCodes = ""
    }
    
    let sliceList = $characterHitboxesWrite.slice(2);
    let valuesOnly = sliceList.map((list) => list.slice(2, list.length));
    
    function handleRandomInt() {
        generateRandomInt(valuesOnly, 1, 100);
        for (let i = 0; i < valuesOnly.length; i++) {
          for (let j = 0; j < valuesOnly[i].length; j++) {
            $characterHitboxesWrite[i + 2][j + 2] = valuesOnly[i][j]
            updateArray(i + 2, j + 2, $characterHitboxesWrite[i + 2][j + 2])
    
          }
        }
      }
    

    </script>
    
    
    
    {#if $characterHitboxesWrite}
    
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
      <label class="btn flex align-bottom flex">
        <input type="checkbox" class="checkbox" bind:checked={displayMinMax}/>
        Display minimum and maximum values?
      </label>
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
    
    <div class="table-container">
    
    
    
    <table class="table table-interactive table-compact text-primary-400">
      <thead>
        <tr class="justify-center">
          <!-- char name -->
          <th class="flex-col justify-center text-center ">{$characterHitboxesWrite[0][0]}</th>
          <!-- rest of headers -->
        {#each $characterHitboxesWrite[0].slice(2, $characterHitboxesWrite[0].length) as header}
          <th class="flex-col justify-center text-center">{header}</th>
        {/each}
        </tr>
      </thead>
      <tbody class="text-center justify-center align-middle">
            
        {#each $characterHitboxesWrite.slice(2, $characterHitboxesWrite.length) as row, rIndex}
            <tr>
              <!-- character names -->
              <td><div class="flex justify-center">{row[0]}</div><div class="flex justify-center"><img src={`${base}/Images/${row[0]}.png`} alt={row[0]}></div></td>
              {#each row.slice(2, row.length) as column, cIndex}
                <td class="w-[20%]">
                <!-- if array has not changed -->
                {#if changedArray[rIndex + 2][cIndex + 2] !== true}
                        <input class="variant-ghost-surface input text-center w-[120px]" type="number" bind:value={$characterHitboxesWrite[rIndex + 2][cIndex + 2]} on:input={updateArray(rIndex + 2, cIndex + 2, $characterHitboxesWrite[rIndex + 2][cIndex + 2])} step="1"  min={minValue[cIndex]} max={maxValue[cIndex]}>
                        <div hidden>{resetCell(rIndex + 2, cIndex + 2)}</div>
                        
                        {#if displayMinMax}
                            <div>{minValue[cIndex]}/{maxValue[cIndex]}</div>
                        {/if}
                {:else if changedArray[rIndex + 2][cIndex + 2] === true}
                    <input class="variant-ghost-surface input text-center w-[120px]" type="number" bind:value={$characterHitboxesWrite[rIndex + 2][cIndex + 2]} on:input={updateArray(rIndex + 2, cIndex + 2, $characterHitboxesWrite[rIndex + 2][cIndex + 2])} step="1"  min={minValue[cIndex]} max={maxValue[cIndex]}>

                    <!--div hidden>{generateCode(modifyAddress($characterHitboxesRead[rIndex + 2][1], Number($characterHitboxesRead[1][cIndex + 2]), 'short'), characterHitboxesWrite(codeArray[rIndex + 2][cIndex + 2], 'short'), rIndex + 2, cIndex + 2)}</div-->
                    <div hidden>{generateCode(modifyAddress($characterHitboxesRead[rIndex + 2][1], Number($characterHitboxesRead[1][cIndex + 2]), 'short'), convertToHex(codeArray[rIndex + 2][cIndex + 2], 'short'), rIndex + 2, cIndex + 2)}</div>
                    {#if displayMinMax}
                        <div>{minValue[cIndex]}/{maxValue[cIndex]}</div>
                    {/if}
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