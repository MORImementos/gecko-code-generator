<script>
  // @ts-nocheck
    import { Accordion, AccordionItem, TabGroup, Tab} from "@skeletonlabs/skeleton";
    import { battingHorizontalTrajMultiplierRead, battingHorizontalTrajMultiplierWrite } from "$lib/stores";
    import { convertToHex, modifyAddress } from "$lib/codeGen";
    import { clickToCopyAction } from "svelte-legos";
    import { base } from "$app/paths";
    import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
    let joinedCodes = "";
    
    let originalValues = structuredClone($battingHorizontalTrajMultiplierRead)
  
    // initialize array of undefined values for tracking the contents of changes
    let codeArray = Array.apply(null, Array($battingHorizontalTrajMultiplierRead.length)).map(function () {
      return Array.apply(null, Array($battingHorizontalTrajMultiplierWrite[0].length)).map(function () {
      })
    })
  
    // initialize array of undefined values for tracking whether changes have occured or not
    let changedArray = Array.apply(null, Array($battingHorizontalTrajMultiplierRead.length)).map(function () {
      return Array.apply(null, Array($battingHorizontalTrajMultiplierWrite[0].length)).map(function () {
      })
    })
  
    // initialize array of undefined values for tracking codes of changed values - 
    $: codeGenArray = Array.apply(null, Array($battingHorizontalTrajMultiplierRead.length)).map(function () {
      return Array.apply(null, Array($battingHorizontalTrajMultiplierWrite[0].length)).map(function () {
      })
    })

    let trajectoryTypes = ["Mid", "Push", "Pull"]
    let trajectoryTabSet = 0
        
  function updateArray (trajectoryIndex, zoneIndex, value) {
      codeArray[trajectoryIndex][zoneIndex] = Number(value)
  
      if (Number(codeArray[trajectoryIndex][zoneIndex]) === $battingHorizontalTrajMultiplierRead[trajectoryIndex][zoneIndex]) {
        codeArray[trajectoryIndex][zoneIndex] = undefined;
        changedArray[trajectoryIndex][zoneIndex] = undefined;
      } else {
        changedArray[trajectoryIndex][zoneIndex] = true;
      }
    }
  
  function generateCode(add, code, trajectoryIndex, zoneIndex) {
    let generatedCode = `${add} ${code}`;
    joinedCodes = "";
  
    if (Number(codeArray[trajectoryIndex][zoneIndex]) === $battingHorizontalTrajMultiplierRead[trajectoryIndex][zoneIndex]) {
          generatedCode = undefined
          codeGenArray[trajectoryIndex][zoneIndex] = generatedCode
    } else {
      codeGenArray[trajectoryIndex][zoneIndex] = generatedCode;
    }
    
    codeGenArray.forEach(trajectory => {
      trajectory.forEach(val => {
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
          $battingHorizontalTrajMultiplierWrite[i][j] = originalValues[i][j];
          codeArray[i][j] = undefined
          changedArray[i][j] = undefined
          codeGenArray[i][j] = undefined
          joinedCodes = ""
        }
      }
    }
  
  function resetCell(trajectoryIndex, zoneIndex) {
    // Reset all values to their defaults
    $battingHorizontalTrajMultiplierWrite[trajectoryIndex][zoneIndex] = originalValues[trajectoryIndex][zoneIndex];
    codeArray[trajectoryIndex][zoneIndex] = undefined        
        changedArray[trajectoryIndex][zoneIndex] = undefined
    codeGenArray[trajectoryIndex][zoneIndex] = undefined
    joinedCodes = ""
  }
  
  
  </script>
  
{#if $battingHorizontalTrajMultiplierWrite}

<div class="card btn-group flex text-primary-500">
  <div class="btn flex">
  <Accordion>
  <AccordionItem>
        <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
        <svelte:fragment slot="content">
        <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
        {#each codeGenArray as trajectory, ind}
          {#each trajectory as zone, ind2}
            {#if zone}
              {zone}<br/>
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
  The character's horizontal trajectory type determines a power multiplier based on which side of the field the ball is hit to.
</div>


<div class="table-container">
  <table class="table table-interactive table-compact text-primary-400">
    <thead>
      <tr class="justify-center">
        <th class="flex-col justify-center text-center ">Character Horizontal Trajectory</th>
        <th class="flex-col justify-center text-center ">Full Pull Side</th>
        <th class="flex-col justify-center text-center ">Pull-Center</th>
        <th class="flex-col justify-center text-center ">Center Field</th>
        <th class="flex-col justify-center text-center ">Push-Center</th>
        <th class="flex-col justify-center text-center ">Full Push Side</th>
      </tr>
    </thead>
    <tbody class="text-center justify-center align-middle">
    {#each $battingHorizontalTrajMultiplierWrite as trajectory, trajectoryIndex}
      <tr>
        <td>
          <div class="flex justify-center">{trajectoryTypes[trajectoryIndex]}</div> 
        </td>
          {#each trajectory as zones, zoneIndex}
            <td>
              {#if changedArray[trajectoryIndex][zoneIndex] !== true}
                <input 
                  class="variant-ghost-surface input text-center" 
                  type="number"
                  bind:value={$battingHorizontalTrajMultiplierWrite[trajectoryIndex][zoneIndex]} 
                  on:input={updateArray(trajectoryIndex, zoneIndex, $battingHorizontalTrajMultiplierWrite[trajectoryIndex][zoneIndex])} 
                  step="0.01"
                  min="0"
                  max="2">
                <div hidden>{resetCell(trajectoryIndex, zoneIndex)}</div>
              {:else if changedArray[trajectoryIndex][zoneIndex] === true}
                <input 
                  class="variant-ringed-primary input text-center" 
                  type="number" 
                  bind:value={$battingHorizontalTrajMultiplierWrite[trajectoryIndex][zoneIndex]} 
                  on:input={updateArray(trajectoryIndex, zoneIndex, $battingHorizontalTrajMultiplierWrite[trajectoryIndex][zoneIndex])} 
                  step="0.01"
                  min="0"
                  max="2">
                <div hidden>
                  {generateCode(
                    modifyAddress("0x807b70f8", 4 * (trajectoryIndex * 5 + zoneIndex), "float"), 
                    convertToHex(codeArray[trajectoryIndex][zoneIndex], "float"), 
                    trajectoryIndex,
                    zoneIndex
                  )}
                </div>
                <button class="btn btn-lg " on:click={() => resetCell(trajectoryIndex, zoneIndex)}>Reset</button>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

{/if}