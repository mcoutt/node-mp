const stdin = process.openStdin();


const reverse = (arr) => {
    let getArray = [];

    for (let i = 0; i < arr.length; i++) {
        getArray.push(arr.charAt(i))
    }
    let resAr = getArray.reverse();
    console.log(resAr.join(''));
}


stdin.addListener('data', (d) => {
    reverse(d.toString().trim())
});