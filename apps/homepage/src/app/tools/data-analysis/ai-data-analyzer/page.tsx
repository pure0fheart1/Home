'use client';

import React, { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIDataAnalyzerPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    dataSource: 'csv_file',
    analysisType: 'comprehensive',
    statisticalTests: true,
    trendAnalysis: true,
    correlationAnalysis: true,
    outlierDetection: true,
    predictiveModeling: false,
    visualizations: true,
    reportGeneration: true,
    dataQualityCheck: true,
    confidenceLevel: '95',
    sampleSize: 'auto',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const dataAnalyzerConfig = `// AI Data Analyzer: ${formData.analysisType}
// Generated with AI Data Analyzer Builder

class AIDataAnalyzer {
  constructor() {
    this.dataSource = '${formData.dataSource}';
    this.analysisType = '${formData.analysisType}';
    this.statisticalTests = ${formData.statisticalTests};
    this.trendAnalysis = ${formData.trendAnalysis};
    this.correlationAnalysis = ${formData.correlationAnalysis};
    this.outlierDetection = ${formData.outlierDetection};
    this.predictiveModeling = ${formData.predictiveModeling};
    this.visualizations = ${formData.visualizations};
    this.reportGeneration = ${formData.reportGeneration};
    this.dataQualityCheck = ${formData.dataQualityCheck};
    this.confidenceLevel = ${formData.confidenceLevel};
    this.sampleSize = '${formData.sampleSize}';
    this.dataProfile = {};
    this.analysisResults = {};
    this.initialize();
  }

  initialize() {
    console.log('Initializing AI Data Analyzer');
    this.setupAnalysisFramework();
    this.performDataProfiling();
    this.executeAnalysis();
    this.generateInsights();
  }

  setupAnalysisFramework() {
    this.analysisFramework = {
      dataIngestion: this.configureDataIngestion(),
      preprocessing: this.configurePreprocessing(),
      statisticalAnalysis: this.statisticalTests ? this.configureStatisticalAnalysis() : null,
      exploratoryAnalysis: this.configureExploratoryAnalysis(),
      advancedAnalytics: this.configureAdvancedAnalytics(),
      visualization: this.visualizations ? this.configureVisualization() : null,
      reporting: this.reportGeneration ? this.configureReporting() : null
    };
    
    console.log('Analysis framework configured:', this.analysisFramework);
  }

  configureDataIngestion() {
    const sourceConfigurations = {
      csv_file: {
        parser: 'pandas_csv_reader',
        encoding_detection: 'automatic',
        delimiter_detection: 'smart_detection',
        header_inference: 'first_row_analysis',
        data_type_inference: 'intelligent_casting'
      },
      
      excel_file: {
        parser: 'openpyxl_engine',
        sheet_detection: 'all_sheets',
        header_inference: 'multi_sheet_analysis',
        formula_evaluation: 'preserve_calculated_values',
        date_parsing: 'excel_serial_dates'
      },
      
      json_file: {
        parser: 'json_normalizer',
        nested_structure_handling: 'flatten_with_keys',
        array_expansion: 'record_oriented',
        null_handling: 'preserve_structure',
        schema_inference: 'automatic'
      },
      
      database: {
        connection_pooling: 'enabled',
        query_optimization: 'explain_plan_analysis',
        batch_processing: 'chunked_retrieval',
        data_streaming: 'memory_efficient',
        relationship_detection: 'foreign_key_analysis'
      },
      
      api_data: {
        authentication: 'oauth_bearer_basic',
        rate_limiting: 'adaptive_backoff',
        pagination: 'automatic_handling',
        schema_validation: 'json_schema',
        caching: 'intelligent_cache'
      }
    };
    
    return sourceConfigurations[this.dataSource] || sourceConfigurations.csv_file;
  }

  configurePreprocessing() {
    return {
      dataQualityAssessment: this.dataQualityCheck ? {
        completeness_check: 'missing_value_analysis',
        consistency_check: 'data_format_validation',
        accuracy_check: 'range_and_pattern_validation',
        uniqueness_check: 'duplicate_detection',
        timeliness_check: 'timestamp_validation'
      } : null,
      
      dataCleaning: {
        missing_value_handling: 'intelligent_imputation',
        outlier_treatment: this.outlierDetection ? 'statistical_detection' : 'preserve',
        duplicate_removal: 'fuzzy_matching',
        data_normalization: 'distribution_aware',
        encoding_standardization: 'unicode_normalization'
      },
      
      dataTransformation: {
        feature_engineering: 'automated_feature_creation',
        data_scaling: 'robust_scaling',
        categorical_encoding: 'optimal_encoding_selection',
        date_feature_extraction: 'temporal_components',
        text_preprocessing: 'nlp_pipeline'
      },
      
      samplingStrategy: {
        sample_size_calculation: this.sampleSize === 'auto' ? 'power_analysis' : 'user_specified',
        sampling_method: 'stratified_random',
        bias_reduction: 'systematic_sampling',
        validation_split: 'time_aware_split'
      }
    };
  }

  configureStatisticalAnalysis() {
    return {
      descriptiveStatistics: {
        central_tendency: ['mean', 'median', 'mode'],
        dispersion: ['std_dev', 'variance', 'iqr', 'range'],
        distribution_shape: ['skewness', 'kurtosis'],
        percentiles: [5, 10, 25, 50, 75, 90, 95],
        confidence_intervals: this.confidenceLevel + '%'
      },
      
      inferentialStatistics: {
        hypothesis_testing: {
          normality_tests: ['shapiro_wilk', 'kolmogorov_smirnov'],
          parametric_tests: ['t_test', 'anova', 'regression'],
          non_parametric_tests: ['mann_whitney', 'kruskal_wallis', 'chi_square'],
          multiple_comparison_correction: 'bonferroni_holm'
        },
        
        correlation_analysis: this.correlationAnalysis ? {
          pearson_correlation: 'parametric_relationships',
          spearman_correlation: 'monotonic_relationships',
          kendall_tau: 'ordinal_relationships',
          partial_correlation: 'controlling_variables',
          correlation_significance: 'p_value_correction'
        } : null,
        
        regression_analysis: {
          linear_regression: 'ordinary_least_squares',
          multiple_regression: 'stepwise_selection',
          logistic_regression: 'maximum_likelihood',
          polynomial_regression: 'degree_optimization',
          regularized_regression: 'ridge_lasso_elastic'
        }
      },
      
      timeSeriesAnalysis: this.trendAnalysis ? {
        trend_detection: 'mann_kendall_test',
        seasonality_analysis: 'fourier_transform',
        autocorrelation: 'acf_pacf_analysis',
        change_point_detection: 'ruptures_algorithm',
        forecasting: 'arima_exponential_smoothing'
      } : null,
      
      multivariateAnalysis: {
        principal_component_analysis: 'dimensionality_reduction',
        factor_analysis: 'latent_variable_identification',
        cluster_analysis: 'hierarchical_kmeans',
        discriminant_analysis: 'classification_boundaries',
        canonical_correlation: 'multiset_relationships'
      }
    };
  }

  configureExploratoryAnalysis() {
    return {
      univariateAnalysis: {
        distribution_analysis: 'histogram_density_plots',
        summary_statistics: 'comprehensive_summary',
        normality_assessment: 'qq_plots_tests',
        outlier_identification: this.outlierDetection ? 'iqr_zscore_isolation' : null
      },
      
      bivariateAnalysis: {
        scatter_plot_analysis: 'relationship_visualization',
        cross_tabulation: 'categorical_associations',
        correlation_heatmaps: 'correlation_visualization',
        regression_diagnostics: 'residual_analysis'
      },
      
      multivariateAnalysis: {
        correlation_matrix: 'full_correlation_analysis',
        pair_plot_analysis: 'pairwise_relationships',
        parallel_coordinates: 'multivariate_patterns',
        dimensionality_reduction_viz: 'pca_tsne_visualization'
      },
      
      patternRecognition: {
        clustering_analysis: 'unsupervised_grouping',
        association_rules: 'market_basket_analysis',
        sequence_mining: 'temporal_patterns',
        anomaly_detection: 'unsupervised_outliers'
      }
    };
  }

  configureAdvancedAnalytics() {
    return {
      predictiveModeling: this.predictiveModeling ? {
        model_selection: 'automated_ml_pipeline',
        feature_selection: 'recursive_feature_elimination',
        hyperparameter_tuning: 'bayesian_optimization',
        cross_validation: 'stratified_kfold',
        model_evaluation: 'comprehensive_metrics'
      } : null,
      
      machineLearning: this.predictiveModeling ? {
        supervised_learning: ['random_forest', 'gradient_boosting', 'svm'],
        unsupervised_learning: ['kmeans', 'hierarchical', 'dbscan'],
        ensemble_methods: ['voting', 'bagging', 'stacking'],
        deep_learning: ['neural_networks', 'autoencoders'],
        model_interpretation: ['shap', 'lime', 'permutation_importance']
      } : null,
      
      segmentationAnalysis: {
        customer_segmentation: 'behavioral_clustering',
        market_segmentation: 'demographic_psychographic',
        product_segmentation: 'feature_based_grouping',
        geographic_segmentation: 'spatial_clustering'
      },
      
      optimizationAnalysis: {
        linear_programming: 'resource_allocation',
        constraint_optimization: 'business_rule_constraints',
        multi_objective_optimization: 'pareto_frontier',
        simulation_modeling: 'monte_carlo_methods'
      }
    };
  }

  configureVisualization() {
    return {
      descriptiveVisualizations: {
        distribution_plots: ['histograms', 'box_plots', 'violin_plots'],
        summary_charts: ['bar_charts', 'pie_charts', 'donut_charts'],
        comparison_plots: ['grouped_bars', 'stacked_bars', 'area_charts'],
        time_series_plots: ['line_charts', 'candlestick', 'seasonal_decomposition']
      },
      
      analyticalVisualizations: {
        correlation_visualizations: ['heatmaps', 'correlation_networks'],
        regression_plots: ['scatter_with_trend', 'residual_plots'],
        clustering_visualizations: ['cluster_plots', 'dendrogram'],
        dimensionality_reduction: ['pca_plots', 'tsne_plots', 'umap_plots']
      },
      
      interactiveVisualizations: {
        dashboard_components: ['filters', 'drill_down', 'cross_filtering'],
        dynamic_charts: ['zoom', 'pan', 'hover_details'],
        parameter_exploration: ['sliders', 'dropdowns', 'range_selectors'],
        real_time_updates: ['streaming_data', 'auto_refresh']
      },
      
      advancedVisualizations: {
        geospatial_analysis: ['choropleth_maps', 'scatter_maps', 'heatmaps'],
        network_analysis: ['graph_visualizations', 'force_directed_layouts'],
        three_dimensional: ['3d_scatter', 'surface_plots', 'volume_rendering'],
        animated_visualizations: ['time_progression', 'parameter_sweeps']
      }
    };
  }

  configureReporting() {
    return {
      executiveSummary: {
        key_findings: 'bullet_point_highlights',
        business_impact: 'quantified_insights',
        recommendations: 'actionable_suggestions',
        next_steps: 'prioritized_actions'
      },
      
      technicalReport: {
        methodology: 'detailed_approach_description',
        statistical_results: 'comprehensive_test_results',
        model_performance: 'evaluation_metrics',
        assumptions_limitations: 'transparent_documentation'
      },
      
      visualReport: {
        charts_graphs: 'publication_ready_visualizations',
        infographics: 'visual_summary_panels',
        interactive_elements: 'embedded_interactivity',
        responsive_design: 'multi_device_compatibility'
      },
      
      dataDocumentation: {
        data_dictionary: 'variable_descriptions',
        quality_report: 'data_profiling_summary',
        processing_log: 'transformation_history',
        reproducibility: 'code_documentation'
      }
    };
  }

  performDataProfiling() {
    const profiling = {
      dataOverview: this.generateDataOverview(),
      qualityAssessment: this.dataQualityCheck ? this.assessDataQuality() : null,
      distributionAnalysis: this.analyzeDistributions(),
      relationshipAnalysis: this.analyzeRelationships(),
      temporalAnalysis: this.analyzeTemporalPatterns()
    };
    
    this.dataProfile = profiling;
    console.log('Data profiling completed:', profiling);
  }

  generateDataOverview() {
    return {
      dataset_shape: 'rows_columns_count',
      data_types: 'variable_type_distribution',
      memory_usage: 'storage_requirements',
      column_summary: 'variable_descriptions',
      sample_preview: 'first_last_rows'
    };
  }

  assessDataQuality() {
    return {
      completeness: {
        missing_values: 'percentage_by_column',
        missing_patterns: 'missingness_correlation',
        completeness_score: 'overall_data_availability'
      },
      
      consistency: {
        data_format_compliance: 'format_validation_results',
        value_consistency: 'cross_column_validation',
        referential_integrity: 'relationship_validation'
      },
      
      accuracy: {
        range_validation: 'value_range_compliance',
        pattern_validation: 'regex_format_compliance',
        business_rule_validation: 'domain_specific_rules'
      },
      
      uniqueness: {
        duplicate_records: 'exact_duplicate_count',
        near_duplicates: 'fuzzy_duplicate_detection',
        key_uniqueness: 'primary_key_validation'
      }
    };
  }

  analyzeDistributions() {
    return {
      numerical_variables: {
        distribution_type: 'normality_assessment',
        central_tendency: 'mean_median_mode',
        variability: 'std_variance_cv',
        shape_characteristics: 'skewness_kurtosis',
        outlier_presence: this.outlierDetection ? 'statistical_outliers' : null
      },
      
      categorical_variables: {
        frequency_distribution: 'value_counts',
        cardinality: 'unique_value_count',
        mode_analysis: 'most_frequent_values',
        balance_assessment: 'class_distribution'
      },
      
      temporal_variables: {
        date_range: 'min_max_dates',
        frequency_pattern: 'temporal_granularity',
        seasonal_patterns: 'periodic_components',
        trend_analysis: this.trendAnalysis ? 'temporal_trends' : null
      }
    };
  }

  analyzeRelationships() {
    return {
      correlation_analysis: this.correlationAnalysis ? {
        linear_correlations: 'pearson_correlation_matrix',
        monotonic_correlations: 'spearman_correlation_matrix',
        categorical_associations: 'cramers_v_matrix',
        mixed_type_associations: 'correlation_ratio'
      } : null,
      
      dependency_analysis: {
        functional_dependencies: 'deterministic_relationships',
        statistical_dependencies: 'mutual_information',
        causal_inference: 'correlation_vs_causation',
        interaction_effects: 'variable_interactions'
      },
      
      clustering_tendencies: {
        cluster_validation: 'hopkins_statistic',
        optimal_clusters: 'elbow_silhouette_analysis',
        cluster_characteristics: 'cluster_profiling'
      }
    };
  }

  analyzeTemporalPatterns() {
    if (!this.trendAnalysis) return null;
    
    return {
      trend_analysis: {
        linear_trends: 'regression_trend_lines',
        non_linear_trends: 'polynomial_smoothing',
        change_points: 'structural_break_detection',
        trend_significance: 'statistical_significance'
      },
      
      seasonality_analysis: {
        seasonal_decomposition: 'trend_seasonal_residual',
        periodic_patterns: 'fourier_analysis',
        seasonal_strength: 'seasonal_index_calculation',
        calendar_effects: 'day_month_year_effects'
      },
      
      cyclical_analysis: {
        business_cycles: 'long_term_patterns',
        autocorrelation: 'lag_correlation_analysis',
        spectral_analysis: 'frequency_domain_analysis',
        regime_changes: 'hidden_markov_models'
      }
    };
  }

  executeAnalysis() {
    const execution = {
      preprocessing: this.executePreprocessing(),
      statistical_analysis: this.statisticalTests ? this.executeStatisticalAnalysis() : null,
      exploratory_analysis: this.executeExploratoryAnalysis(),
      advanced_analysis: this.executeAdvancedAnalysis(),
      visualization_generation: this.visualizations ? this.generateVisualizations() : null
    };
    
    this.analysisResults = execution;
    console.log('Analysis execution completed');
  }

  executePreprocessing() {
    return {
      data_cleaning_applied: true,
      missing_value_treatment: 'imputation_strategy_applied',
      outlier_treatment: this.outlierDetection ? 'outlier_handling_applied' : 'preserved',
      feature_engineering: 'automated_features_created',
      data_transformation: 'scaling_encoding_applied'
    };
  }

  executeStatisticalAnalysis() {
    return {
      descriptive_statistics: 'comprehensive_summary_generated',
      hypothesis_testing: 'significance_tests_performed',
      correlation_analysis: this.correlationAnalysis ? 'correlation_matrix_computed' : null,
      regression_analysis: 'regression_models_fitted',
      time_series_analysis: this.trendAnalysis ? 'temporal_analysis_completed' : null
    };
  }

  executeExploratoryAnalysis() {
    return {
      univariate_analysis: 'individual_variable_profiling',
      bivariate_analysis: 'pairwise_relationship_analysis',
      multivariate_analysis: 'complex_relationship_detection',
      pattern_recognition: 'unsupervised_pattern_identification'
    };
  }

  executeAdvancedAnalysis() {
    return {
      predictive_modeling: this.predictiveModeling ? 'ml_models_trained_evaluated' : null,
      segmentation_analysis: 'clustering_segmentation_performed',
      optimization_analysis: 'optimization_problems_solved',
      simulation_analysis: 'monte_carlo_simulations_run'
    };
  }

  generateVisualizations() {
    return {
      descriptive_charts: 'distribution_summary_charts_created',
      analytical_plots: 'correlation_regression_plots_generated',
      interactive_dashboards: 'dynamic_visualization_components',
      advanced_visualizations: 'specialized_domain_charts'
    };
  }

  generateInsights() {
    const insights = {
      key_findings: this.extractKeyFindings(),
      business_implications: this.analyzeBusinessImplications(),
      recommendations: this.generateRecommendations(),
      confidence_assessment: this.assessConfidence(),
      limitations: this.identifyLimitations()
    };
    
    this.insights = insights;
    console.log('Insights generated:', insights);
  }

  extractKeyFindings() {
    return {
      statistical_significance: 'significant_relationships_identified',
      effect_sizes: 'practical_significance_assessed',
      pattern_discoveries: 'novel_patterns_uncovered',
      anomaly_detection: this.outlierDetection ? 'unusual_observations_flagged' : null,
      trend_identification: this.trendAnalysis ? 'temporal_trends_discovered' : null
    };
  }

  analyzeBusinessImplications() {
    return {
      revenue_impact: 'financial_implications_quantified',
      operational_efficiency: 'process_improvement_opportunities',
      risk_assessment: 'potential_risks_identified',
      growth_opportunities: 'expansion_possibilities_highlighted',
      competitive_advantages: 'unique_insights_for_advantage'
    };
  }

  generateRecommendations() {
    return {
      immediate_actions: 'short_term_actionable_steps',
      strategic_initiatives: 'long_term_strategic_recommendations',
      resource_allocation: 'optimal_resource_deployment',
      monitoring_metrics: 'kpi_recommendations',
      follow_up_analysis: 'suggested_deeper_investigations'
    };
  }

  assessConfidence() {
    return {
      statistical_confidence: this.confidenceLevel + '%_confidence_intervals',
      sample_representativeness: 'sampling_bias_assessment',
      model_reliability: this.predictiveModeling ? 'model_validation_scores' : null,
      assumption_validity: 'statistical_assumption_checks',
      uncertainty_quantification: 'confidence_interval_reporting'
    };
  }

  identifyLimitations() {
    return {
      data_limitations: 'data_quality_constraints',
      methodological_limitations: 'analytical_approach_constraints',
      generalizability: 'external_validity_assessment',
      temporal_constraints: 'time_period_limitations',
      causal_inference: 'correlation_causation_disclaimers'
    };
  }

  // Export and reporting methods
  generateExecutiveReport() {
    return {
      executive_summary: this.insights.key_findings,
      business_impact: this.insights.business_implications,
      recommendations: this.insights.recommendations,
      confidence_level: this.insights.confidence_assessment,
      next_steps: 'prioritized_action_plan'
    };
  }

  generateTechnicalReport() {
    return {
      data_profile: this.dataProfile,
      analysis_methodology: this.analysisFramework,
      statistical_results: this.analysisResults,
      detailed_findings: this.insights,
      appendices: 'technical_details_and_code'
    };
  }

  exportResults() {
    return {
      executive_report: this.generateExecutiveReport(),
      technical_report: this.generateTechnicalReport(),
      visualizations: this.visualizations ? 'chart_gallery' : null,
      data_exports: 'processed_datasets',
      code_notebooks: 'reproducible_analysis_code'
    };
  }

  calculateProcessingMetrics() {
    return {
      analysis_complexity: this.assessAnalysisComplexity(),
      processing_time_estimate: this.estimateProcessingTime(),
      resource_requirements: this.estimateResourceNeeds(),
      confidence_in_results: this.calculateOverallConfidence()
    };
  }

  assessAnalysisComplexity() {
    let complexity = 1.0;
    
    if (this.statisticalTests) complexity += 0.3;
    if (this.correlationAnalysis) complexity += 0.2;
    if (this.trendAnalysis) complexity += 0.3;
    if (this.predictiveModeling) complexity += 0.5;
    if (this.outlierDetection) complexity += 0.2;
    
    return complexity > 2.0 ? 'high' : complexity > 1.5 ? 'medium' : 'low';
  }

  estimateProcessingTime() {
    const baseTime = 30; // seconds
    let multiplier = 1.0;
    
    if (this.statisticalTests) multiplier += 0.5;
    if (this.predictiveModeling) multiplier += 1.0;
    if (this.visualizations) multiplier += 0.3;
    if (this.dataQualityCheck) multiplier += 0.2;
    
    return Math.ceil(baseTime * multiplier) + ' seconds for typical dataset';
  }

  estimateResourceNeeds() {
    return {
      memory_usage: 'dataset_size_dependent',
      cpu_requirements: 'analysis_complexity_based',
      storage_needs: 'output_format_dependent',
      network_usage: this.dataSource.includes('api') ? 'api_data_transfer' : 'minimal'
    };
  }

  calculateOverallConfidence() {
    const factors = {
      data_quality: this.dataQualityCheck ? 0.9 : 0.7,
      sample_size: this.sampleSize === 'auto' ? 0.9 : 0.8,
      methodology: this.statisticalTests ? 0.9 : 0.8,
      validation: this.predictiveModeling ? 0.85 : 0.8
    };
    
    const overall = Object.values(factors).reduce((a, b) => a * b, 1);
    return Math.round(overall * 100) + '%';
  }
}

// Initialize AI Data Analyzer
const dataAnalyzer = new AIDataAnalyzer();

// Export configuration
export default dataAnalyzer;`;

      setResult(dataAnalyzerConfig);
      setIsGenerating(false);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AIToolLayout
      title="AI Data Analyzer"
      description="Comprehensive data analysis with AI-powered insights, statistical testing, pattern recognition, and automated reporting for data-driven decision making."
      category="Data Analysis"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Analysis Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
              <select
                value={formData.dataSource}
                onChange={(e) => handleInputChange('dataSource', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="csv_file">CSV File</option>
                <option value="excel_file">Excel File</option>
                <option value="json_file">JSON File</option>
                <option value="database">Database</option>
                <option value="api_data">API Data</option>
                <option value="web_scraping">Web Scraping</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Type</label>
              <select
                value={formData.analysisType}
                onChange={(e) => handleInputChange('analysisType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="comprehensive">Comprehensive Analysis</option>
                <option value="exploratory">Exploratory Data Analysis</option>
                <option value="statistical">Statistical Analysis</option>
                <option value="predictive">Predictive Analysis</option>
                <option value="descriptive">Descriptive Analysis</option>
                <option value="diagnostic">Diagnostic Analysis</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confidence Level</label>
              <select
                value={formData.confidenceLevel}
                onChange={(e) => handleInputChange('confidenceLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="90">90%</option>
                <option value="95">95% (Recommended)</option>
                <option value="99">99%</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sample Size</label>
              <select
                value={formData.sampleSize}
                onChange={(e) => handleInputChange('sampleSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="auto">Auto Calculate</option>
                <option value="1000">1,000 records</option>
                <option value="5000">5,000 records</option>
                <option value="10000">10,000 records</option>
                <option value="all">Use All Data</option>
              </select>
            </div>
          </div>
        </div>

        {/* Analysis Features */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="statisticalTests"
                checked={formData.statisticalTests}
                onChange={(e) => handleInputChange('statisticalTests', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="statisticalTests" className="ml-2 block text-sm text-gray-900">
                Statistical Tests & Hypothesis Testing
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="trendAnalysis"
                checked={formData.trendAnalysis}
                onChange={(e) => handleInputChange('trendAnalysis', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="trendAnalysis" className="ml-2 block text-sm text-gray-900">
                Trend & Time Series Analysis
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="correlationAnalysis"
                checked={formData.correlationAnalysis}
                onChange={(e) => handleInputChange('correlationAnalysis', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="correlationAnalysis" className="ml-2 block text-sm text-gray-900">
                Correlation & Relationship Analysis
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="outlierDetection"
                checked={formData.outlierDetection}
                onChange={(e) => handleInputChange('outlierDetection', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="outlierDetection" className="ml-2 block text-sm text-gray-900">
                Outlier Detection & Anomaly Analysis
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="predictiveModeling"
                checked={formData.predictiveModeling}
                onChange={(e) => handleInputChange('predictiveModeling', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="predictiveModeling" className="ml-2 block text-sm text-gray-900">
                Predictive Modeling & Machine Learning
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="dataQualityCheck"
                checked={formData.dataQualityCheck}
                onChange={(e) => handleInputChange('dataQualityCheck', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="dataQualityCheck" className="ml-2 block text-sm text-gray-900">
                Data Quality Assessment
              </label>
            </div>
          </div>
        </div>

        {/* Output Options */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Output Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="visualizations"
                checked={formData.visualizations}
                onChange={(e) => handleInputChange('visualizations', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="visualizations" className="ml-2 block text-sm text-gray-900">
                Generate Visualizations & Charts
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="reportGeneration"
                checked={formData.reportGeneration}
                onChange={(e) => handleInputChange('reportGeneration', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="reportGeneration" className="ml-2 block text-sm text-gray-900">
                Generate Comprehensive Reports
              </label>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Automated data profiling and quality assessment",
              "Advanced statistical analysis and hypothesis testing",
              "Machine learning and predictive modeling",
              "Time series and trend analysis",
              "Correlation and relationship discovery",
              "Outlier detection and anomaly analysis",
              "Interactive visualizations and dashboards",
              "Executive and technical report generation",
              "Multi-format data source support",
              "Confidence intervals and uncertainty quantification"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 