import React from 'react';
import { LogicalOperation } from '../types';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  input1: number;
  input2: number;
  operation: LogicalOperation;
  isTraining: boolean;
  onInput1Change: (value: number) => void;
  onInput2Change: (value: number) => void;
  onOperationChange: (operation: LogicalOperation) => void;
  onStartTraining: () => void;
  onStopTraining: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  input1,
  input2,
  operation,
  isTraining,
  onInput1Change,
  onInput2Change,
  onOperationChange,
  onStartTraining,
  onStopTraining,
  onReset,
}) => {
  const operations: LogicalOperation[] = [
    'AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'IMPLIES', 'NIMPLIES', 'NOT', 'BUFFER'
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-red-900">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300">Input 1</label>
            <select
              value={input1}
              onChange={(e) => onInput1Change(Number(e.target.value))}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300">Input 2</label>
            <select
              value={input2}
              onChange={(e) => onInput2Change(Number(e.target.value))}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300">Operation</label>
            <select
              value={operation}
              onChange={(e) => onOperationChange(e.target.value as LogicalOperation)}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              {operations.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={isTraining ? onStopTraining : onStartTraining}
            className={`flex items-center px-4 py-2 rounded-md text-white ${
              isTraining ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isTraining ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop Training
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Training
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Network
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;