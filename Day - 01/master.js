const fs = require('node:fs');

fs.readFile( 'data.txt', 'utf8', ( err, data ) => {
    const lines = data.split( '\n' );
    let result = 0;

    lines.forEach( line => {
        line = line.split('');
        let tmp = '';
        // Get the first number.
        for ( char of line ) {
            if ( ! isNaN( parseInt( char ) ) ) {
                tmp += String( char );
                break;
            }
        }
        // Get the last number.
        for ( char of line.reverse() ) {
            if ( ! isNaN( parseInt( char ) ) ) {
                tmp += String( char );
                break;
            }
        }

        result += parseInt( tmp );
    } );
    // Log the final result.
    console.log( result );
} );


