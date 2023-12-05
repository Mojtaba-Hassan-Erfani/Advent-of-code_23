const fs = require( 'fs' );

fs.readFile( 'data.txt', 'utf8', ( err, data ) => {
    let result = 0;
    const lines = data.split( '\n' );

    for ( let line of lines ) {
        let amount = 0;
        let highest = { 'red': 0, 'green': 0, 'blue': 0 };

        line = line.split( ': ' ).at( -1 );
        line = line.split( '; ' );

        for ( let subset of line ) {
            subset = subset.split( ', ' );

            for ( let cube of subset ) {
                cube = cube.trimStart().split( ' ' );
                if ( cube[1].includes( 'red' ) && cube[0] > parseInt( highest['red'] ) ) {
                    highest['red'] = cube[0];
                } else if ( cube[1].includes( 'green' ) && cube[0] > parseInt( highest['green'] ) ) {
                    highest['green'] = cube[0];
                } else if ( cube[1].includes( 'blue' ) && cube[0] > parseInt( highest['blue'] ) ) {
                    highest['blue'] = cube[0];
                }
            }
        }

        for ( const [cube, value] of Object.entries( highest ) ) {
            if ( ! cube ) {
                continue;
            }

            switch ( cube ) {
                case 'red':
                    if ( highest['green'] ) {
                        amount += value * highest['green'];
                    }
                    if ( highest['blue'] && ! highest['green'] ) {
                        amount += value * highest['blue'];
                    }
                    break;
                case 'green':
                    if ( highest['blue'] ) {
                        amount = amount * highest['blue'];
                    }
                    break;
            }
        }

        result += amount;
    }

    console.log( result );
} )