<script>
  // @ts-nocheck
    import { Accordion, AccordionItem, TabGroup, Tab} from "@skeletonlabs/skeleton";
    import { bobbleChancesRead, bobbleChancesWrite } from "$lib/stores";
    import { convertToHex, modifyAddress } from "$lib/codeGen";
    import { clickToCopyAction } from "svelte-legos";
    import { base } from "$app/paths";
    import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
    let joinedCodes = "";
    
    let originalValues = structuredClone($bobbleChancesRead)
  
    // initialize array of undefined values for tracking the contents of changes
    let codeArray = Array.apply(null, Array($bobbleChancesRead.length)).map(function () {
      return Array.apply(null, Array($bobbleChancesWrite[0].length)).map(function () {
        return Array.apply(null, Array($bobbleChancesWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($bobbleChancesWrite[0][0][0].length)).map(function () {
          })
        })
      })
    })
  
    // initialize array of undefined values for tracking whether changes have occured or not
    let changedArray = Array.apply(null, Array($bobbleChancesRead.length)).map(function () {
      return Array.apply(null, Array($bobbleChancesWrite[0].length)).map(function () {
        return Array.apply(null, Array($bobbleChancesWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($bobbleChancesWrite[0][0][0].length)).map(function () {
          })
        })
      })
    })
  
    // initialize array of undefined values for tracking codes of changed values - 
    $: codeGenArray = Array.apply(null, Array($bobbleChancesRead.length)).map(function () {
      return Array.apply(null, Array($bobbleChancesWrite[0].length)).map(function () {
        return Array.apply(null, Array($bobbleChancesWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($bobbleChancesWrite[0][0][0].length)).map(function () {
          })
        })
      })
    })

    let modeTypes = ["Regular", "Toy Field"]
    let modeTabSet = 0
    let charClassTypes = ["Balance", "Power", "Speed", "Technique"]
    let charClassTabSet = 0
    let hitClasses = ["Fly Ball or Fast-Moving Grounder", "Slow-Moving Grounder"]
    let catchTypes = ["Centered", "Side", "Dive/Running Catch"]
        
  function updateArray (modeIndex, charClassIndex, hitClassIndex, catchTypeIndex, value) {
      codeArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = Number(value)
  
      if (Number(codeArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex]) === $bobbleChancesRead[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex]) {
        codeArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = undefined;
        changedArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = undefined;
      } else {
        changedArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = true;
      }
    }
  
  function generateCode(add, code, modeIndex, charClassIndex, hitClassIndex, catchTypeIndex) {
    let generatedCode = `${add} ${code}`;
    joinedCodes = "";
  
    if (Number(codeArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex]) === $bobbleChancesRead[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex]) {
          generatedCode = undefined
          codeGenArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = generatedCode
    } else {
      codeGenArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = generatedCode;
    }
    
    codeGenArray.forEach(mode => {
      mode.forEach(charClass => {
        charClass.forEach(hitClass => {
          hitClass.forEach(val => {          
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
    // Reset all values to their defacatchTypets
    for (let i = 0; i < originalValues.length; i++) {
      for (let j = 0; j < originalValues[i].length; j++) {
        for (let k = 0; k < originalValues[i][j].length; k++) {
          for (let l = 0; l < originalValues[i][j][k].length; l++) {
            $bobbleChancesWrite[i][j][k][l] = originalValues[i][j][k][l];
            codeArray[i][j][k][l] = undefined
            changedArray[i][j][k][l] = undefined
            codeGenArray[i][j][k][l] = undefined
            joinedCodes = ""
          }
        }
      }
    }
  }

  function resetCell(modeIndex, charClassIndex, hitClassIndex, catchTypeIndex) {
    // Reset all values to their defacatchTypets
    $bobbleChancesWrite[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = originalValues[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex];
    codeArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = undefined        
        changedArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = undefined
    codeGenArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] = undefined
    joinedCodes = ""
  }
  
  
</script>
  
{#if $bobbleChancesWrite}

<div class="card btn-group flex text-primary-500">
  <div class="btn flex">
  <Accordion>
  <AccordionItem>
        <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
        <svelte:fragment slot="content">
        <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
        {#each codeGenArray as mode, ind}
          {#each mode as charClass, ind2}
            {#each charClass as hitClass, ind3}
              {#each hitClass as catchType, ind4}
                {#if catchType}
                  {catchType}<br/>
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

<TabGroup>
  {#each modeTypes as modeType, modeIndex}
    <Tab bind:group={modeTabSet} name={modeType} value = {modeIndex} class="text-primary-400  ">
      <span>{modeType}</span>
    </Tab>
  {/each}
</TabGroup>

<TabGroup>
  {#each charClassTypes as charClassType, charClassIndex}
    <Tab bind:group={charClassTabSet} name={charClassType} value = {charClassIndex} class="text-primary-400  ">
      <span>{charClassType}</span>
    </Tab> 
  {/each}
</TabGroup>

{#each modeTypes as modeType, modeIndex}
  {#if modeIndex === modeTabSet}
    {#each charClassTypes as charClassType, charClassIndex}
      {#if charClassIndex === charClassTabSet}
        <div class="table-container">
          <table class="table table-interactive table-compact text-primary-400">
            <thead>
              <tr class="justify-center">
                <th class="flex-col justify-center text-center ">Ball Movement</th>
                <th class="flex-col justify-center text-center ">Centered</th>
                <th class="flex-col justify-center text-center ">Side</th>
                <th class="flex-col justify-center text-center ">Diving/Running Catch</th>
              </tr>
            </thead>
            <tbody class="text-center justify-center align-middle">
            {#each $bobbleChancesWrite[modeIndex][charClassIndex] as hitClassValues, hitClassIndex}
              <tr>
                <td>
                  <div class="flex justify-center">{hitClasses[hitClassIndex]}</div> 
                </td>
                  {#each hitClassValues as catchType, catchTypeIndex}
                    <td>
                      {#if changedArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] !== true}
                        <input 
                          class="variant-ghost-surface input text-center" 
                          type="number"
                          bind:value={$bobbleChancesWrite[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex]} 
                          on:input={updateArray(modeIndex, charClassIndex, hitClassIndex, catchTypeIndex, $bobbleChancesWrite[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex])} 
                          step="1"
                          min="0"
                          max="255">
                        <div hidden>{resetCell(modeIndex, charClassIndex, hitClassIndex, catchTypeIndex)}</div>
                      {:else if changedArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex] === true}
                        <input 
                          class="variant-ringed-primary input text-center" 
                          type="number" 
                          bind:value={$bobbleChancesWrite[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex]} 
                          on:input={updateArray(modeIndex, charClassIndex, hitClassIndex, catchTypeIndex, $bobbleChancesWrite[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex])} 
                          step="1"
                          min="0"
                          max="255">
                        <div hidden>
                          {generateCode(
                            modifyAddress("0x807b5d14", 1 * (modeIndex * 24 + charClassIndex * 6 + hitClassIndex * 3 + catchTypeIndex), "byte"),
                            convertToHex(codeArray[modeIndex][charClassIndex][hitClassIndex][catchTypeIndex], "byte"), 
                            modeIndex,
                            charClassIndex,
                            hitClassIndex, 
                            catchTypeIndex
                          )}
                        </div>
                        <button class="btn btn-lg " on:click={() => resetCell(modeIndex, charClassIndex, hitClassIndex, catchTypeIndex)}>Reset</button>
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