<script>
  // @ts-nocheck
    import { Accordion, AccordionItem, TabGroup, Tab} from "@skeletonlabs/skeleton";
    import { battingLaunchAnglesRegularRead, battingLaunchAnglesRegularWrite } from "$lib/stores";
    import { convertToHex, modifyAddress } from "$lib/codeGen";
    import { clickToCopyAction } from "svelte-legos";
    import { base } from "$app/paths";
    import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
    let joinedCodes = "";
    
    let originalValues = structuredClone($battingLaunchAnglesRegularRead)
  
    // initialize array of undefined values for tracking the contents of changes
    let codeArray = Array.apply(null, Array($battingLaunchAnglesRegularRead.length)).map(function () {
      return Array.apply(null, Array($battingLaunchAnglesRegularWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingLaunchAnglesRegularWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($battingLaunchAnglesRegularWrite[0][0][0].length)).map(function () {
          })
        })
      })
    })
  
    // initialize array of undefined values for tracking whether changes have occured or not
    let changedArray = Array.apply(null, Array($battingLaunchAnglesRegularRead.length)).map(function () {
      return Array.apply(null, Array($battingLaunchAnglesRegularWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingLaunchAnglesRegularWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($battingLaunchAnglesRegularWrite[0][0][0].length)).map(function () {
          })
        })
      })
    })
  
    // initialize array of undefined values for tracking codes of changed values - 
    $: codeGenArray = Array.apply(null, Array($battingLaunchAnglesRegularRead.length)).map(function () {
      return Array.apply(null, Array($battingLaunchAnglesRegularWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingLaunchAnglesRegularWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($battingLaunchAnglesRegularWrite[0][0][0].length)).map(function () {
          })
        })
      })
    })

    let hitTypes = ["Slap", "Charge/Moonshot"]
    let hitTabSet = 0
    let contactTypes = ["Right Sour", "Right Nice", "Perfect", "Left Nice", "Left Sour"]
    let contactTabSet = 0
        
  function updateArray (hitIndex, contactIndex, rangeIndex, uLIndex, value) {
      codeArray[hitIndex][contactIndex][rangeIndex][uLIndex] = Number(value)
  
      if (Number(codeArray[hitIndex][contactIndex][rangeIndex][uLIndex]) === $battingLaunchAnglesRegularRead[hitIndex][contactIndex][rangeIndex][uLIndex]) {
        codeArray[hitIndex][contactIndex][rangeIndex][uLIndex] = undefined;
        changedArray[hitIndex][contactIndex][rangeIndex][uLIndex] = undefined;
      } else {
        changedArray[hitIndex][contactIndex][rangeIndex][uLIndex] = true;
      }
    }
  
  function generateCode(add, code, hitIndex, contactIndex, rangeIndex, uLIndex) {
    let generatedCode = `${add} ${code}`;
    joinedCodes = "";
  
    if (Number(codeArray[hitIndex][contactIndex][rangeIndex][uLIndex]) === $battingLaunchAnglesRegularRead[hitIndex][contactIndex][rangeIndex][uLIndex]) {
          generatedCode = undefined
          codeGenArray[hitIndex][contactIndex][rangeIndex][uLIndex] = generatedCode
    } else {
      codeGenArray[hitIndex][contactIndex][rangeIndex][uLIndex] = generatedCode;
    }
    console.log(codeGenArray)
    codeGenArray.forEach(hit => {
      hit.forEach(contact => {
        contact.forEach(range => {
          range.forEach(val => {          
            if (val) {
              joinedCodes += `${val}\n`
            }
          })
        })
      })
    })
  
        return generatedCode
  }
  
  function resetAll() {
    // Reset all values to their defaults
    for (let i = 0; i < originalValues.length; i++) {
      for (let j = 0; j < originalValues[i].length; j++) {
        for (let k = 0; k < originalValues[i][j].length; k++) {
          for (let l = 0; l < originalValues[i][j][k].length; l++) {
            $battingLaunchAnglesRegularWrite[i][j][k][l] = originalValues[i][j][k][l];
            codeArray[i][j][k][l] = undefined
            changedArray[i][j][k][l] = undefined
            codeGenArray[i][j][k][l] = undefined
            joinedCodes = ""
          }
        }
      }
    }
  }

  function resetCell(hitIndex, contactIndex, rangeIndex, uLIndex) {
    // Reset all values to their defaults
    $battingLaunchAnglesRegularWrite[hitIndex][contactIndex][rangeIndex][uLIndex] = originalValues[hitIndex][contactIndex][rangeIndex][uLIndex];
    codeArray[hitIndex][contactIndex][rangeIndex][uLIndex] = undefined        
        changedArray[hitIndex][contactIndex][rangeIndex][uLIndex] = undefined
    codeGenArray[hitIndex][contactIndex][rangeIndex][uLIndex] = undefined
    joinedCodes = ""
  }
  
  
</script>
  
{#if $battingLaunchAnglesRegularWrite}

<div class="card btn-group flex text-primary-500">
  <div class="btn flex">
  <Accordion>
  <AccordionItem>
        <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
        <svelte:fragment slot="content">
        <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
        {#each codeGenArray as hit, ind}
          {#each hit as contact, ind2}
            {#each contact as range, ind3}
              {#each range as uL, ind4}
                {#if uL}
                  {uL}<br/>
                {/if}
              {/each}
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
  The launch angle for each regular hit is randomly chosen between an upper and lower bound for each type of hit (slap/charge), the contact quality type, and from a selected range from another random process. <br>
  (These are byte angles, which are out of 4096 instead of 360. To convert from degrees to bytes, just do (desired degrees) * 4096/360. Numbers above 4096 get translated back to be between 0 and 4096) <br>
</div>

<TabGroup>
  {#each hitTypes as hitType, hitIndex}
    <Tab bind:group={hitTabSet} name={hitType} value = {hitIndex} class="text-primary-400  ">
      <span>{hitType}</span>
    </Tab>
  {/each}
</TabGroup>

<TabGroup>
  {#each contactTypes as contactType, contactIndex}
    <Tab bind:group={contactTabSet} name={contactType} value = {contactIndex} class="text-primary-400  ">
      <span>{contactType}</span>
    </Tab> 
  {/each}
</TabGroup>

{#each hitTypes as hitType, hitIndex}
  {#if hitIndex === hitTabSet}
    {#each contactTypes as contactType, contactIndex}
      {#if contactIndex === contactTabSet}
        <div class="table-container">
          <table class="table table-interactive table-compact text-primary-400">
            <thead>
              <tr class="justify-center">
                <th class="flex-col justify-center text-center ">Range</th>
                <th class="flex-col justify-center text-center ">Lower Bound Angle</th>
                <th class="flex-col justify-center text-center ">Upper Bound Angle</th>
              </tr>
            </thead>
            <tbody class="text-center justify-center align-middle">
            {#each $battingLaunchAnglesRegularWrite[hitIndex][contactIndex] as rangeValues, rangeIndex}
              <tr>
                <td>
                  <div class="flex justify-center">Range {rangeIndex}</div> 
                </td>
                  {#each [0, 1] as upperLower}
                    <td>
                      {#if changedArray[hitIndex][contactIndex][rangeIndex][upperLower] !== true}
                        <input 
                          class="variant-ghost-surface input text-center" 
                          type="number"
                          bind:value={$battingLaunchAnglesRegularWrite[hitIndex][contactIndex][rangeIndex][upperLower]} 
                          on:input={updateArray(hitIndex, contactIndex, rangeIndex, upperLower, $battingLaunchAnglesRegularWrite[hitIndex][contactIndex][rangeIndex][upperLower])} 
                          step="1"
                          min="0"
                          max="65535">
                        <div hidden>{resetCell(hitIndex, contactIndex, rangeIndex, upperLower)}</div>
                      {:else if changedArray[hitIndex][contactIndex][rangeIndex][upperLower] === true}
                        <input 
                          class="variant-ringed-primary input text-center" 
                          type="number" 
                          bind:value={$battingLaunchAnglesRegularWrite[hitIndex][contactIndex][rangeIndex][upperLower]} 
                          on:input={updateArray(hitIndex, contactIndex, rangeIndex, upperLower, $battingLaunchAnglesRegularWrite[hitIndex][contactIndex][rangeIndex][upperLower])} 
                          step="1"
                          min="0"
                          max="65535">
                        <div hidden>
                          {generateCode(
                            modifyAddress("0x807b67cc", 2 * (hitIndex * 50 + contactIndex * 10 + rangeIndex * 2 + upperLower), "short"),
                            convertToHex(codeArray[hitIndex][contactIndex][rangeIndex][upperLower], "short"), 
                            hitIndex,
                            contactIndex,
                            rangeIndex, 
                            upperLower
                          )}
                        </div>
                        <button class="btn btn-lg " on:click={() => resetCell(hitIndex, contactIndex, rangeIndex, upperLower)}>Reset</button>
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
{/each}

{/if}