import { rows } from './stores';

export function convertToHex(value, dataType) {
    // ...existing code...
  
    if (dataType === 'float') {
      // ...existing code...
  
      const floatHex = dataView.getUint32(0).toString(16).padStart(8, '0');
      console.log('Float value (hex):', floatHex);
  
      // Add the row to the rows array store
      rows.update(rowsArray => [...rowsArray, { value, dataType, hex: floatHex }]);
  
      return floatHex;
    } else if (dataType === 'word') {
      // ...existing code...
  
      const wordHex = wordValue.toString(16).padStart(8, '0');
      console.log('Word value (hex):', wordHex);
  
      // Add the row to the rows array store
      rows.update(rowsArray => [...rowsArray, { value, dataType, hex: wordHex }]);
  
      return wordHex;
    } else if (dataType === 'halfword') {
      // ...existing code...
  
      const halfWordHex = halfWordValue.toString(16).padStart(4, '0');
      const fullHex = '0000' + halfWordHex;
      console.log('Halfword value (hex):', fullHex);
  
      // Add the row to the rows array store
      rows.update(rowsArray => [...rowsArray, { value, dataType, hex: fullHex }]);
  
      return fullHex;
    } else if (dataType === 'byte') {
      // ...existing code...
  
      const byteHex = byteValue.toString(16).padStart(2, '0');
      console.log('Byte value (hex):', byteHex);
  
      // Add the row to the rows array store
      rows.update(rowsArray => [...rowsArray, { value, dataType, hex: byteHex }]);
  
      return byteHex;
    } else {
      console.log('Invalid data type');
      return null;
    }
  }
  