<script>
  // @ts-nocheck
    import { Accordion, AccordionItem, TabGroup, Tab} from "@skeletonlabs/skeleton";
    import { battingCurveEffectsRead, battingCurveEffectsWrite } from "$lib/stores";
    import { convertToHex, modifyAddress } from "$lib/codeGen";
    import { clickToCopyAction } from "svelte-legos";
    import { base } from "$app/paths";
    import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
    let joinedCodes = "";
    
    let originalValues = structuredClone($battingCurveEffectsRead)
  
    // initialize array of undefined values for tracking the contents of changes
    let codeArray = Array.apply(null, Array($battingCurveEffectsRead.length)).map(function () {
      return Array.apply(null, Array($battingCurveEffectsWrite[0].length)).map(function () {
      })
    })
  
    // initialize array of undefined values for tracking whether changes have occured or not
    let changedArray = Array.apply(null, Array($battingCurveEffectsRead.length)).map(function () {
      return Array.apply(null, Array($battingCurveEffectsWrite[0].length)).map(function () {
      })
    })
  
    // initialize array of undefined values for tracking codes of changed values - 
    $: codeGenArray = Array.apply(null, Array($battingCurveEffectsRead.length)).map(function () {
      return Array.apply(null, Array($battingCurveEffectsWrite[0].length)).map(function () {
      })
    })

    let curveTypes = ["Normal", "Super Curve"]
        
  function updateArray (curveIndex, columnIndex, value) {
      codeArray[curveIndex][columnIndex] = Number(value)
  
      if (Number(codeArray[curveIndex][columnIndex]) === $battingCurveEffectsRead[curveIndex][columnIndex]) {
        codeArray[curveIndex][columnIndex] = undefined;
        changedArray[curveIndex][columnIndex] = undefined;
      } else {
        changedArray[curveIndex][columnIndex] = true;
      }
    }
  
  function generateCode(add, code, curveIndex, columnIndex) {
    let generatedCode = `${add} ${code}`;
    joinedCodes = "";
  
    if (Number(codeArray[curveIndex][columnIndex]) === $battingCurveEffectsRead[curveIndex][columnIndex]) {
          generatedCode = undefined
          codeGenArray[curveIndex][columnIndex] = generatedCode
    } else {
      codeGenArray[curveIndex][columnIndex] = generatedCode;
    }
    
    codeGenArray.forEach(curve => {
      curve.forEach(val => {
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
          $battingCurveEffectsWrite[i][j] = originalValues[i][j];
          codeArray[i][j] = undefined
          changedArray[i][j] = undefined
          codeGenArray[i][j] = undefined
          joinedCodes = ""
        }
      }
    }
  
  function resetCell(curveIndex, columnIndex) {
    // Reset all values to their defaults
    $battingCurveEffectsWrite[curveIndex][columnIndex] = originalValues[curveIndex][columnIndex];
    codeArray[curveIndex][columnIndex] = undefined        
        changedArray[curveIndex][columnIndex] = undefined
    codeGenArray[curveIndex][columnIndex] = undefined
    joinedCodes = ""
  }
  
  
  </script>
  
{#if $battingCurveEffectsWrite}

<div class="card btn-group flex text-primary-500">
  <div class="btn flex">
  <Accordion>
  <AccordionItem>
        <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
        <svelte:fragment slot="content">
        <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
        {#each codeGenArray as curve, ind}
          {#each curve as column, ind2}
            {#if column}
              {column}<br/>
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
</div>

<div class="flex text-primary-500">
  The character's curve type determines the ball's acceleration in the x and z directions.
</div>


<div class="table-container">
  <table class="table table-interactive table-compact text-primary-400">
    <thead>
      <tr class="justify-center">
        <th class="flex-col justify-center text-center ">Character Curve Type</th>
        <th class="flex-col justify-center text-center ">Curve Dampening Factor</th>
        <th class="flex-col justify-center text-center ">X Acceleration Factor</th>
        <th class="flex-col justify-center text-center ">Z Acceleration Factor</th>
      </tr>
    </thead>
    <tbody class="text-center justify-center align-middle">
    {#each $battingCurveEffectsWrite as curve, curveIndex}
      <tr>
        <td>
          <div class="flex justify-center">{curveTypes[curveIndex]}</div> 
        </td>
          {#each curve as columns, columnIndex}
            <td>
              {#if changedArray[curveIndex][columnIndex] !== true}
                <input 
                  class="variant-ghost-surface input text-center" 
                  type="number"
                  bind:value={$battingCurveEffectsWrite[curveIndex][columnIndex]} 
                  on:input={updateArray(curveIndex, columnIndex, $battingCurveEffectsWrite[curveIndex][columnIndex])} 
                  step="0.001"
                  min="0"
                  max="2">
                <div hidden>{resetCell(curveIndex, columnIndex)}</div>
              {:else if changedArray[curveIndex][columnIndex] === true}
                <input 
                  class="variant-ringed-primary input text-center" 
                  type="number" 
                  bind:value={$battingCurveEffectsWrite[curveIndex][columnIndex]} 
                  on:input={updateArray(curveIndex, columnIndex, $battingCurveEffectsWrite[curveIndex][columnIndex])} 
                  step="0.001"
                  min="0"
                  max="2">
                <div hidden>
                  {generateCode(
                    modifyAddress("0x807b72bc", 4 * (curveIndex * 3 + columnIndex), "float"), 
                    convertToHex(codeArray[curveIndex][columnIndex], "float"), 
                    curveIndex,
                    columnIndex
                  )}
                </div>
                <button class="btn btn-lg " on:click={() => resetCell(curveIndex, columnIndex)}>Reset</button>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

{/if}