var sum_to_n_a = function(n)
{
    return (n*(n+1))/2
};

var sum_to_n_b = function(n)
{
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
console.log(sum_to_n_b(10));
console.log(sum_to_n_c(10));
