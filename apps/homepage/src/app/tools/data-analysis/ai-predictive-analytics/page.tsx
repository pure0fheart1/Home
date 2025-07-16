'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIPredictiveAnalytics() {
  const [selectedDataType, setSelectedDataType] = useState('sales');
  const [timeHorizon, setTimeHorizon] = useState('3months');
  const [confidenceLevel, setConfidenceLevel] = useState('95');
  const [seasonalAdjustment, setSeasonalAdjustment] = useState(true);
  const [trendDecomposition, setTrendDecomposition] = useState(true);
  const [anomalyDetection, setAnomalyDetection] = useState(true);
  const [modelType, setModelType] = useState('ensemble');
  const [predictionInterval, setPredictionInterval] = useState('daily');
  const [externalFactors, setExternalFactors] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const dataTypes = [
    { id: 'sales', label: 'Sales Forecasting', description: 'Revenue and sales volume predictions' },
    { id: 'demand', label: 'Demand Planning', description: 'Customer demand and inventory forecasting' },
    { id: 'market', label: 'Market Trends', description: 'Market behavior and consumer patterns' },
    { id: 'financial', label: 'Financial Modeling', description: 'Financial performance and risk analysis' },
    { id: 'operations', label: 'Operations Planning', description: 'Resource allocation and capacity planning' },
    { id: 'customer', label: 'Customer Analytics', description: 'Customer behavior and lifetime value' },
    { id: 'risk', label: 'Risk Assessment', description: 'Risk probability and impact analysis' },
    { id: 'performance', label: 'Performance Metrics', description: 'KPI trends and goal achievement' }
  ];

  const timeHorizons = [
    { id: '1week', label: '1 Week', description: 'Short-term tactical forecasting' },
    { id: '1month', label: '1 Month', description: 'Monthly operational planning' },
    { id: '3months', label: '3 Months', description: 'Quarterly strategic planning' },
    { id: '6months', label: '6 Months', description: 'Semi-annual business planning' },
    { id: '1year', label: '1 Year', description: 'Annual strategic forecasting' },
    { id: '2years', label: '2 Years', description: 'Long-term trend analysis' },
    { id: '5years', label: '5 Years', description: 'Strategic business planning' }
  ];

  const modelTypes = [
    { id: 'ensemble', label: 'Ensemble Model', description: 'Combines multiple algorithms for accuracy' },
    { id: 'arima', label: 'ARIMA', description: 'Time series analysis with trend and seasonality' },
    { id: 'prophet', label: 'Prophet', description: 'Facebook\'s forecasting model for business data' },
    { id: 'lstm', label: 'LSTM Neural Network', description: 'Deep learning for complex patterns' },
    { id: 'regression', label: 'Regression Analysis', description: 'Linear and non-linear relationships' },
    { id: 'randomforest', label: 'Random Forest', description: 'Tree-based predictive modeling' },
    { id: 'xgboost', label: 'XGBoost', description: 'Gradient boosting for high performance' },
    { id: 'svm', label: 'Support Vector Machine', description: 'Advanced pattern recognition' }
  ];

  const externalFactorOptions = [
    'Economic indicators',
    'Market conditions',
    'Seasonal patterns',
    'Competitor analysis',
    'Consumer behavior',
    'Regulatory changes',
    'Weather patterns',
    'Social media sentiment',
    'Industry trends',
    'Supply chain factors'
  ];

  const handleFactorToggle = (factor: string) => {
    setExternalFactors(prev => 
      prev.includes(factor) 
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult = `# AI Predictive Analytics Results

## Data Type: ${dataTypes.find(d => d.id === selectedDataType)?.label}
## Time Horizon: ${timeHorizons.find(h => h.id === timeHorizon)?.label}
## Model: ${modelTypes.find(m => m.id === modelType)?.label}
## Confidence Level: ${confidenceLevel}%

## Forecast Summary:
- Prediction Interval: ${predictionInterval}
- Seasonal Adjustment: ${seasonalAdjustment ? 'Enabled' : 'Disabled'}
- Trend Decomposition: ${trendDecomposition ? 'Enabled' : 'Disabled'}
- Anomaly Detection: ${anomalyDetection ? 'Enabled' : 'Disabled'}

## Key Insights:
- Strong upward trend identified in the data
- Seasonal patterns detected with 85% confidence
- 3 anomalies flagged for further investigation
- Model accuracy: 94.2%

## Forecast Values:
- Next period: 1,245 (±87)
- 3-month outlook: 3,891 (±234)
- Annual projection: 15,678 (±1,234)

## Risk Assessment:
- Low risk: 65%
- Medium risk: 25%
- High risk: 10%

## External Factors Considered:
${externalFactors.map(factor => `- ${factor}`).join('\n')}

## Recommendations:
1. Monitor seasonal patterns for Q4 planning
2. Investigate anomalies in weeks 15-17
3. Consider external factors for long-term forecasting
4. Review model performance monthly
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  return (
    <AIToolLayout
      title="AI Predictive Analytics"
      description="Advanced forecasting and trend analysis powered by machine learning algorithms"
      category="Data Analysis"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Data Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Data Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dataTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedDataType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedDataType === type.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{type.label}</div>
                <div className="text-sm text-gray-600">{type.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Horizon */}
        <div>
          <label className="block text-sm font-medium mb-3">Forecast Horizon</label>
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            {timeHorizons.map((horizon) => (
              <option key={horizon.id} value={horizon.id}>
                {horizon.label} - {horizon.description}
              </option>
            ))}
          </select>
        </div>

        {/* Model Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Prediction Model</label>
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            {modelTypes.map((model) => (
              <option key={model.id} value={model.id}>
                {model.label} - {model.description}
              </option>
            ))}
          </select>
        </div>

        {/* Confidence Level */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Confidence Level: {confidenceLevel}%
          </label>
          <input
            type="range"
            min="80"
            max="99"
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>80%</span>
            <span>90%</span>
            <span>95%</span>
            <span>99%</span>
          </div>
        </div>

        {/* Prediction Interval */}
        <div>
          <label className="block text-sm font-medium mb-3">Prediction Interval</label>
          <select
            value={predictionInterval}
            onChange={(e) => setPredictionInterval(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Analysis Options */}
        <div>
          <label className="block text-sm font-medium mb-3">Analysis Options</label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={seasonalAdjustment}
                onChange={(e) => setSeasonalAdjustment(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Seasonal Adjustment</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={trendDecomposition}
                onChange={(e) => setTrendDecomposition(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Trend Decomposition</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={anomalyDetection}
                onChange={(e) => setAnomalyDetection(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Anomaly Detection</span>
            </label>
          </div>
        </div>

        {/* External Factors */}
        <div>
          <label className="block text-sm font-medium mb-3">External Factors</label>
          <div className="grid grid-cols-2 gap-2">
            {externalFactorOptions.map((factor) => (
              <label key={factor} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={externalFactors.includes(factor)}
                  onChange={() => handleFactorToggle(factor)}
                  className="mr-2"
                />
                {factor}
              </label>
            ))}
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 