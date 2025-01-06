<script>
  // @ts-nocheck
    import { Accordion, AccordionItem, TabGroup, Tab} from "@skeletonlabs/skeleton";
    import { battingExitVelocityRead, battingExitVelocityWrite } from "$lib/stores";
    import { convertToHex, modifyAddress } from "$lib/codeGen";
    import { clickToCopyAction } from "svelte-legos";
    import { base } from "$app/paths";
    import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
    let joinedCodes = "";
    
    let originalValues = structuredClone($battingExitVelocityRead)
  
    // initialize array of undefined values for tracking the contents of changes
    let codeArray = Array.apply(null, Array($battingExitVelocityRead.length)).map(function () {
      return Array.apply(null, Array($battingExitVelocityWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingExitVelocityWrite[0][0].length)).map(function () {
        })
      })
    })
  
    // initialize array of undefined values for tracking whether changes have occured or not
    let changedArray = Array.apply(null, Array($battingExitVelocityRead.length)).map(function () {
      return Array.apply(null, Array($battingExitVelocityWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingExitVelocityWrite[0][0].length)).map(function () {
        })
      })
    })
  
    // initialize array of undefined values for tracking codes of changed values - 
    $: codeGenArray = Array.apply(null, Array($battingExitVelocityRead.length)).map(function () {
      return Array.apply(null, Array($battingExitVelocityWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingExitVelocityWrite[0][0].length)).map(function () {
        })
      })
    })

    let hitTypes = ["Slap", "Charge/Moonshot"]
    let hitTabSet = 0
    let contactTypes = ["Right Sour", "Right Nice", "Perfect", "Left Nice", "Left Sour"]
        
  function updateArray (hitIndex, contactIndex, cIndex, value) {
      codeArray[hitIndex][contactIndex][cIndex] = Number(value)
  
      if (Number(codeArray[hitIndex][contactIndex][cIndex]) === $battingExitVelocityRead[hitIndex][contactIndex][cIndex]) {
        codeArray[hitIndex][contactIndex][cIndex] = undefined;
        changedArray[hitIndex][contactIndex][cIndex] = undefined;
      } else {
        changedArray[hitIndex][contactIndex][cIndex] = true;
      }
    }
  
  function generateCode(add, code, hitIndex, contactIndex, cIndex) {
    let generatedCode = `${add} ${code}`;
    joinedCodes = "";
  
    if (Number(codeArray[hitIndex][contactIndex][cIndex]) === $battingExitVelocityRead[hitIndex][contactIndex][cIndex]) {
          generatedCode = undefined
          codeGenArray[hitIndex][contactIndex][cIndex] = generatedCode
    } else {
      codeGenArray[hitIndex][contactIndex][cIndex] = generatedCode;
    }
    
    codeGenArray.forEach(hit => {
      hit.forEach(contact => {
        contact.forEach(val => {
          if (val) {
            joinedCodes += `${val}\n`
          }
        })
      })
    })
  
        return generatedCode
  }
  
  function resetAll() {
      // Reset all values to their defaults
      for (let i = 0; i < originalValues.length; i++) {
        for (let j = 0; j < originalValues[i].length; j++) {
          $battingExitVelocityWrite[i][j] = originalValues[i][j];
          codeArray[i][j] = undefined
          changedArray[i][j] = undefined
          codeGenArray[i][j] = undefined
          joinedCodes = ""
        }
      }
    }
  
  function resetCell(hitIndex, contactIndex, cIndex) {
    console.log(hitIndex, contactIndex, cIndex)
    // Reset all values to their defaults
    $battingExitVelocityWrite[hitIndex][contactIndex][cIndex] = originalValues[hitIndex][contactIndex][cIndex];
    codeArray[hitIndex][contactIndex][cIndex] = undefined        
        changedArray[hitIndex][contactIndex][cIndex] = undefined
    codeGenArray[hitIndex][contactIndex][cIndex] = undefined
    joinedCodes = ""
  }
  
  
  </script>
  
{#if $battingExitVelocityWrite}

<div class="card btn-group flex text-primary-500">
  <div class="btn flex">
  <Accordion>
  <AccordionItem>
        <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
        <svelte:fragment slot="content">
        <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
        {#each codeGenArray as hit, ind}
          {#each hit as contact, ind2}
            {#each contact as col, ind3}
              {#if col}
                {col}<br/>
              {/if}
            {/each}
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
</div>

<div class="flex text-primary-500">
  The hit exit velocity is based on the contact quality that is applied to a range. Edit the upper and lower bounds below to adjust this.<br>
  Each hit type and contact type also has an added gravity factor, where negative values make the ball fall faster.<br>
  In the game, negative values are represented by the amount below 65536. For example, 65426 represents -110, since 65536 - 65426 = 110.
</div>

<TabGroup>
  {#each hitTypes as hit, hitIndex}
    <Tab bind:group={hitTabSet} name={hit} value = {hitIndex} class="text-primary-400  ">
      <span>{hit}</span>
    </Tab>
  {/each}
</TabGroup>

{#each hitTypes as hit, hitIndex}
  {#if hitIndex === hitTabSet}
    <div class="table-container">
      <table class="table table-interactive table-compact text-primary-400">
        <thead>
          <tr class="justify-center">
            <th class="flex-col justify-center text-center ">Contact Type</th>
            <th class="flex-col justify-center text-center ">Lower Bound Power</th>
            <th class="flex-col justify-center text-center ">Upper Bound Power</th>
            <th class="flex-col justify-center text-center ">Added Gravity Factor</th>
          </tr>
        </thead>
        <tbody class="text-center justify-center align-middle">
        {#each $battingExitVelocityWrite[hitIndex] as contact, contactIndex}
          <tr>
            <td>
              <div class="flex justify-center">{contactTypes[contactIndex]}</div> 
            </td>
              {#each contact as cols, colIndex}
                <td>
                  {#if changedArray[hitIndex][contactIndex][colIndex] !== true}
                    <input 
                      class="variant-ghost-surface input text-center" 
                      type="number"
                      bind:value={$battingExitVelocityWrite[hitIndex][contactIndex][colIndex]} 
                      on:input={updateArray(hitIndex, contactIndex, colIndex, $battingExitVelocityWrite[hitIndex][contactIndex][colIndex])} 
                      step="1"
                      min="0"
                      max="65535">
                    <div hidden>{resetCell(hitIndex, contactIndex, colIndex)}</div>
                  {:else if changedArray[hitIndex][contactIndex][colIndex] === true}
                    <input 
                      class="variant-ringed-primary input text-center" 
                      type="number" 
                      bind:value={$battingExitVelocityWrite[hitIndex][contactIndex][colIndex]} 
                      on:input={updateArray(hitIndex, contactIndex, colIndex, $battingExitVelocityWrite[hitIndex][contactIndex][colIndex])} 
                      step="1"
                      min="0"
                      max="65535">
                    <div hidden>
                      {generateCode(
                        modifyAddress("0x807b6d74", 2 * (hitIndex * 15 + contactIndex * 3 + colIndex), "short"), 
                        convertToHex(codeArray[hitIndex][contactIndex][colIndex], "short"), 
                        hitIndex,
                        contactIndex, 
                        colIndex
                      )}
                    </div>
                    <button class="btn btn-lg " on:click={() => resetCell(hitIndex, contactIndex, colIndex)}>Reset</button>
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
{/each}

{/if}