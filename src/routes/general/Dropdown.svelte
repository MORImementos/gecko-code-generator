<script>
    export let options = []; // Array of dropdown options
    export let selectedOption = ''; // Currently selected option
  
    // Handle option selection
    function handleSelect(event) {
      selectedOption = event.target.value;
    }
  </script>
  
  <select on:change={handleSelect} value={selectedOption}>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  