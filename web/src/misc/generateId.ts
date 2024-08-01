
export const generateId = (): number => {
    // Generate a random id between 1 and 99999999999
    const id = Math.floor(Math.random() * 99999999999) + 1;

    // Seed the random number generator
    const seed = id.toString();
    let seedValue = 0;
    for (let i = 0; i < seed.length; i++) {
        seedValue += seed.charCodeAt(i);
    }
    const seededRandom = mulberry32(seedValue);

    // Generate a new random number using the seeded random generator
    const random = Math.floor(seededRandom() * 99999999999) + 1;
    return random;
}

// Mulberry32 PRNG algorithm
const mulberry32 = (a: number): () => number => {
    return (): number => {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}