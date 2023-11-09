/* 
Filename: complex_program.js
Content: A complex program that generates a random sequence of numbers, sorts it using bubble sort algorithm, and calculates the sum and average of the sorted sequence.
*/

// Function to generate random numbers between 1 and 100
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Function to generate a sequence of random numbers
function generateRandomSequence(length) {
  let sequence = [];
  for (let i = 0; i < length; i++) {
    sequence.push(generateRandomNumber());
  }
  return sequence;
}

// Function to sort the sequence using bubble sort algorithm
function bubbleSort(sequence) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < sequence.length - 1; i++) {
      if (sequence[i] > sequence[i + 1]) {
        let temp = sequence[i];
        sequence[i] = sequence[i + 1];
        sequence[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return sequence;
}

// Function to calculate the sum of the sequence
function calculateSum(sequence) {
  let sum = 0;
  for (let i = 0; i < sequence.length; i++) {
    sum += sequence[i];
  }
  return sum;
}

// Function to calculate the average of the sequence
function calculateAverage(sequence) {
  let sum = calculateSum(sequence);
  return sum / sequence.length;
}

// Main program
function main() {
  let sequence = generateRandomSequence(10);
  console.log("Generated Sequence:", sequence);
  
  let sortedSequence = bubbleSort(sequence);
  console.log("Sorted Sequence:", sortedSequence);
  
  let sum = calculateSum(sortedSequence);
  console.log("Sum of the Sorted Sequence:", sum);
  
  let average = calculateAverage(sortedSequence);
  console.log("Average of the Sorted Sequence:", average);
}

// Run the main program
main();