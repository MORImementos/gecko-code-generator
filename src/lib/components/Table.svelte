<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { clickToCopyAction, messagesStore } from "svelte-legos";
    import { RangeSlider } from "@skeletonlabs/skeleton";
    const float = "float";
    const short = "short";
    const halfword = "halfword";
    const word = "word";
    const byte = "byte";

    // testing data
    let floatValue = 0.55;
    let hexValue: string;
    let initialFloatValue = floatValue;
    let address = 0x807B84FC;
    let modifiedAddress = '';
    let currentCode = '';

    // slider
    let max = 5;

    function handleCopyDone() {
        messagesStore("Copied!");
    };
    function handleCopyError() {
        messagesStore("Error copying!");
    };

    // function to take address and remove initial 2 numbers to add relevant codetype prefix
    function modifyAddress(add: number, codeType=byte) {
        let codePrefix = '';
        if (codeType === byte) {
            codePrefix = "00"
        } else if (codeType === short || codeType === halfword) {
            codePrefix = "02"
        } 
        else if (codeType === float || codeType === word) {
            codePrefix = "04"
        }
        modifiedAddress = add.toString(16).replace(/^80/, codePrefix);
        return modifiedAddress;
    }

    const dispatch = createEventDispatcher();

    $: {
        updateHexValue(floatValue, float);

        if (floatValue !== initialFloatValue) { 
        currentCode = modifiedAddress.toString() + " " + hexValue; 
        } else {
            currentCode = '';
        }
        if (floatValue !== initialFloatValue) {
            console.log('Value changed', floatValue);
        }
    }

    function updateHexValue(stat: Number, statType: String) {
        if (statType === float) {
            const floatArray = new Float32Array([stat]);
            const buffer = new ArrayBuffer(4);
            const dataView = new DataView(buffer);
            dataView.setFloat32(0, floatArray[0], false);
            hexValue = dataView.getUint32(0).toString(16).padStart(8, '0');

            if (floatValue !== initialFloatValue) {
                dispatch('valueChanged', floatValue);
            }
        } else if (statType === byte) {

        } else if (statType === halfword) {
            
        } else if (statType === word) {
            
        }
    }
</script>
<div class="card flex-col space-y-10">
    <div class="card align-middle justify-center flex justify-between p-4 m-4">
    <h3 class="h3 justify-center align-middle flex">Current Code:</h3>
    {#if floatValue !== initialFloatValue}
        <span class="justify-center align-middle flex">{currentCode}</span>
    {/if}
    <button class="btn variant-filled-primary" use:clickToCopyAction={currentCode} on:copy-done={handleCopyDone} on:copy-error={handleCopyError}>
      <span class="flex">Click to copy code</span>
    </button>
    </div>
    <div class="card table-container">
      <table class="table table-interactive table-hover">
        <thead class="flex-col">
          <tr>
            <th>Character</th>
            <th>Stat Type</th>
            <th>Original</th>
            <th>Edited Value</th>
            <th>Current Value</th>
            <th>Edit Value Here</th>
          </tr>
        </thead>
        <tbody class="flex-col flex-auto">
          <tr>
            <td>Mario</td>
            <td>Bat Reach - Far</td>
            <td>{initialFloatValue}</td>
            {#if floatValue !== initialFloatValue}
                <td class="changed-value">
                    {modifyAddress(address, float)} {hexValue}
                </td>
            {:else}
                <td>
                    {hexValue}
                </td>
            {/if}
            <td>
                {floatValue}
            </td>
            <td>
                <!-- <RangeSlider name="range-slider" bind:value={floatValue} max={5} step={0.01} min={-5} ticked>
                    <div class="flex justify-between items-center">
                        <div class="font-bold">Label</div>
                        <div class="text-xs">{floatValue} / {max}</div>
                    </div>
                </RangeSlider> -->
              <!-- <input type="range" bind:value={floatValue} step="0.01"> -->
              <input type="number" bind:value={floatValue} step="0.01">

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <p>The updated values will be displayed in the table. If the value is different from the original, the edited value will be displayed in white.</p>
  </div>
  
  <style>
    .card {
      /* Your card styles */
    }
  
    .space-y-10 > * + * {
      margin-top: 1.5rem;
    }
  
    .table-container {
      overflow-x: auto;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
    }
  
    th, td {
      padding: 0.5rem;
      text-align: center;
    }
  
    .changed-value {
      color: #fff;
    }
  </style>