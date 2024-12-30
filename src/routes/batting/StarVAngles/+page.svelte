<script>
  // @ts-nocheck
    import { Accordion, AccordionItem, TabGroup, Tab} from "@skeletonlabs/skeleton";
    import { battingLaunchAnglesStarRead, battingLaunchAnglesStarWrite } from "$lib/stores";
    import { convertToHex, modifyAddress } from "$lib/codeGen";
    import { clickToCopyAction } from "svelte-legos";
    import { base } from "$app/paths";
    import { exportCodesToFile, generateRandomFloat, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
    let joinedCodes = "";
    
    let originalValues = structuredClone($battingLaunchAnglesStarRead)
  
    // initialize array of undefined values for tracking the contents of changes
    let codeArray = Array.apply(null, Array($battingLaunchAnglesStarRead.length)).map(function () {
      return Array.apply(null, Array($battingLaunchAnglesStarWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingLaunchAnglesStarWrite[0][0].length)).map(function () {
        })
      })
    })
  
    // initialize array of undefined values for tracking whether changes have occured or not
    let changedArray = Array.apply(null, Array($battingLaunchAnglesStarRead.length)).map(function () {
      return Array.apply(null, Array($battingLaunchAnglesStarWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingLaunchAnglesStarWrite[0][0].length)).map(function () {
        })
      })
    })
  
    // initialize array of undefined values for tracking codes of changed values - 
    $: codeGenArray = Array.apply(null, Array($battingLaunchAnglesStarRead.length)).map(function () {
      return Array.apply(null, Array($battingLaunchAnglesStarWrite[0].length)).map(function () {
        return Array.apply(null, Array($battingLaunchAnglesStarWrite[0][0].length)).map(function () {
        })
      })
    })

    let starTypes = ["Mario", "Luigi", "Wario", "Waluigi", "DK", "Diddy", "Bowser", "Bowser Jr", "Yoshi", "Birdo", "Peach", "Daisy", "Pop", "Grounder", "Line Drive"]
    let tabSet = 0
    let contactTypes = ["Right Sour", "Right Nice", "Perfect", "Left Nice", "Left Sour"]
        
  function updateArray (starIndex, rIndex, cIndex, value) {
      codeArray[starIndex][rIndex][cIndex] = Number(value)
  
      if (Number(codeArray[starIndex][rIndex][cIndex]) === $battingLaunchAnglesStarRead[starIndex][rIndex][cIndex]) {
        codeArray[starIndex][rIndex][cIndex] = undefined;
        changedArray[starIndex][rIndex][cIndex] = undefined;
      } else {
        changedArray[starIndex][rIndex][cIndex] = true;
      }
    }
  
  function generateCode(add, code, starIndex, rIndex, cIndex) {
    let generatedCode = `${add} ${code}`;
    joinedCodes = "";
  
    if (Number(codeArray[starIndex][rIndex][cIndex]) === $battingLaunchAnglesStarRead[starIndex][rIndex][cIndex]) {
          generatedCode = undefined
          codeGenArray[starIndex][rIndex][cIndex] = generatedCode
    } else {
      codeGenArray[starIndex][rIndex][cIndex] = generatedCode;
    }

    codeGenArray.forEach(star => {
      star.forEach(row => {
        row.forEach(val => {
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
          $battingLaunchAnglesStarWrite[i][j] = originalValues[i][j];
          codeArray[i][j] = undefined
          changedArray[i][j] = undefined
          codeGenArray[i][j] = undefined
          joinedCodes = ""
        }
      }
    }
  
  function resetCell(starIndex, rIndex, cIndex) {
    // Reset all values to their defaults
    $battingLaunchAnglesStarWrite[starIndex][rIndex][cIndex] = originalValues[starIndex][rIndex][cIndex];
    codeArray[starIndex][rIndex][cIndex] = undefined        
        changedArray[starIndex][rIndex][cIndex] = undefined
    codeGenArray[starIndex][rIndex][cIndex] = undefined
    joinedCodes = ""
  }
  
  
  </script>
  
{#if $battingLaunchAnglesStarWrite}

<div class="card btn-group flex text-primary-500">
  <div class="btn flex">
  <Accordion>
  <AccordionItem>
        <svelte:fragment slot="summary"><div>View Code</div></svelte:fragment>
        <svelte:fragment slot="content">
        <div class="card p-4 max-h-[200px] overflow-auto space-y-4">
        {#each codeGenArray as star, ind}
          {#each star as row, ind2}
            {#each row as col, ind3}
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
  <!--button class="btn flex" on:click={() => {
  handleRandomFloat();
  handleRandomInt()
  }}>Randomize Stats</button-->
</div>

<div class="flex text-primary-500">
  The launch angle for each star hit is randomly chosen between an upper and lower bound for each type of star and the contact quality type. <br>
  (These are byte angles, which are out of 4096 instead of 360. To convert from degrees to bytes, just do (desired degrees) * 4096/360. Numbers above 4096 get normailzed to be between 0 and 4096) <br>
</div>

<TabGroup>
  {#each starTypes as star, starIndex}
    <Tab bind:group={tabSet} name={star} value = {starIndex} class="text-primary-400  ">
      <span>{star}</span>
    </Tab>
  {/each}
</TabGroup>

{#each starTypes as star, starIndex}
  {#if starIndex === tabSet}
    <div class="table-container">
      <table class="table table-interactive table-compact text-primary-400">
        <thead>
          <tr class="justify-center">
            <th class="flex-col justify-center text-center ">Contact Type</th>
            <th class="flex-col justify-center text-center ">Lower Bound Angle</th>
            <th class="flex-col justify-center text-center ">Upper Bound Angle</th>
          </tr>
        </thead>
        <tbody class="text-center justify-center align-middle">
        {#each $battingLaunchAnglesStarWrite[starIndex] as row, rIndex}
          <tr>
            <td>
              <div class="flex justify-center">{contactTypes[rIndex]}</div> 
            </td>
              {#each [0, 1] as upperLower}
                <td>
                  {#if changedArray[starIndex][rIndex][upperLower] !== true}
                    <input 
                      class="variant-ghost-surface input text-center" 
                      type="number"
                      bind:value={$battingLaunchAnglesStarWrite[starIndex][rIndex][upperLower]} 
                      on:input={updateArray(starIndex, rIndex, upperLower, $battingLaunchAnglesStarWrite[starIndex][rIndex][upperLower])} 
                      step="1"
                      min="0"
                      max="65535">
                    <div hidden>{resetCell(starIndex, rIndex, upperLower)}</div>
                  {:else if changedArray[starIndex][rIndex][upperLower] === true}
                    <input 
                      class="variant-ringed-primary input text-center" 
                      type="number" 
                      bind:value={$battingLaunchAnglesStarWrite[starIndex][rIndex][upperLower]} 
                      on:input={updateArray(starIndex, rIndex, upperLower, $battingLaunchAnglesStarWrite[starIndex][rIndex][upperLower])} 
                      step="1"
                      min="0"
                      max="65535">
                    <div hidden>
                      {generateCode(
                        modifyAddress("0x807b695c", 2 * (starIndex * 10 + rIndex * 2 + upperLower), "short"), 
                        convertToHex(codeArray[starIndex][rIndex][upperLower], "short"), 
                        starIndex,
                        rIndex, 
                        upperLower
                      )}
                    </div>
                    <button class="btn btn-lg " on:click={() => resetCell(starIndex, rIndex, upperLower)}>Reset</button>
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