<script>
  // @ts-nocheck
    import { Accordion, AccordionItem, TabGroup, Tab} from "@skeletonlabs/skeleton";
    import { battingHorizontalAnglesRead, battingHorizontalAnglesWrite } from "$lib/stores";
    import { convertToHex, modifyAddress } from "$lib/codeGen";
    import { clickToCopyAction } from "svelte-legos";
    import { base } from "$app/paths";
    import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
    let joinedCodes = "";
    
    let originalValues = structuredClone($battingHorizontalAnglesRead)
  
    // initialize array of undefined values for tracking the contents of changes
    let codeArray = Array.apply(null, Array($battingHorizontalAnglesRead.length)).map(function () {
      return Array.apply(null, Array($battingHorizontalAnglesWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingHorizontalAnglesWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($battingHorizontalAnglesWrite[0][0][0].length)).map(function () {
          })
        })
      })
    })
  
    // initialize array of undefined values for tracking whether changes have occured or not
    let changedArray = Array.apply(null, Array($battingHorizontalAnglesRead.length)).map(function () {
      return Array.apply(null, Array($battingHorizontalAnglesWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingHorizontalAnglesWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($battingHorizontalAnglesWrite[0][0][0].length)).map(function () {
          })
        })
      })
    })
  
    // initialize array of undefined values for tracking codes of changed values - 
    $: codeGenArray = Array.apply(null, Array($battingHorizontalAnglesRead.length)).map(function () {
      return Array.apply(null, Array($battingHorizontalAnglesWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingHorizontalAnglesWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($battingHorizontalAnglesWrite[0][0][0].length)).map(function () {
          })
        })
      })
    })

    let inputTypes = ["No Input", "Pull Input", "Push Input"]
    let inputTabSet = 0
    let swingTypes = ["Slap", "Charge"]
    let swingTabSet = 0
        
  function updateArray (inputIndex, swingIndex, frameIndex, uLIndex, value) {
      codeArray[inputIndex][swingIndex][frameIndex][uLIndex] = Number(value)
  
      if (Number(codeArray[inputIndex][swingIndex][frameIndex][uLIndex]) === $battingHorizontalAnglesRead[inputIndex][swingIndex][frameIndex][uLIndex]) {
        codeArray[inputIndex][swingIndex][frameIndex][uLIndex] = undefined;
        changedArray[inputIndex][swingIndex][frameIndex][uLIndex] = undefined;
      } else {
        changedArray[inputIndex][swingIndex][frameIndex][uLIndex] = true;
      }
    }
  
  function generateCode(add, code, inputIndex, swingIndex, frameIndex, uLIndex) {
    let generatedCode = `${add} ${code}`;
    joinedCodes = "";
  
    if (Number(codeArray[inputIndex][swingIndex][frameIndex][uLIndex]) === $battingHorizontalAnglesRead[inputIndex][swingIndex][frameIndex][uLIndex]) {
          generatedCode = undefined
          codeGenArray[inputIndex][swingIndex][frameIndex][uLIndex] = generatedCode
    } else {
      codeGenArray[inputIndex][swingIndex][frameIndex][uLIndex] = generatedCode;
    }
    console.log(codeGenArray)
    codeGenArray.forEach(input => {
      input.forEach(swing => {
        swing.forEach(frame => {
          frame.forEach(val => {          
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
            $battingHorizontalAnglesWrite[i][j][k][l] = originalValues[i][j][k][l];
            codeArray[i][j][k][l] = undefined
            changedArray[i][j][k][l] = undefined
            codeGenArray[i][j][k][l] = undefined
            joinedCodes = ""
          }
        }
      }
    }
  }

  function resetCell(inputIndex, swingIndex, frameIndex, uLIndex) {
    // Reset all values to their defaults
    $battingHorizontalAnglesWrite[inputIndex][swingIndex][frameIndex][uLIndex] = originalValues[inputIndex][swingIndex][frameIndex][uLIndex];
    codeArray[inputIndex][swingIndex][frameIndex][uLIndex] = undefined        
        changedArray[inputIndex][swingIndex][frameIndex][uLIndex] = undefined
    codeGenArray[inputIndex][swingIndex][frameIndex][uLIndex] = undefined
    joinedCodes = ""
  }
  
  
</script>
  
{#if $battingHorizontalAnglesWrite}

<div class="card btn-group flex text-primary-500">
  <div class="btn flex">
  <Accordion>
  <AccordionItem>
        <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
        <svelte:fragment slot="content">
        <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
        {#each codeGenArray as input, ind}
          {#each input as swing, ind2}
            {#each swing as frame, ind3}
              {#each frame as uL, ind4}
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
  The hit horizontal angles are based on the stick input direction, the swing type, and the frame of contact. For slaps, only frames 2-10 are used. For charge, frames 3-9 are used.<br>
  Frames count down until the ball has passed the batter. Therefore, frame 10 is the earliest swing timing, and frame 2 is the latest swing timing. <br>
  These are byte angles, which are out of 4096 instead of 360. To convert from degrees to bytes, just do (desired degrees) * 4096/360. Numbers above 4096 get normailzed to be between 0 and 4096 <br>
  0 is defined as straight ahead towards the pitchers mound. Positive numbers are on the 3B side, and negative numbers are on the 1B side. Negative numbers are represented by amount below 65536. <br>
  For example, -10 is 65526. This is then normalized to 4086, which is 10 below the maximum value of 4096. This angle would be just to the right of 2B.<br> 
</div>

<TabGroup>
  {#each inputTypes as inputType, inputIndex}
    <Tab bind:group={inputTabSet} name={inputType} value = {inputIndex} class="text-primary-400  ">
      <span>{inputType}</span>
    </Tab>
  {/each}
</TabGroup>

<TabGroup>
  {#each swingTypes as swingType, swingIndex}
    <Tab bind:group={swingTabSet} name={swingType} value = {swingIndex} class="text-primary-400  ">
      <span>{swingType}</span>
    </Tab> 
  {/each}
</TabGroup>

{#each inputTypes as inputType, inputIndex}
  {#if inputIndex === inputTabSet}
    {#each swingTypes as swingType, swingIndex}
      {#if swingIndex === swingTabSet}
        <div class="table-container">
          <table class="table table-interactive table-compact text-primary-400">
            <thead>
              <tr class="justify-center">
                <th class="flex-col justify-center text-center ">Frame</th>
                <th class="flex-col justify-center text-center ">Lower Bound Angle</th>
                <th class="flex-col justify-center text-center ">Upper Bound Angle</th>
              </tr>
            </thead>
            <tbody class="text-center justify-center align-middle">
            {#each $battingHorizontalAnglesWrite[inputIndex][swingIndex] as frameValues, frameIndex}
              <tr>
                <td>
                  <div class="flex justify-center">Frame {frameIndex}</div> 
                </td>
                  {#each [0, 1] as upperLower}
                    <td>
                      {#if changedArray[inputIndex][swingIndex][frameIndex][upperLower] !== true}
                        <input 
                          class="variant-ghost-surface input text-center" 
                          type="number"
                          bind:value={$battingHorizontalAnglesWrite[inputIndex][swingIndex][frameIndex][upperLower]} 
                          on:input={updateArray(inputIndex, swingIndex, frameIndex, upperLower, $battingHorizontalAnglesWrite[inputIndex][swingIndex][frameIndex][upperLower])} 
                          step="1"
                          min="0"
                          max="65535">
                        <div hidden>{resetCell(inputIndex, swingIndex, frameIndex, upperLower)}</div>
                      {:else if changedArray[inputIndex][swingIndex][frameIndex][upperLower] === true}
                        <input 
                          class="variant-ringed-primary input text-center" 
                          type="number" 
                          bind:value={$battingHorizontalAnglesWrite[inputIndex][swingIndex][frameIndex][upperLower]} 
                          on:input={updateArray(inputIndex, swingIndex, frameIndex, upperLower, $battingHorizontalAnglesWrite[inputIndex][swingIndex][frameIndex][upperLower])} 
                          step="1"
                          min="0"
                          max="65535">
                        <div hidden>
                          {generateCode(
                            modifyAddress("0x807b6394", 2 * (inputIndex * 60 + swingIndex * 30 + frameIndex * 2 + upperLower), "short"),
                            convertToHex(codeArray[inputIndex][swingIndex][frameIndex][upperLower], "short"), 
                            inputIndex,
                            swingIndex,
                            frameIndex, 
                            upperLower
                          )}
                        </div>
                        <button class="btn btn-lg " on:click={() => resetCell(inputIndex, swingIndex, frameIndex, upperLower)}>Reset</button>
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