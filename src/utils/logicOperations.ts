import { LogicalOperation } from '../types';

export const evaluateLogicOperation = (
  input1: number,
  input2: number,
  operation: LogicalOperation
): number => {
  switch (operation) {
    case 'AND':
      return input1 && input2 ? 1 : 0;
    case 'OR':
      return input1 || input2 ? 1 : 0;
    case 'XOR':
      return input1 !== input2 ? 1 : 0;
    case 'NAND':
      return input1 && input2 ? 0 : 1;
    case 'NOR':
      return input1 || input2 ? 0 : 1;
    case 'XNOR':
      return input1 === input2 ? 1 : 0;
    case 'IMPLIES':
      return !input1 || input2 ? 1 : 0;
    case 'NIMPLIES':
      return input1 && !input2 ? 1 : 0;
    case 'NOT':
      return input1 ? 0 : 1;
    case 'BUFFER':
      return input1;
    default:
      return 0;
  }
};

export const generateTrainingData = (operation: LogicalOperation) => {
  const data = [];
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j <= 1; j++) {
      data.push({
        input1: i,
        input2: j,
        operation,
        expectedOutput: evaluateLogicOperation(i, j, operation)
      });
    }
  }
  return data;
};