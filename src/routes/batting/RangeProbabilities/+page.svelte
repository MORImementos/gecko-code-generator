<script>
  // @ts-nocheck
    import { Accordion, AccordionItem, TabGroup, Tab} from "@skeletonlabs/skeleton";
    import { battingLaunchAnglesProbabilitiesRead, battingLaunchAnglesProbabilitiesWrite } from "$lib/stores";
    import { convertToHex, modifyAddress } from "$lib/codeGen";
    import { clickToCopyAction } from "svelte-legos";
    import { base } from "$app/paths";
    import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
    let joinedCodes = "";
    
    let originalValues = structuredClone($battingLaunchAnglesProbabilitiesRead)
  
    // initialize array of undefined values for tracking the contents of changes
    let codeArray = Array.apply(null, Array($battingLaunchAnglesProbabilitiesRead.length)).map(function () {
      return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0][0][0].length)).map(function () {
            return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0][0][0][0].length)).map(function () {
            })
          })
        })
      })
    })
  
    // initialize array of undefined values for tracking whether changes have occured or not
    let changedArray = Array.apply(null, Array($battingLaunchAnglesProbabilitiesRead.length)).map(function () {
      return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0][0][0].length)).map(function () {
            return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0][0][0][0].length)).map(function () {
            })
          })
        })
      })
    })
  
    // initialize array of undefined values for tracking codes of changed values - 
    $: codeGenArray = Array.apply(null, Array($battingLaunchAnglesProbabilitiesRead.length)).map(function () {
      return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0][0].length)).map(function () {
          return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0][0][0].length)).map(function () {
            return Array.apply(null, Array($battingLaunchAnglesProbabilitiesWrite[0][0][0][0].length)).map(function () {
            })
          })
        })
      })
    })

    let trajectoryTypes = ["High", "Mid", "Low"]
    let trajectoryTabSet = 0
    let hitTypes = ["Slap", "Charge"]
    let hitTabSet = 0
    let easyBattingTypes = ["Regular Batting", "Easy Batting"]
    let easyBattingTabSet = 0
    let contactTypes = ["Right Sour", "Right Nice", "Perfect", "Left Nice", "Left Sour"]
        
  function updateArray (trajectoryIndex, hitTypeIndex, easyBattingIndex, contactIndex, rangeIndex, value) {
      codeArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = Number(value)
  
      if (Number(codeArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex]) === $battingLaunchAnglesProbabilitiesRead[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex]) {
        codeArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = undefined;
        changedArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = undefined;
      } else {
        changedArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = true;
      }
    }
  
  function generateCode(add, code, trajectoryIndex, hitTypeIndex, easyBattingIndex, contactIndex, rangeIndex) {
    let generatedCode = `${add} ${code}`;
    joinedCodes = "";
  
    if (Number(codeArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex]) === $battingLaunchAnglesProbabilitiesRead[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex]) {
          generatedCode = undefined
          codeGenArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = generatedCode
    } else {
      codeGenArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = generatedCode;
    }
    console.log(codeGenArray)
    codeGenArray.forEach(trajectory => {
      trajectory.forEach(hit => {
        hit.forEach(easyBatting => {
          easyBatting.forEach(contact => {
            contact.forEach(val => {          
              if (val) {
                joinedCodes += `${val}\n`
              }
            })
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
            for (let m = 0; 1 < originalValues[i][j][k][l].length; m++) {
              $battingLaunchAnglesProbabilitiesWrite[i][j][k][l][m] = originalValues[i][j][k][l][m];
              codeArray[i][j][k][l][m] = undefined
              changedArray[i][j][k][l][m] = undefined
              codeGenArray[i][j][k][l][m] = undefined
              joinedCodes = ""
            }
          }
        }
      }
    }
  }

  function resetCell(trajectoryIndex, hitTypeIndex, easyBattingIndex, contactIndex, rangeIndex) {
    // Reset all values to their defaults
    $battingLaunchAnglesProbabilitiesWrite[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = originalValues[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex];
    codeArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = undefined        
        changedArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = undefined
    codeGenArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] = undefined
    joinedCodes = ""
  }
  
  
</script>
  
{#if $battingLaunchAnglesProbabilitiesWrite}

<div class="card btn-group flex text-primary-500">
  <div class="btn flex">
  <Accordion>
  <AccordionItem>
        <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
        <svelte:fragment slot="content">
        <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
        {#each codeGenArray as trajectory, ind}
          {#each trajectory as hit, ind2}
            {#each hit as easyBatting, ind3}
              {#each easyBatting as contact, ind4}
                {#each contact as range, ind5}
                  {#if range}
                    {range}<br/>
                  {/if}
                {/each}
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
  When contact is made, the game picks between 5 vertical trajectory ranges for the hit to launch at. Control the probabilities of each range below.<br>
  Probabilities can add up to more than 100 (these can be though of as weights). <br>
  Easy batting has the same probabilities as regular batting in the base game. Since the game can differentiate between the two, this could be used to give different probabilities to P1 and P2.
</div>

<TabGroup>
  {#each trajectoryTypes as trajectoryType, trajectoryIndex}
    <Tab bind:group={trajectoryTabSet} name={trajectoryType} value = {trajectoryIndex} class="text-primary-400  ">
      <span>{trajectoryType}</span>
    </Tab>
  {/each}
</TabGroup>

<TabGroup>
  {#each hitTypes as hitType, hitTypeIndex}
    <Tab bind:group={hitTabSet} name={hitType} value = {hitTypeIndex} class="text-primary-400  ">
      <span>{hitType}</span>
    </Tab> 
  {/each}
</TabGroup>

<TabGroup>
  {#each easyBattingTypes as easyBattingType, easyBattingIndex}
    <Tab bind:group={easyBattingTabSet} name={easyBattingType} value = {easyBattingIndex} class="text-primary-400  ">
      <span>{easyBattingType}</span>
    </Tab> 
  {/each}
</TabGroup>

{#each trajectoryTypes as trajectoryType, trajectoryIndex}
  {#if trajectoryIndex === trajectoryTabSet}
    {#each hitTypes as hitType, hitTypeIndex}
      {#if hitTypeIndex === hitTabSet}
        {#each easyBattingTypes as easyBattingType, easyBattingIndex}
          {#if easyBattingIndex === easyBattingTabSet}
            <div class="table-container">
              <table class="table table-interactive table-compact text-primary-400">
                <thead>
                  <tr class="justify-center">
                    <th class="flex-col justify-center text-center ">Contact Type</th>
                    <th class="flex-col justify-center text-center ">Probability 0</th>
                    <th class="flex-col justify-center text-center ">Probability 1</th>
                    <th class="flex-col justify-center text-center ">Probability 2</th>
                    <th class="flex-col justify-center text-center ">Probability 3</th>
                    <th class="flex-col justify-center text-center ">Probability 4</th>
                  </tr>
                </thead>
                <tbody class="text-center justify-center align-middle">
                {#each $battingLaunchAnglesProbabilitiesWrite[trajectoryIndex][hitTypeIndex][easyBattingIndex] as contactValues, contactIndex}
                  <tr>
                    <td>
                      <div class="flex justify-center">{contactTypes[contactIndex]}</div> 
                    </td>
                      {#each contactValues as range, rangeIndex}
                        <td>
                          {#if changedArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] !== true}
                            <input 
                              class="variant-ghost-surface input text-center" 
                              type="number"
                              bind:value={$battingLaunchAnglesProbabilitiesWrite[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex]} 
                              on:input={updateArray(trajectoryIndex, hitTypeIndex, easyBattingIndex, contactIndex, rangeIndex, $battingLaunchAnglesProbabilitiesWrite[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex])} 
                              step="1"
                              min="0"
                              max="255">
                            <div hidden>{resetCell(trajectoryIndex, hitTypeIndex, easyBattingIndex, contactIndex, rangeIndex)}</div>
                          {:else if changedArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex] === true}
                            <input 
                              class="variant-ringed-primary input text-center" 
                              type="number" 
                              bind:value={$battingLaunchAnglesProbabilitiesWrite[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex]} 
                              on:input={updateArray(trajectoryIndex, hitTypeIndex, easyBattingIndex, contactIndex, rangeIndex, $battingLaunchAnglesProbabilitiesWrite[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex])} 
                              step="1"
                              min="0"
                              max="255">
                            <div hidden>
                              {generateCode(
                                modifyAddress("0x807b6b00", trajectoryIndex * 100 + hitTypeIndex * 50 + easyBattingIndex * 25 + contactIndex * 5 + rangeIndex, "byte"),
                                convertToHex(codeArray[trajectoryIndex][hitTypeIndex][easyBattingIndex][contactIndex][rangeIndex], "byte"), 
                                trajectoryIndex,
                                hitTypeIndex,
                                easyBattingIndex, 
                                contactIndex,
                                rangeIndex
                              )}
                            </div>
                            <button class="btn btn-lg " on:click={() => resetCell(trajectoryIndex, hitTypeIndex, easyBattingIndex, contactIndex, rangeIndex)}>Reset</button>
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
{/each}

{/if}