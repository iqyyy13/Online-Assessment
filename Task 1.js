var sum_to_n_a = function(n){
    console.log("Received n:", n)

    var x
    var total = 0

    for(x=1; x<=n; x++)
    {
        total += x
    }

    n = total

    return n
};

var sum_to_n_b = function(n){
    console.log("Received n:", n)

    var total = 0
    var i = 1

    while(i<=n)
    {
        total += i
        i++
    }

    return total;
}


var sum_to_n_c = function(n)
{
    console.log("Received n:", n)

    if(n===1)
    {
        return 1
    }
    else
    {
        return n + sum_to_n_c(n-1)
    }
}

console.log(sum_to_n_a(10));
console.log("")
console.log(sum_to_n_b(10));
console.log("")
console.log(sum_to_n_c(10));
