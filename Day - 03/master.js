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
            // Check if there is a number when NaN charIndex is reached and handle the logic.
            if ( isNaN( parseInt( line[charIndex] ) ) || charIndex == line.length - 1 ) {
                if ( num ) {
                    // If last char is a number add it to num.
                    if(! isNaN( parseInt( line[charIndex] ) ) && charIndex == line.length - 1 ) {
                        num += parseInt( line[charIndex] );
                    }
                    // Iterate from the line above to below, to check the symbol.
                    for ( let lane of lanes ) {
                        // Ignore the first and last lines in the file.
                        if ( ! lane ) {
                            continue;
                        }

                        lane = lane.split(''); // Need line as array again.

                        // Get the correct startIndex incase the first char is a number.
                        if( lane[charIndex - ( num.length + 1 )] ) {
                            startIdx = charIndex - ( num.length + 1 );
                        } else {
                            startIdx = charIndex - num.length;
                        }

                        let foundNumber = false; // Flag to break the lane loop, if number is found.
                        // Iterate in the range searching for symbol.
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
            } else {
                // If charIndex is a number add it to num. ( for future, it's better to handle the information before the logic ).
                num += String( line[charIndex] );
            }

        }
    }
    console.log( result );
} )