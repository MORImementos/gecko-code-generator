<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { clickToCopyAction, messagesStore } from "svelte-legos";
  
    const float = "float";
    const short = "short";
    const halfword = "halfword";
    const word = "word";
    const byte = "byte";
  
    // Testing data
    let initialValues = [
      { floatValue: 1.7, initialFloatValue: 1.7, hexValue: "", address: 0x80888888 },
      { floatValue: 2.5, initialFloatValue: 2.5, hexValue: "", address: 0x80888889 },
      { floatValue: 3.2, initialFloatValue: 3.2, hexValue: "", address: 0x8088888A },
      // Add more rows as needed
    ];
  
    let codeLines: any[] = [];
  
    function handleCopyDone() {
      messagesStore("Copied!");
    }
  
    function handleCopyError() {
      messagesStore("Error copying!");
    }
  
    function modifyAddress(add: number, codeType = byte) {
      let codePrefix = "";
      if (codeType === byte) {
        codePrefix = "00";
      } else if (codeType === short || codeType === halfword) {
        codePrefix = "02";
      } else if (codeType === float || codeType === word) {
        codePrefix = "04";
      }
      return add.toString(16).replace(/^80/, codePrefix);
    }
  
    const dispatch = createEventDispatcher();
  
    function updateHexValue(row: { floatValue?: any; initialFloatValue?: any; hexValue?: any; address?: any; initialHexValue?: any; }) {
      const { floatValue, address, initialFloatValue } = row;
  
      const floatArray = new Float32Array([floatValue]);
      const buffer = new ArrayBuffer(4);
      const dataView = new DataView(buffer);
      dataView.setFloat32(0, floatArray[0], false);
      const hexValue = dataView.getUint32(0).toString(16).padStart(8, "0");
  
      const modifiedAddress = modifyAddress(address, float);
      const currentCode = modifiedAddress + " " + hexValue;
  
      if (floatValue !== initialFloatValue) {
        dispatch("valueChanged", floatValue);
      }
  
      row.hexValue = hexValue;
  
      // Update the codeLines array only if the hexValue was updated
      if (row.hexValue !== row.initialHexValue) {
        row.initialHexValue = row.hexValue;
        updateCodeLines();
      }
    }
  
    function updateCodeLines() {
      codeLines = initialValues.map((row) => {
        const { floatValue, address } = row;
  
        const floatArray = new Float32Array([floatValue]);
        const buffer = new ArrayBuffer(4);
        const dataView = new DataView(buffer);
        dataView.setFloat32(0, floatArray[0], false);
        const hexValue = dataView.getUint32(0).toString(16).padStart(8, "0");
  
        const modifiedAddress = modifyAddress(address, float);
        const currentCode = modifiedAddress + " " + hexValue;
  
        return currentCode;
      });
    }
  
    // Initialize the initialHexValue property for each row
    initialValues.forEach((row) => {
      row.initialHexValue = row.hexValue;
    });
  
    updateCodeLines(); // Initial update of codeLines
  </script>
  
  <div class="card flex-col space-y-10">
    <div class="card align-middle justify-center flex justify-between p-4 m-4">
      <h3 class="h3 justify-center align-middle flex">Current Code:</h3>
      <div class="flex-col">
        {#each codeLines as codeLine, index}
          <span class="justify-center align-middle flex">{codeLine}</span>
        {/each}
      </div>
      <button class="btn variant-filled-primary" use:clickToCopyAction={codeLines.join("\n")} on:copy-done={handleCopyDone} on:copy-error={handleCopyError}>
        <span class="flex">Click to copy code</span>
      </button>
    </div>
    <div class="card table-container">
      <table class="table table-interactive table-hover">
        <thead class="flex-col">
          <tr>
            <th>Original</th>
            <th>Edited Value</th>
            <th>Current Value</th>
            <th>Edit Value Here</th>
          </tr>
        </thead>
        <tbody class="flex-col flex-auto">
          {#each initialValues as row, index}
            <tr>
              <td>{row.initialFloatValue}</td>
              {#if row.floatValue !== row.initialFloatValue}
                <td class="changed-value">
                  {modifyAddress(row.address, float)} {row.hexValue}
                </td>
              {:else}
                <td>{row.hexValue}</td>
              {/if}
              <td>{row.floatValue}</td>
              <td>
                <input type="number" bind:value={row.floatValue} step="0.01" on:input={() => updateHexValue(row)} />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  
    <p>The updated values will be displayed in the table. If the value is different from the original, the edited value will be displayed in white.</p>
  </div>
  
  <style>
    /* Your styles here */
  </style>
  