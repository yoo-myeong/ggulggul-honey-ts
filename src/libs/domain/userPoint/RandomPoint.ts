export class RandomPoint {
  private static readonly probabilities = [
    16384, 1048576, 524288, 262144, 131072, 131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32,
    16, 8, 4, 2, 1,
  ];

  private static readonly probabilitiesForFirst = [
    0, 0, 0, 262144, 131072, 131072, 65536, 32768, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  private static getRandomNumberWithProbability(probabilities: number[]) {
    const total = probabilities.reduce((acc, prob) => acc + prob, 0);
    const normalizedProbabilities = probabilities.map((prob) => (prob * 100) / total);
    const totalProbability = normalizedProbabilities.reduce((acc, prob) => acc + prob, 0);
    if (Math.abs(totalProbability - 100) > 0.0001) {
      throw new Error('확률의 합은 100이 되어야 합니다.');
    }

    const numbers = Array.from(Array(21).keys());

    const weightedNumbers = [];
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < normalizedProbabilities[i]; j++) {
        weightedNumbers.push(numbers[i]);
      }
    }

    const randomIndex = Math.floor(Math.random() * weightedNumbers.length);
    return weightedNumbers[randomIndex] * 100;
  }

  static generateRandomPoint() {
    return this.getRandomNumberWithProbability(this.probabilities);
  }

  static generateRandomPointForFirst() {
    return this.getRandomNumberWithProbability(this.probabilitiesForFirst);
  }
}
