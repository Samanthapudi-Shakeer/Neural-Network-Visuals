import React from 'react';

interface TrainingMetricsProps {
  epochs: number;
  error: number;
  prediction: number;
  probabilities: [number, number];
}

const TrainingMetrics: React.FC<TrainingMetricsProps> = ({
  epochs,
  error,
  prediction,
  probabilities
}) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-red-900 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-red-500">Training Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Epochs:</span>
              <span className="font-medium text-white">{epochs}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Error:</span>
              <span className="font-medium text-white">{error.toFixed(4)}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-red-500">Prediction</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Output:</span>
              <span className="font-medium text-white">{prediction}</span>
            </div>
            <div className="space-y-4 mt-2">
              {[0, 1].map((index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 font-medium">P({index})</span>
                    <span className="text-white font-bold">
                      {(probabilities[index] * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden w-full">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
                      style={{ width: `${probabilities[index] * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingMetrics;
