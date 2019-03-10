function cuboidCuboidCollision(one, two) {
    if ( (2*Math.abs(one[0][0] - two[0][0]) <= one[1] + two[1]) && (2*Math.abs(one[0][1] - two[0][1]) <= one[2] + two[2]) && (2*Math.abs(one[0][2] - two[0][2]) <= one[3] + two[3]) ) {
        return true;
    } 
    else {
        return false;
    }
}

function gameFinishCollision(player, police) {
    if ( (2*Math.abs(player[0][0] - police[0][0]) <= player[1] + police[1]) && (2*Math.abs(player[0][2] - police[0][2]) <= player[3] + police[3]) ) {
        return true;
    } 
    else {
        return false;
    }
}