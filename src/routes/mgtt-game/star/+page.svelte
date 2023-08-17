<script lang="ts">
  // @ts-nocheck
    import { Accordion, AccordionItem, RangeSlider, SlideToggle } from "@skeletonlabs/skeleton";
    import { mgttInGameRead, mgttInGameWrite } from "$lib/stores";
    import { convertToHex, modifyAddress } from "$lib/codeGen";
    import { clickToCopyAction } from "svelte-legos";
    import { exportCodesToFile, generateRandomInt, handleCopyDone } from "$lib/helpers/helpers";
    import { base } from "$app/paths"

    let joinedCodes = "";
    
    let originalValues = structuredClone($mgttInGameRead)

    let convertedType;

    // initialize array of undefined values for tracking the contents of changes
    let codeArray = Array.apply(null, Array($mgttInGameRead.length)).map(function () {
      return Array.apply(null, Array($mgttInGameWrite[0].length)).map(function () {
      })
    })
  
    // initialize array of undefined values for tracking whether changes have occured or not
    let changedArray = Array.apply(null, Array($mgttInGameRead.length)).map(function () {
      return Array.apply(null, Array($mgttInGameWrite[0].length)).map(function () {
      })
    })
  
    // initialize array of undefined values for tracking codes of changed values - 
    $: codeGenArray = Array.apply(null, Array($mgttInGameWrite.length)).map(function () {
      return Array.apply(null, Array($mgttInGameWrite[0].length)).map(function () {
      })
    })
      
  function updateArray (rIndex, cIndex, value) {
      codeArray[rIndex][cIndex] = Number(value)
  
      if (Number(codeArray[rIndex][cIndex]) === $mgttInGameRead[rIndex][cIndex]) {
        codeArray[rIndex][cIndex] = undefined;
        changedArray[rIndex][cIndex] = undefined;
      } else {
        changedArray[rIndex][cIndex] = true;
      }
    }
  
  function generateCode(add, code, rIndex, cIndex) {
      let generatedCode = `${add} ${code}`;
    joinedCodes = "";
  
      if (Number(codeArray[rIndex][cIndex]) === $mgttInGameRead[rIndex][cIndex]) {
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
          $mgttInGameWrite[i][j] = originalValues[i][j];
          codeArray[i][j] = undefined
          changedArray[i][j] = undefined
          codeGenArray[i][j] = undefined
          joinedCodes = ""
        }
      }
    }
  
  function resetCell(rIndex, cIndex) {
    // Reset all values to their defaults
    $mgttInGameWrite[rIndex][cIndex] = originalValues[rIndex][cIndex];
    codeArray[rIndex][cIndex] = undefined        
      changedArray[rIndex][cIndex] = undefined
    codeGenArray[rIndex][cIndex] = undefined
    joinedCodes = ""
  }
  
  let sliceList = $mgttInGameWrite.slice(2);
  let valuesOnly = sliceList.map((list) => list.slice(2, list.length));
  
  // function handleRandomInt() {
  //     generateRandomInt(valuesOnly, -10, 10);
  //     for (let i = 0; i < valuesOnly.length; i++) {
  //       for (let j = 0; j < valuesOnly[i].length; j++) {
  //         $mgttInGameWrite[i + 2][j + 2] = valuesOnly[i][j]
  //         updateArray(i + 2, j + 2, $mgttInGameWrite[i + 2][j + 2])
  
  //       }
  //     }
  //   }

  function handleRandomInt() {
      for (let i = 0; i < valuesOnly.length; i++) {
        for (let j = 0; j < valuesOnly[i].length; j++) {
          const minValue = (j === 0) ? 100 : (j === 2) ? 0 : -10
          const maxValue = (j === 0) ? 450 : (j === 2) ? 1 : 10
          generateRandomInt(valuesOnly, minValue, maxValue);  
          $mgttInGameWrite[i + 2][j + 2] = valuesOnly[i][j];
          updateArray(i + 2, j + 2, $mgttInGameWrite[i + 2][j + 2]);
        }
      }
    }
  

  </script>
  
  
  
  {#if $mgttInGameWrite}
  
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

    <button class="btn flex" on:click={() => {
      handleRandomInt()
    }}>Randomize Stats</button>

    {#if joinedCodes}
      <button class="btn flex btn-lg" use:clickToCopyAction={joinedCodes} on:copy-done={handleCopyDone}>Click to Copy</button>
  
      <button class="btn flex btn-lg" on:click={exportCodesToFile(joinedCodes)}>Export Codes</button>
  
      <button class="btn flex" on:click={resetAll}>Reset All</button>
    {/if}

  </div>
  <div class="table-container">
  
  
  
  <table class="table table-interactive table-compact text-primary-400">
    <thead>
      <tr class="justify-center">
        <!-- char name -->
        <th class="flex-col justify-center text-center ">{$mgttInGameWrite[0][0]}</th>
        <!-- rest of headers -->
      {#each $mgttInGameWrite[0].slice(2, $mgttInGameWrite[0].length) as header}
        <th class="flex-col justify-center text-center">{header}</th>
      {/each}
      </tr>
    </thead>
    <tbody class="text-center justify-center align-middle">
          
      {#each $mgttInGameWrite.slice(2, $mgttInGameWrite.length) as row, rIndex}
          <!-- {#if rIndex % 2 !== 0} -->
          <tr class="flex-col wrap">
            <!-- character names -->
            <td class="w-[6.25%]"><div class="flex justify-center">{row[0]}</div><div class="flex justify-center"><img src={`${base}/Images/${row[0]}.png`}></div></td>
            {#each row.slice(2, row.length) as column, cIndex}
              <td class="w-[12%]">
              <!-- if array has not changed -->
              {#if changedArray[rIndex + 2][cIndex + 2] !== true}
                <!-- if drive distance -->
                {#if cIndex === 0}
                  <RangeSlider bind:value={$mgttInGameWrite[rIndex + 2] [cIndex + 2]} min={5} max={500} step={5} ticked on:change={updateArray(rIndex + 2, cIndex + 2, $mgttInGameWrite[rIndex + 2][cIndex + 2])}>{$mgttInGameWrite[rIndex + 2][cIndex + 2]}</RangeSlider>         
                  <div hidden>{resetCell(rIndex + 2, cIndex + 2)}</div>
                <!-- if shot type -->
                {:else if cIndex === 2}
                    <RangeSlider checked={true} bind:value={$mgttInGameWrite[rIndex + 2] [cIndex + 2]} min={0} max={1} step={1} ticked on:change={updateArray(rIndex + 2, cIndex + 2, $mgttInGameWrite[rIndex + 2][cIndex + 2])}>{$mgttInGameWrite[rIndex + 2][cIndex + 2]}</RangeSlider>         
                    <div hidden>{resetCell(rIndex + 2, cIndex + 2)}</div>
                {:else}
                  <!-- <input class="variant-ghost-surface input text-center w-[60px]" type="number" bind:value={$mgttInGameWrite[rIndex + 2][cIndex + 2]} on:input={updateArray(rIndex + 2, cIndex + 2, $mgttInGameWrite[rIndex + 2][cIndex + 2])} step="1"  min="1" max="100"> -->
                  <RangeSlider bind:value={$mgttInGameWrite[rIndex + 2][cIndex + 2]} min={-10} max={10} step={1} ticked on:change={updateArray(rIndex + 2, cIndex + 2, $mgttInGameWrite[rIndex + 2][cIndex + 2])}>{$mgttInGameWrite[rIndex + 2][cIndex + 2]}</RangeSlider> 
                  <div hidden>{resetCell(rIndex + 2, cIndex + 2)}</div>
                {/if}
              <!-- if it has changed -->
              {:else if changedArray[rIndex + 2][cIndex + 2] === true}
                  <!-- <input class="variant-ghost-surface input text-center w-[60px]" type="number" bind:value={$mgttInGameWrite[rIndex + 2][cIndex + 2]} on:input={updateArray(rIndex + 2, cIndex + 2, $mgttInGameWrite[rIndex + 2][cIndex + 2])} step="1"  min="-10" max="10"> -->
                  {#if cIndex === 0}
                    <RangeSlider bind:value={$mgttInGameWrite[rIndex + 2][cIndex + 2]} on:change={updateArray(rIndex + 2, cIndex + 2, $mgttInGameWrite[rIndex + 2][cIndex + 2])} step={5}  min={0} max={500}>{$mgttInGameWrite[rIndex + 2][cIndex + 2]}</RangeSlider>

                    <div hidden>{generateCode(modifyAddress($mgttInGameRead[rIndex + 2][1], Number($mgttInGameRead[1][cIndex + 2]), 'word'), convertToHex(codeArray[rIndex + 2][cIndex + 2], 'word'), rIndex + 2, cIndex + 2)}</div>

                    <!-- <div hidden>{generateCode(modifyAddress($mgttInGameRead[rIndex + 2][1] - 0x8ce30, Number($mgttInGameRead[1][cIndex + 2]), 'word'), convertToHex(codeArray[rIndex + 2][cIndex + 2], 'word'), rIndex + 2, cIndex + 2)}</div> -->

                  {:else if cIndex === 2}

                    <RangeSlider bind:value={$mgttInGameWrite[rIndex + 2][cIndex + 2]} on:change={updateArray(rIndex + 2, cIndex + 2, $mgttInGameWrite[rIndex + 2][cIndex + 2])} step={1}  min={0} max={1}>{$mgttInGameWrite[rIndex + 2][cIndex + 2]}</RangeSlider>
                    <!-- <SlideToggle bind:value={convertedType} on:change={updateArray(rIndex + 2, cIndex + 2, $mgttInGameWrite[rIndex + 2][cIndex + 2])}></SlideToggle> -->

                    <div hidden>{generateCode(modifyAddress($mgttInGameRead[rIndex + 2][1], Number($mgttInGameRead[1][cIndex + 2]), 'word'), convertToHex(codeArray[rIndex + 2][cIndex + 2], 'word'), rIndex + 2, cIndex + 2)}</div>

                  {:else}
                    <RangeSlider bind:value={$mgttInGameWrite[rIndex + 2][cIndex + 2]} on:change={updateArray(rIndex + 2, cIndex + 2, $mgttInGameWrite[rIndex + 2][cIndex + 2])} step={1}  min={-10} max={10}>{$mgttInGameWrite[rIndex + 2][cIndex + 2]}</RangeSlider>

                    <div hidden>{generateCode(modifyAddress($mgttInGameRead[rIndex + 2][1], Number($mgttInGameRead[1][cIndex + 2]), 'word'), convertToHex(codeArray[rIndex + 2][cIndex + 2], 'word'), rIndex + 2, cIndex + 2)}</div>

                    <!-- <div hidden>{generateCode(modifyAddress($mgttInGameRead[rIndex + 2][1] - 0x8ce30, Number($mgttInGameRead[1][cIndex + 2]), 'word'), convertToHex(codeArray[rIndex + 2][cIndex + 2], 'word'), rIndex + 2, cIndex + 2)}</div> -->
                  {/if}
            <button class="btn btn-sm variant-filled-tertiary" on:click={() => resetCell(rIndex + 2, cIndex + 2)}>Reset</button>
              {/if}
              </td>
            {/each}
          </tr>
          <!-- {/if} -->
      {/each}
      </tbody>
  </table>
  </div>
  
  
  {/if}