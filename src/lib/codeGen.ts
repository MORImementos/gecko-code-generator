export function convertToHex(value: number, dataType: string) {
    if (dataType === 'float') {
      // Creating a buffer to hold the binary data
      const buffer = new ArrayBuffer(4);
      // Creating a DataView to access the buffer
      const dataView = new DataView(buffer);

      // Setting the float value
      dataView.setFloat32(0, value);

      // Accessing the float value
      // const viewedFloat = dataView.getFloat32(0);
      // console.log('Float value:', viewedFloat);

      // Displaying the float value as hex
      const floatHex = dataView.getUint32(0).toString(16).padStart(8, '0');
      // console.log('Float value (hex):', floatHex);

      return floatHex.toUpperCase();
    } else if (dataType === 'word') {
      // Converting integer to hex format with all 4 bytes
      const wordValue = value & 0xFFFFFFFF; // Masking to ensure 4 bytes

      // Displaying the word value as hex
      const wordHex = wordValue.toString(16).padStart(8, '0');
      // console.log('Word value (hex):', wordHex);

      return wordHex.toUpperCase();
    } else if (dataType === 'halfword') {
      // Converting integer to hex format with the last 2 bytes and 2 preceding zero bytes
      const halfWordValue = value & 0xFFFF; // Masking to ensure 2 bytes

      // Displaying the halfword value as hex
      const halfWordHex = halfWordValue.toString(16).padStart(4, '0');
      const fullHex = '0000' + halfWordHex;
      // console.log('Halfword value (hex):', fullHex);

      return fullHex.toUpperCase();
    } else if (dataType === 'byte') {
      // Converting integer to hex format with only the last byte
      const byteValue = value & 0xFF; // Masking to ensure 1 byte

      // Displaying the byte value as hex
      const byteHex = byteValue.toString(16).padStart(2, '0');
      // console.log('Byte value (hex):', byteHex);

      return byteHex.toUpperCase();
    } else {
      console.log('Invalid data type');
      return null;
    }
}

export function modifyAddress(add: number, offset: number, codeType = "byte") {
  let codePrefix = "";
  if (codeType === "byte") {
  codePrefix = "00";
} else if (codeType === "short" || codeType === "halfword") {
  codePrefix = "02";
} else if (codeType === "float" || codeType === "word") {
  codePrefix = "04";
}
const modifiedAddress = (parseInt(String(add), 16) + offset).toString(16).replace(/^80/, codePrefix).toUpperCase();
return modifiedAddress;
}
