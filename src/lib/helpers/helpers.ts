import charInfo from '$lib/data/charInfo.json';
import { messagesStore } from 'svelte-legos';

// convert character ID to character string
export function charName(charId: number) {
    return charInfo[charId].charName
}

// generate random float values for a given array
export function generateRandomFloat(arr: string | any[], min: number, max: number) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const val:number = (Math.random() * (max - min) + min)
            arr[i][j] = parseFloat(String(val)).toFixed(3)
        }
    }
}

// generate random integer values for a given array
export function generateRandomInt(arr: string | any[], min: number, max: number) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const val = Math.floor(Math.random() * (max - min + 1)) + min
            arr[i][j] = val
        }
    }
}

export function handleCopyDone() {
	messagesStore("Copied!");
}

export function exportCodesToFile(code:string) {
    if (code) {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'codes.txt';
      link.click();
      URL.revokeObjectURL(url);
    }
  }

// export function resetAll() {
//     // Reset all values to their defaults
//     for (let i = 0; i < originalValues.length; i++) {
//       for (let j = 0; j < originalValues[i].length; j++) {
//         $floatWrite[i][j] = originalValues[i][j];
//         codeArray[i][j] = undefined
//         changedArray[i][j] = undefined
//         codeGenArray[i][j] = undefined
//         joinedCodes = ""
//       }
//     }
//   }