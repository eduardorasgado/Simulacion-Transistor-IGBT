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

export function computeH(k, l, nu) {
    if(l !== 0) {
        return (k * nu) / l;
    }
    return null;
}

export function computeQigbt(A, h, Ts, Tinf) {
    return A * h * (Ts - Tinf);
}

export function computeMGlicol(pGlicol, Qcaudal) {
    return pGlicol * Qcaudal;
}

export function computeQDisipador(mGlicol, CpGlicol, deltaTGlicol) {
    return mGlicol * CpGlicol * deltaTGlicol;
}

export function computedT(E1, E2, Qdisipador, Qigbt, m, Cp) {
    let mCp = m * Cp;
    if(mCp !== 0) {
        return (E1 - E2 - Qdisipador - Qigbt) / mCp;
    }
    return null;
}

// funciones extra para la simulacion de resistencia
export function computeNuResistencia(Re, Pr) {
    let tercio = 1 / 3;
    return 0.027 * Math.pow(Re, 0.805) * Math.pow(Pr, tercio);
}

export function computedTResistencia(E1,Qigbt, Pd, m, Cp) {
    let mCp = m * Cp;
    if(mCp !== 0){
        return (E1 - Qigbt - Pd) / mCp;
    }
    return null;
}