const fs = require( 'fs' );

fs.readFile( 'data.txt', 'utf8', ( err, data ) => {
    // Correct Guess: 530849;
    let num = '';
    let result = 0;
    let startIdx = 0;
    const lines = data.split( '\n' );

    for ( let i = 0; i < lines.length; ++i ) {
        num = '';
        const line = lines[i].split('');
        const lanes = [ lines[i-1], lines[i], lines[i+1] ];

        for ( let charIndex = 0; charIndex < line.length; ++charIndex ) {
            const lastIndex = charIndex === line.length - 1;
            const charIsDigit = ! isNaN( parseInt( line[charIndex] ) );
            // While char is a number, add it to the num.
            if ( charIsDigit ) {
                num += String( line[charIndex] );
            }
            // In case there is a number, check if it is legit. Also handle the last index in the line.
            if ( ( num && ( ! charIsDigit || lastIndex ) )  ) {
                // Iterate from the line above to below, to check the symbol.
                for ( let lane of lanes ) {
                    // Ignore the first and last lines in the file.
                    if ( ! lane ) {
                        continue;
                    }

                    lane = lane.split(''); // Need line as array again.

                    // Get the correct startIndex in case the first char is a number.
                    if( lane[charIndex - ( num.length + 1 )] ) {
                        startIdx = charIndex - ( num.length + 1 );
                    } else {
                        startIdx = charIndex - num.length;
                    }

                    let foundNumber = false; // Flag to break the lane loop, if number is found.
                    // Iterate in the possible range to search for symbol.
                    for( let idx = startIdx; idx <= charIndex; ++idx ) {
                        if( lane[idx] != '.' && isNaN( lane[idx] ) ) {
                            result += parseInt( num );
                            foundNumber = true;
                            break;
                        }
                    }

                    if( foundNumber ) break;
                }
                num = '';
            }
        }
    }
    console.log( result );
} )