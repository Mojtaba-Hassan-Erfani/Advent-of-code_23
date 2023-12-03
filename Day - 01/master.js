const fs = require('node:fs');
const matches = {
    'fiveight': '58', 'oneight': '18', 'threeight': '38', 'nineight': '98', 'eightwo': '82', 'twone': '21',
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
};

fs.readFile( 'data.txt', 'utf8', ( err, data ) => {
    const lines = data.split( '\n' );
    let tmp = '';
    let result = 0;

    lines.forEach( line => {
        tmp = '';
        line =getNumber( line );

         // Get the first number.
        tmp = line.charAt( 0 ) + line.charAt( line.length - 1 );
        result += parseInt( tmp );
    } );

    // Log the final result.
    console.log( result );
} );

const getNumber = ( line ) => {
    let markus = '';
    for( let[ key, value ] of Object.entries( matches ) ) {
        line = line.replaceAll( key, value );
    }
    for( char of line ) {
        if( ! isNaN( parseInt( char ) ) ) {
            markus += char;
        }
    }
    return markus;
}


