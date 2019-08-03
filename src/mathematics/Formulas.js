export function computeRe(p, v, D, miu) {

    if(miu !== 0) {
        return (p * v * D) / miu;
    }
    return null;
    
}

export function computeNu (re, Pr) {

    let medio = 1 / 2;
    let tercio = 1 / 3;
    return 0.664 * Math.pow(re, medio) * Math.pow(Pr, tercio);
}

export function computeH() {

}

export function computeQigbt() {

}

export function computeMGlicol() {

}

export function computeQDisipador() {

}

export function computedT() {

}