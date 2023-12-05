const fs = require( 'fs' );

fs.readFile( 'data.txt', 'utf8', ( err, data ) => {
    let id = 1;
    let result = 0;
    const lines = data.split( '\n' );

    for ( let line of lines ) {
        let setIsOk = true;
        line = line.split( ': ' ).at( -1 ).split( ';' );

        for ( let subset of line ) {
            subset = subset.split( ', ' );

            for ( let cube of subset ) {
                cube = cube.trimStart().split( ' ' );
                if ( cube[1].includes( 'red' ) && cube[0] > 12 ) {
                    setIsOk = false;
                    break;
                } else if  ( cube[1].includes( 'green' ) && cube[0] > 13 ) {
                    setIsOk = false;
                    break;
                } else if ( cube[1].includes( 'blue' ) && cube[0] > 14 ) {
                    setIsOk = false;
                    break;
                }
            }
        }

        if ( setIsOk ) result += id;
        id++;
    }
    console.log( result );
} )