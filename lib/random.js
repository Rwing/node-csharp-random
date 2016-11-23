'use strict'

class Random {

    constructor(seed) {
        this.MBIG = 2147483647;
        this.MSEED = 161803398;
        this.MZ = 0;
        this.inext;
        this.inextp;
        this.SeedArray = [];

        var ii;
        var mj, mk;

        //Initialize our Seed array.
        //This algorithm comes from Numerical Recipes in C (2nd Ed.)
        var subtraction = (seed == -2147483648) ? 2147483647 : Math.abs(seed);
        mj = this.MSEED - subtraction;
        this.SeedArray[55] = mj;
        mk = 1;
        for (let i = 1; i < 55; i++) {  //Apparently the range [1..55] is special (Knuth) and so we're wasting the 0'th position.
            ii = (21 * i) % 55;
            this.SeedArray[ii] = mk;
            mk = mj - mk;
            if (mk < 0) mk += this.MBIG;
            mj = this.SeedArray[ii];
        }
        for (let k = 1; k < 5; k++) {
            for (let i = 1; i < 56; i++) {
                this.SeedArray[i] -= this.SeedArray[1 + (i + 30) % 55];
                if (this.SeedArray[i] < 0) this.SeedArray[i] += this.MBIG;
            }
        }
        this.inext = 0;
        this.inextp = 21;
        seed = 1;
    }

    InternalSample() {
        var retVal;
        var locINext = this.inext;
        var locINextp = this.inextp;

        if (++locINext >= 56) locINext = 1;
        if (++locINextp >= 56) locINextp = 1;

        retVal = this.SeedArray[locINext] - this.SeedArray[locINextp];

        if (retVal == this.MBIG) retVal--;
        if (retVal < 0) retVal += this.MBIG;

        this.SeedArray[locINext] = retVal;

        this.inext = locINext;
        this.inextp = locINextp;

        return retVal;
    }

    Sample() {
        //Including this division at the end gives us significantly improved
        //random number distribution.
        return (this.InternalSample() * (1.0 / this.MBIG));
    }

    Next(minValue, maxValue) {
        if (minValue === undefined && maxValue === undefined)
            return this.InternalSample();
        if (maxValue === undefined)
            return parseInt(this.Sample() * minValue);
        var range = maxValue - minValue;
        return parseInt(this.Sample() * range) + minValue;
    }

    NextDouble() {
        //match to c# double https://msdn.microsoft.com/en-us/library/678hzkk9.aspx
        return parseFloat(this.Sample().toFixed(15));
    }
}

module.exports = Random;