const stdin = process.openStdin();


const reverse = (str) => {
    console.log(str.split('').reverse().join(''))
}


stdin.addListener('data', (d) => {
    reverse(d.toString().trim())
});