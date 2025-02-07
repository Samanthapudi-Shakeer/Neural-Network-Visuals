import { useState, useCallback, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { LogicalOperation, NetworkState } from '../types';
import { generateTrainingData } from '../utils/logicOperations';

export const useNeuralNetwork = () => {
  const [model, setModel] = useState<tf.Sequential | null>(null);
  const [networkState, setNetworkState] = useState<NetworkState>({
    epochs: 0,
    error: 1,
    weights: [],
    biases: [],
    prediction: 0,
    probabilities: [0.5, 0.5],
    isTraining: false
  });

  // Initialize model
  const initializeModel = useCallback(() => {
    const newModel = tf.sequential();
    
    newModel.add(tf.layers.dense({
      units: 4,
      activation: 'relu',
      inputShape: [2]
    }));
    
    newModel.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid'
    }));

    newModel.compile({
      optimizer: tf.train.adam(0.1),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });

    setModel(newModel);
    return newModel;
  }, []);

  // Reset network
  const resetNetwork = useCallback(() => {
    if (model) {
      model.dispose();
    }
    const newModel = initializeModel();
    setNetworkState({
      epochs: 0,
      error: 1,
      weights: [],
      biases: [],
      prediction: 0,
      probabilities: [0.5, 0.5],
      isTraining: false
    });
    return newModel;
  }, [model, initializeModel]);

  // Update network state
  const updateNetworkState = useCallback(async (currentModel: tf.Sequential) => {
    const weights: number[][] = [];
    const biases: number[] = [];

    for (const layer of currentModel.layers) {
      const [w, b] = layer.getWeights();
      weights.push(Array.from(w.dataSync()));
      biases.push(...Array.from(b.dataSync()));
    }

    setNetworkState(prev => ({
      ...prev,
      weights,
      biases
    }));
  }, []);

  // Train network
  const trainNetwork = useCallback(async (
    operation: LogicalOperation,
    onEpochEnd?: (epoch: number, logs: tf.Logs) => void
  ) => {
    if (!model) return;

    const trainingData = generateTrainingData(operation);
    const inputs = tf.tensor2d(trainingData.map(d => [d.input1, d.input2]));
    const outputs = tf.tensor2d(trainingData.map(d => [d.expectedOutput]));

    setNetworkState(prev => ({ ...prev, isTraining: true }));

    await model.fit(inputs, outputs, {
      epochs: 100,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          if (!networkState.isTraining) {
            model.stopTraining = true;
          }
          setNetworkState(prev => ({
            ...prev,
            epochs: epoch + 1,
            error: logs?.loss || prev.error
          }));
          onEpochEnd?.(epoch, logs || {});
          await updateNetworkState(model);
        }
      }
    });

    setNetworkState(prev => ({ ...prev, isTraining: false }));
    inputs.dispose();
    outputs.dispose();
  }, [model, updateNetworkState, networkState.isTraining]);

  // Stop training
  const stopTraining = useCallback(() => {
    setNetworkState(prev => ({ ...prev, isTraining: false }));
  }, []);

  // Predict
  const predict = useCallback(async (input1: number, input2: number) => {
    if (!model) return;

    const prediction = model.predict(tf.tensor2d([[input1, input2]])) as tf.Tensor;
    const probability = prediction.dataSync()[0];
    
    setNetworkState(prev => ({
      ...prev,
      prediction: probability > 0.5 ? 1 : 0,
      probabilities: [1 - probability, probability]
    }));
  }, [model]);

  // Initialize model on mount
  useEffect(() => {
    initializeModel();
  }, [initializeModel]);

  return {
    networkState,
    trainNetwork,
    predict,
    resetNetwork,
    stopTraining
  };
};