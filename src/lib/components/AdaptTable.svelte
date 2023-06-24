<script lang="ts">
import { convertToHex } from "$lib/codeGen";
import { writable } from "svelte/store";
// import * as byteInfo from '$app/data/byteInfo';

// console.log(byteInfo)
let initialValue = 0.55
let currentValue = writable(initialValue);
// let currentValue = initialValue;

let testValue = 2;
let floatStep = "0.01";
let byteStep = "1";
</script>

<h1>{$currentValue}</h1>
<table class="table">
    <tr>
        <td>Character</td>
        <td>Stat Type</td>
        <td>Initial Value</td>
        <td>Current Value</td>
    </tr>
    <tr>
        <td>Mario</td>
        <td>Bat Reach - Far</td>
        <td>{initialValue}</td>
        <td>{$currentValue}</td>
    </tr>
</table>
<!-- <input type="number" bind:value={currentValue} step={floatStep}> -->
<input type="number" bind:value={$currentValue} step={floatStep}>

<!-- <input type="number" bind:value={testValue} step={byteStep}> -->

<div>{convertToHex($currentValue, 'float')}</div>