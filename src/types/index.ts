export type LogicalOperation = 
  | 'AND' 
  | 'OR' 
  | 'XOR' 
  | 'NAND' 
  | 'NOR' 
  | 'XNOR' 
  | 'IMPLIES' 
  | 'NIMPLIES' 
  | 'NOT' 
  | 'BUFFER';

export interface TrainingData {
  input1: number;
  input2: number;
  operation: LogicalOperation;
  expectedOutput: number;
}

export interface NetworkState {
  epochs: number;
  error: number;
  weights: number[][];
  biases: number[];
  prediction: number;
  probabilities: [number, number];
  isTraining: boolean;
}