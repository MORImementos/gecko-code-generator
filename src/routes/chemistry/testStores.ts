import { writable, derived } from 'svelte/store';

// Readable store for the original data
export const originalData = writable([
  { character: 'Mario', stat: 'Curve Speed', editedStat: 150, addressOffset: 0x0 },
  { character: 'Mario', stat: 'Charge Speed', editedStat: 150, addressOffset: 0x1 },
  { character: 'Luigi', stat: 'Curve Speed', editedStat: 150, addressOffset: 0xA0 },
  { character: 'Luigi', stat: 'Charge Speed', editedStat: 150, addressOffset: 0xA1 },
  // ...
]);

// Writable store to track the edits
export const editedData = writable([
  { character: 'Mario', stat: 'Curve Speed', editedStat: 150, addressOffset: 0x0 }, // initialize with the same data as originalData
  { character: 'Mario', stat: 'Charge Speed', editedStat: 150, addressOffset: 0x1 },
  { character: 'Luigi', stat: 'Curve Speed', editedStat: 150, addressOffset: 0xA0 },
  { character: 'Luigi', stat: 'Charge Speed', editedStat: 150, addressOffset: 0xA1 },
  // ...
]);

// Derived store to generate gecko codes based on differences
export const geckoCodes = derived([originalData, editedData], ([$originalData, $editedData]) => {
  const geckoCodes: any[] = [];

  // Compare originalData and editedData to identify differences
  $originalData.forEach((originalRow, index) => {
    const editedRow = $editedData[index];

    if (originalRow.editedStat !== editedRow.editedStat) {
      // Generate gecko code for the modified stat
      const character = originalRow.character;
      const stat = originalRow.stat;
      const editedStat = editedRow.editedStat;
      const addressOffset = originalRow.addressOffset;

      const geckoCode = generateGeckoCode(character, stat, editedStat, addressOffset);
      geckoCodes.push(geckoCode);
    }
  });

  return geckoCodes;
});

// Function to generate the gecko code
function generateGeckoCode(character: string, stat: string, editedStat: number, addressOffset: number) {
  const startAddress = character === 'Mario' ? 0x80000000 : 0x800000A0;
  const address = startAddress + addressOffset;
  const geckoCode = `$${address.toString(16)} ${editedStat.toString(16)}`;

  return geckoCode;
}
