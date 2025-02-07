import React, { useState, useCallback, useEffect } from 'react';
import { LogicalOperation } from './types';
import { useNeuralNetwork } from './hooks/useNeuralNetwork';
import Controls from './components/Controls';
import NetworkVisualization from './components/NetworkVisualization';
import TrainingMetrics from './components/TrainingMetrics';

function App() {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [operation, setOperation] = useState<LogicalOperation>('AND');
  
  const {
    networkState,
    trainNetwork,
    predict,
    resetNetwork,
    stopTraining
  } = useNeuralNetwork();

  const handleStartTraining = useCallback(() => {
    trainNetwork(operation);
  }, [operation, trainNetwork]);

  const handleStopTraining = useCallback(() => {
    stopTraining();
  }, [stopTraining]);

  const handleReset = useCallback(() => {
    resetNetwork();
  }, [resetNetwork]);

  // Update prediction when inputs change
  useEffect(() => {
    predict(input1, input2);
  }, [input1, input2, predict]);

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4 font-mono tracking-wider">
            Neural Knights
          </h1>
          <p className="mt-2 text-gray-400">
            Train a neural network to learn logical operations in real-time
          </p>
        </div>

        <Controls
          input1={input1}
          input2={input2}
          operation={operation}
          isTraining={networkState.isTraining}
          onInput1Change={setInput1}
          onInput2Change={setInput2}
          onOperationChange={setOperation}
          onStartTraining={handleStartTraining}
          onStopTraining={handleStopTraining}
          onReset={handleReset}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NetworkVisualization
            networkState={networkState}
            input1={input1}
            input2={input2}
          />
          
          <TrainingMetrics
            epochs={networkState.epochs}
            error={networkState.error}
            prediction={networkState.prediction}
            probabilities={networkState.probabilities}
          />
        </div>
      </div>
    </div>
  );
}

export default App