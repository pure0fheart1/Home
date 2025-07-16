'use client';

import { useState } from 'react';
import { AIToolLayout } from '@/components/ui/ai-tool-layout';

export default function AIFinancialAdvisor() {
  const [advisoryType, setAdvisoryType] = useState('comprehensive');
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [investmentGoals, setInvestmentGoals] = useState<string[]>([]);
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [timeHorizon, setTimeHorizon] = useState('10years');
  const [currentAssets, setCurrentAssets] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [existingDebts, setExistingDebts] = useState('');
  const [retirementPlanning, setRetirementPlanning] = useState(true);
  const [taxOptimization, setTaxOptimization] = useState(true);
  const [emergencyFund, setEmergencyFund] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const advisoryTypes = [
    { id: 'comprehensive', label: 'Comprehensive Planning', description: 'Full financial assessment and planning' },
    { id: 'investment', label: 'Investment Strategy', description: 'Portfolio optimization and asset allocation' },
    { id: 'retirement', label: 'Retirement Planning', description: 'Long-term retirement savings strategy' },
    { id: 'debt', label: 'Debt Management', description: 'Debt reduction and credit optimization' },
    { id: 'tax', label: 'Tax Planning', description: 'Tax-efficient investment strategies' },
    { id: 'estate', label: 'Estate Planning', description: 'Wealth transfer and legacy planning' }
  ];

  const riskLevels = [
    { id: 'conservative', label: 'Conservative', description: 'Capital preservation focus' },
    { id: 'moderate', label: 'Moderate', description: 'Balanced growth and stability' },
    { id: 'aggressive', label: 'Aggressive', description: 'Maximum growth potential' }
  ];

  const timeHorizons = [
    { id: '1year', label: 'Short-term (1 year)', description: 'Immediate financial goals' },
    { id: '5years', label: 'Medium-term (5 years)', description: 'Near-future objectives' },
    { id: '10years', label: 'Long-term (10 years)', description: 'Major life goals' },
    { id: '20years', label: 'Very Long-term (20+ years)', description: 'Retirement planning' }
  ];

  const goalOptions = [
    'Retirement savings',
    'Home purchase',
    'Children\'s education',
    'Emergency fund',
    'Wealth accumulation',
    'Passive income',
    'Debt elimination',
    'Travel fund'
  ];

  const handleGoalToggle = (goal: string) => {
    setInvestmentGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const selectedAdvisory = advisoryTypes.find(a => a.id === advisoryType);
    const selectedRisk = riskLevels.find(r => r.id === riskTolerance);
    const selectedHorizon = timeHorizons.find(t => t.id === timeHorizon);
    
    const mockResult = `# AI Financial Advisor Report

## Personal Financial Analysis
**Advisory Type**: ${selectedAdvisory?.label} - ${selectedAdvisory?.description}
**Risk Profile**: ${selectedRisk?.label} - ${selectedRisk?.description}
**Time Horizon**: ${selectedHorizon?.label}
**Analysis Date**: ${new Date().toLocaleDateString()}

## Executive Summary

### Financial Health Score: ${Math.floor(Math.random() * 30) + 70}/100

### Key Findings:
- **Net Worth**: $${(parseInt(currentAssets || '50000') - parseInt(existingDebts || '10000')).toLocaleString()}
- **Monthly Cash Flow**: $${(parseInt(income || '5000') - parseInt(monthlyExpenses || '3000')).toLocaleString()}
- **Savings Rate**: ${((parseInt(income || '5000') - parseInt(monthlyExpenses || '3000')) / parseInt(income || '5000') * 100).toFixed(1)}%
- **Emergency Fund Status**: ${emergencyFund ? `${Math.floor(Math.random() * 4) + 2} months expenses covered` : 'Not evaluated'}

## Personalized Financial Plan

### Asset Allocation Recommendation

Based on your ${riskTolerance} risk tolerance and ${timeHorizon} time horizon:

${generateAssetAllocation(riskTolerance, timeHorizon)}

### Investment Portfolio Strategy

${generateInvestmentStrategy(riskTolerance, investmentGoals, parseInt(currentAssets || '50000'))}

### Retirement Planning Analysis

${retirementPlanning ? generateRetirementPlan(age, income, currentAssets) : '• Retirement planning not requested'}

### Tax Optimization Strategies

${taxOptimization ? generateTaxStrategies(income, investmentGoals) : '• Tax optimization not requested'}

### Emergency Fund Recommendations

${emergencyFund ? generateEmergencyFundPlan(monthlyExpenses, currentAssets) : '• Emergency fund planning not requested'}

## Debt Management Strategy

${generateDebtStrategy(existingDebts, income, monthlyExpenses)}

## Action Plan & Timeline

### Immediate Actions (0-3 months):
${generateImmediateActions(investmentGoals, emergencyFund, parseInt(existingDebts || '0'))}

### Short-term Goals (3-12 months):
${generateShortTermGoals(investmentGoals, income)}

### Medium-term Goals (1-5 years):
${generateMediumTermGoals(investmentGoals, timeHorizon)}

### Long-term Goals (5+ years):
${generateLongTermGoals(investmentGoals, retirementPlanning)}

## Risk Management

### Insurance Coverage Review:
${generateInsuranceRecommendations(age, income, investmentGoals)}

### Portfolio Risk Analysis:
- **Maximum Drawdown Tolerance**: ${riskTolerance === 'conservative' ? '10-15%' : riskTolerance === 'moderate' ? '20-30%' : '35-50%'}
- **Volatility Management**: ${generateVolatilityStrategy(riskTolerance)}
- **Diversification Score**: ${Math.floor(Math.random() * 20) + 80}/100
- **Rebalancing Frequency**: ${riskTolerance === 'conservative' ? 'Quarterly' : 'Semi-annually'}

## Investment Recommendations

### Recommended Investment Vehicles:
${generateInvestmentVehicles(riskTolerance, taxOptimization, timeHorizon)}

### Specific Fund/ETF Suggestions:
${generateFundRecommendations(riskTolerance, investmentGoals)}

## Financial Projections

### Wealth Growth Projection:
${generateWealthProjection(currentAssets, income, monthlyExpenses, timeHorizon)}

### Goal Achievement Timeline:
${generateGoalTimeline(investmentGoals, income, monthlyExpenses)}

## Tax Planning Strategies

${taxOptimization ? generateDetailedTaxPlan(income, investmentGoals, currentAssets) : '• Detailed tax planning not included'}

## Estate Planning Considerations

${advisoryType === 'estate' ? generateEstatePlan(currentAssets, age) : generateBasicEstateSuggestions()}

## Monitoring & Review

### Key Performance Indicators:
- **Portfolio Return Target**: ${riskTolerance === 'conservative' ? '4-6%' : riskTolerance === 'moderate' ? '7-10%' : '11-15%'} annually
- **Expense Ratio Target**: Keep total fees below 0.5%
- **Asset Allocation Variance**: Stay within ±5% of target allocation
- **Savings Rate Goal**: Increase by 1% annually

### Review Schedule:
- **Portfolio Review**: ${riskTolerance === 'aggressive' ? 'Monthly' : 'Quarterly'}
- **Financial Plan Update**: Annually
- **Goal Progress Check**: Semi-annually
- **Tax Strategy Review**: Before year-end

## Additional Resources

### Educational Recommendations:
${generateEducationalResources(investmentGoals, riskTolerance)}

### Professional Services:
- **Tax Professional**: ${taxOptimization ? 'Recommended for complex strategies' : 'Consider for annual filing'}
- **Estate Attorney**: ${parseInt(currentAssets || '50000') > 500000 ? 'Highly recommended' : 'Consider for basic will/trust'}
- **Insurance Agent**: Review coverage annually
- **Financial Planner**: Annual comprehensive review

### Disclaimer:
*This AI-generated financial advice is for educational purposes only. Please consult with qualified financial professionals before making investment decisions. Past performance does not guarantee future results.*

*Analysis completed on ${new Date().toLocaleDateString()} based on provided information*
`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const generateAssetAllocation = (risk: string, horizon: string) => {
    const allocations = {
      conservative: {
        stocks: 30,
        bonds: 50,
        realEstate: 10,
        commodities: 5,
        cash: 5
      },
      moderate: {
        stocks: 60,
        bonds: 25,
        realEstate: 10,
        commodities: 3,
        cash: 2
      },
      aggressive: {
        stocks: 80,
        bonds: 10,
        realEstate: 5,
        commodities: 3,
        cash: 2
      }
    };

    const allocation = allocations[risk as keyof typeof allocations] || allocations.moderate;
    
    return `### Recommended Asset Allocation:
- **Stocks**: ${allocation.stocks}%
  - Domestic Large Cap: ${Math.floor(allocation.stocks * 0.5)}%
  - International Developed: ${Math.floor(allocation.stocks * 0.3)}%
  - Emerging Markets: ${Math.floor(allocation.stocks * 0.1)}%
  - Small/Mid Cap: ${Math.floor(allocation.stocks * 0.1)}%
- **Bonds**: ${allocation.bonds}%
  - Government Bonds: ${Math.floor(allocation.bonds * 0.6)}%
  - Corporate Bonds: ${Math.floor(allocation.bonds * 0.3)}%
  - High Yield: ${Math.floor(allocation.bonds * 0.1)}%
- **Real Estate (REITs)**: ${allocation.realEstate}%
- **Commodities**: ${allocation.commodities}%
- **Cash/Money Market**: ${allocation.cash}%`;
  };

  const generateInvestmentStrategy = (risk: string, goals: string[], assets: number) => {
    return `### Core Investment Strategy:

**Investment Philosophy**: ${risk === 'conservative' ? 'Capital preservation with modest growth' : risk === 'moderate' ? 'Balanced approach with steady growth' : 'Growth-focused with higher volatility acceptance'}

**Portfolio Construction**:
- **Core Holdings** (${risk === 'conservative' ? '70%' : risk === 'moderate' ? '60%' : '50%'}): Low-cost index funds
- **Satellite Holdings** (${risk === 'conservative' ? '20%' : risk === 'moderate' ? '30%' : '40%'}): Sector-specific ETFs and active funds
- **Alternative Investments** (${risk === 'conservative' ? '10%' : risk === 'moderate' ? '10%' : '10%'}): REITs, commodities

**Investment Amount Allocation**:
- **Initial Investment**: $${(assets * 0.8).toLocaleString()}
- **Reserve for Opportunities**: $${(assets * 0.2).toLocaleString()}
- **Monthly Contributions**: $${Math.floor(Math.random() * 1000) + 500}

**Dollar-Cost Averaging Plan**:
- Invest ${risk === 'conservative' ? '25%' : '50%'} immediately
- Spread remaining over ${risk === 'conservative' ? '6-12' : '3-6'} months
- Automatic monthly investments thereafter`;
  };

  const generateRetirementPlan = (userAge: string, userIncome: string, assets: string) => {
    const currentAge = parseInt(userAge || '35');
    const retirementAge = 65;
    const yearsToRetirement = retirementAge - currentAge;
    const annualIncome = parseInt(userIncome || '60000') * 12;
    
    return `### Retirement Planning Analysis:

**Retirement Timeline**: ${yearsToRetirement} years until retirement at age ${retirementAge}

**Retirement Income Goal**: $${(annualIncome * 0.8).toLocaleString()} annually (80% of current income)

**Projected Retirement Savings**:
- **Current Retirement Assets**: $${parseInt(assets || '50000').toLocaleString()}
- **Required at Retirement**: $${(annualIncome * 0.8 * 25).toLocaleString()} (25x annual expenses)
- **Projected Value**: $${(parseInt(assets || '50000') * Math.pow(1.07, yearsToRetirement)).toLocaleString()}
- **Savings Gap**: $${Math.max(0, (annualIncome * 0.8 * 25) - (parseInt(assets || '50000') * Math.pow(1.07, yearsToRetirement))).toLocaleString()}

**401(k)/IRA Strategy**:
- **Annual Contribution Target**: $${Math.min(22500, annualIncome * 0.15).toLocaleString()}
- **Employer Match**: Maximize to get full match (typically 3-6%)
- **Roth vs Traditional**: ${currentAge < 40 ? 'Prioritize Roth for tax-free growth' : 'Mix of both for tax flexibility'}
- **Catch-up Contributions**: ${currentAge >= 50 ? 'Eligible for additional $7,500/year' : `Available in ${50 - currentAge} years`}`;
  };

  const generateTaxStrategies = (userIncome: string, goals: string[]) => {
    const annualIncome = parseInt(userIncome || '60000') * 12;
    
    return `### Tax-Efficient Investment Strategies:

**Tax Bracket Optimization**:
- **Current Estimated Tax Bracket**: ${annualIncome < 100000 ? '22%' : annualIncome < 200000 ? '24%' : '32%+'}
- **Tax-Deferred Contributions**: Max out 401(k), IRA, HSA
- **Tax Loss Harvesting**: Implement for taxable accounts
- **Municipal Bonds**: ${annualIncome > 150000 ? 'Consider for tax-free income' : 'Not recommended at current tax bracket'}

**Account Location Strategy**:
- **Tax-Deferred (401k/IRA)**: High-yield bonds, REITs, actively managed funds
- **Tax-Free (Roth)**: High-growth stocks, emerging markets
- **Taxable**: Tax-efficient index funds, municipal bonds

**Annual Tax Savings Opportunities**:
- **401(k) Contribution**: Save ~$${(Math.min(22500, annualIncome * 0.15) * 0.24).toLocaleString()} in taxes
- **HSA Contribution**: Save ~$${(3850 * 0.24).toLocaleString()} (triple tax advantage)
- **Charitable Giving**: Consider donor-advised funds for flexibility`;
  };

  const generateEmergencyFundPlan = (expenses: string, assets: string) => {
    const monthlyExp = parseInt(expenses || '3000');
    const currentAssets = parseInt(assets || '50000');
    const targetEmergency = monthlyExp * 6;
    
    return `### Emergency Fund Analysis:

**Current Status**:
- **Monthly Expenses**: $${monthlyExp.toLocaleString()}
- **Target Emergency Fund**: $${targetEmergency.toLocaleString()} (6 months)
- **Current Emergency Savings**: $${Math.min(currentAssets * 0.2, targetEmergency).toLocaleString()}
- **Funding Gap**: $${Math.max(0, targetEmergency - (currentAssets * 0.2)).toLocaleString()}

**Building Strategy**:
- **Monthly Contribution**: $${Math.floor(targetEmergency / 12)} to reach goal in 1 year
- **Savings Account**: High-yield savings with ${(Math.random() * 2 + 3).toFixed(2)}% APY
- **Accessibility**: Keep in separate account for psychological barrier
- **Alternative Options**: Consider money market funds or short-term bond funds`;
  };

  const generateDebtStrategy = (debt: string, income: string, expenses: string) => {
    const totalDebt = parseInt(debt || '0');
    const monthlyIncome = parseInt(income || '5000');
    const monthlyExpenses = parseInt(expenses || '3000');
    const availableForDebt = monthlyIncome - monthlyExpenses;
    
    if (totalDebt === 0) {
      return `### Debt Management:
**Status**: Debt-free! Focus on wealth building and maintaining good credit.

**Credit Optimization**:
- Maintain credit utilization below 10%
- Keep oldest credit cards active
- Monitor credit score quarterly
- Consider rewards credit cards for cashback`;
    }
    
    return `### Debt Elimination Strategy:

**Debt Overview**:
- **Total Debt**: $${totalDebt.toLocaleString()}
- **Available for Debt Payment**: $${availableForDebt.toLocaleString()}/month
- **Debt-to-Income Ratio**: ${((totalDebt / (monthlyIncome * 12)) * 100).toFixed(1)}%

**Prioritization Method**: Avalanche (highest interest first)
1. Credit Cards: Pay off highest APR first
2. Personal Loans: Next priority
3. Student Loans: Consider income-driven repayment
4. Mortgage: Maintain regular payments

**Acceleration Strategy**:
- **Extra Payment**: $${Math.floor(availableForDebt * 0.5)}/month toward principal
- **Projected Payoff**: ${Math.ceil(totalDebt / (availableForDebt * 0.5))} months
- **Interest Savings**: ~$${(totalDebt * 0.15).toLocaleString()}
- **Refinancing Options**: Consider if rates drop 1%+`;
  };

  const generateImmediateActions = (goals: string[], emergency: boolean, debt: number) => {
    const actions = [];
    
    if (emergency) {
      actions.push('1. Open high-yield savings account for emergency fund');
      actions.push('2. Set up automatic transfer of $500/month to emergency fund');
    }
    
    if (debt > 0) {
      actions.push(`${actions.length + 1}. List all debts by interest rate for avalanche method`);
      actions.push(`${actions.length + 2}. Set up automatic extra payments on highest-rate debt`);
    }
    
    actions.push(`${actions.length + 1}. Review and optimize 401(k) contribution to get full employer match`);
    actions.push(`${actions.length + 2}. Open investment account for taxable investing`);
    actions.push(`${actions.length + 3}. Set up monthly automatic investment plan`);
    
    return actions.join('\n');
  };

  const generateShortTermGoals = (goals: string[], income: string) => {
    return `1. Build emergency fund to 3-6 months expenses
2. Maximize employer 401(k) match (free money!)
3. Pay off high-interest debt (>7% APR)
4. Increase savings rate by 2%
5. Open and fund Roth IRA ($${Math.min(6500, parseInt(income || '5000') * 12 * 0.1).toLocaleString()}/year)`;
  };

  const generateMediumTermGoals = (goals: string[], horizon: string) => {
    const mediumGoals = [];
    
    if (goals.includes('Home purchase')) {
      mediumGoals.push('Save 20% down payment for home purchase');
    }
    if (goals.includes('Children\'s education')) {
      mediumGoals.push('Open and fund 529 education savings plan');
    }
    
    mediumGoals.push('Increase net worth by 50%');
    mediumGoals.push('Diversify income sources (side hustle/investments)');
    mediumGoals.push('Build investment portfolio to $100,000+');
    
    return mediumGoals.map((goal, index) => `${index + 1}. ${goal}`).join('\n');
  };

  const generateLongTermGoals = (goals: string[], retirement: boolean) => {
    const longGoals = [];
    
    if (retirement) {
      longGoals.push('Achieve financial independence by age 55-60');
      longGoals.push('Build retirement portfolio to 25x annual expenses');
    }
    
    if (goals.includes('Wealth accumulation')) {
      longGoals.push('Reach $1 million net worth milestone');
    }
    
    longGoals.push('Create multiple passive income streams');
    longGoals.push('Establish family trust or estate plan');
    longGoals.push('Consider charitable giving strategy');
    
    return longGoals.map((goal, index) => `${index + 1}. ${goal}`).join('\n');
  };

  const generateInsuranceRecommendations = (userAge: string, income: string, goals: string[]) => {
    const age = parseInt(userAge || '35');
    const annualIncome = parseInt(income || '5000') * 12;
    
    return `- **Life Insurance**: ${goals.includes('Children\'s education') ? `Term life for ${10 * annualIncome / 1000}k` : 'Consider if dependents'}
- **Disability Insurance**: Essential - covers 60-70% of income
- **Health Insurance**: High-deductible plan with HSA for tax benefits
- **Umbrella Policy**: ${annualIncome > 150000 ? 'Recommended for asset protection' : 'Consider when net worth > $500k'}
- **Long-term Care**: ${age > 50 ? 'Start researching options' : `Consider in ${50 - age} years`}`;
  };

  const generateVolatilityStrategy = (risk: string) => {
    return risk === 'conservative' 
      ? 'Focus on low-volatility dividend stocks and quality bonds'
      : risk === 'moderate'
      ? 'Balance growth and value, use stop-loss orders on individual stocks'
      : 'Accept short-term volatility for long-term gains, avoid panic selling';
  };

  const generateInvestmentVehicles = (risk: string, tax: boolean, horizon: string) => {
    return `- **Index Funds**: Low-cost S&P 500 and Total Market funds (core holdings)
- **ETFs**: Sector-specific and international exposure
- **Target-Date Funds**: Simple all-in-one solution for retirement accounts
- **Municipal Bonds**: ${tax ? 'Tax-free income for high earners' : 'Not priority at current tax bracket'}
- **REITs**: Real estate exposure without direct ownership
- **I Bonds**: Inflation protection for emergency fund overflow
- **Dividend Aristocrats**: ${risk === 'conservative' ? 'Quality income-producing stocks' : 'Small allocation for stability'}`;
  };

  const generateFundRecommendations = (risk: string, goals: string[]) => {
    const funds = {
      conservative: [
        'Vanguard Wellesley Income (VWINX)',
        'Fidelity Strategic Income (FADMX)',
        'iShares Core Conservative Allocation (AOK)',
        'Schwab Treasury Inflation Protected (SWRSX)'
      ],
      moderate: [
        'Vanguard LifeStrategy Moderate Growth (VSMGX)',
        'Fidelity Balanced (FBALX)',
        'iShares Core Moderate Allocation (AOM)',
        'American Funds American Balanced (ABALX)'
      ],
      aggressive: [
        'Vanguard Growth Index (VIGAX)',
        'Fidelity Blue Chip Growth (FBGRX)',
        'ARK Innovation ETF (ARKK)',
        'Invesco QQQ Trust (QQQ)'
      ]
    };
    
    return (funds[risk as keyof typeof funds] || funds.moderate).map(fund => `- ${fund}`).join('\n');
  };

  const generateWealthProjection = (assets: string, income: string, expenses: string, horizon: string) => {
    const currentAssets = parseInt(assets || '50000');
    const monthlySavings = parseInt(income || '5000') - parseInt(expenses || '3000');
    const years = parseInt(horizon.replace(/\D/g, '')) || 10;
    
    return `**Starting Point**: $${currentAssets.toLocaleString()}
**Monthly Savings**: $${monthlySavings.toLocaleString()}
**Annual Return Assumption**: 7% (historical average)

**Projected Values**:
- Year 1: $${(currentAssets * 1.07 + monthlySavings * 12).toLocaleString()}
- Year 5: $${(currentAssets * Math.pow(1.07, 5) + monthlySavings * 12 * ((Math.pow(1.07, 5) - 1) / 0.07)).toLocaleString()}
- Year 10: $${(currentAssets * Math.pow(1.07, 10) + monthlySavings * 12 * ((Math.pow(1.07, 10) - 1) / 0.07)).toLocaleString()}
- Year 20: $${(currentAssets * Math.pow(1.07, 20) + monthlySavings * 12 * ((Math.pow(1.07, 20) - 1) / 0.07)).toLocaleString()}`;
  };

  const generateGoalTimeline = (goals: string[], income: string, expenses: string) => {
    const monthlySavings = parseInt(income || '5000') - parseInt(expenses || '3000');
    
    return goals.map(goal => {
      const timelines = {
        'Retirement savings': `On track for retirement in ${Math.floor(Math.random() * 10) + 20} years`,
        'Home purchase': `Down payment achievable in ${Math.ceil(100000 / (monthlySavings * 12))} years`,
        'Children\'s education': `529 plan fully funded in ${Math.floor(Math.random() * 10) + 8} years`,
        'Emergency fund': `6-month fund complete in ${Math.ceil(18000 / monthlySavings)} months`,
        'Wealth accumulation': `$1M net worth projected in ${Math.floor(Math.random() * 10) + 15} years`,
        'Passive income': `$1,000/month passive income in ${Math.floor(Math.random() * 5) + 5} years`,
        'Debt elimination': `Debt-free in ${Math.floor(Math.random() * 24) + 12} months`,
        'Travel fund': `Annual travel budget funded in ${Math.floor(Math.random() * 6) + 3} months`
      };
      
      return `- **${goal}**: ${timelines[goal as keyof typeof timelines] || 'Timeline depends on prioritization'}`;
    }).join('\n');
  };

  const generateDetailedTaxPlan = (income: string, goals: string[], assets: string) => {
    return `### Comprehensive Tax Strategy:

**Tax-Advantaged Account Maximization**:
- 401(k): Contribute $22,500 (2024 limit)
- IRA: Contribute $6,500 (consider backdoor Roth if income too high)
- HSA: Contribute $3,850 individual / $7,750 family
- Total Tax Deduction: ~$${((22500 + 6500 + 3850) * 0.24).toLocaleString()}

**Investment Tax Strategies**:
- Hold index funds >1 year for long-term capital gains (15-20% vs ordinary income)
- Tax loss harvest up to $3,000/year against ordinary income
- Avoid wash sale rules (wait 31 days before repurchasing)
- Consider qualified dividends over non-qualified

**Year-End Tax Planning**:
- Bunch charitable deductions in high-income years
- Time capital gains/losses strategically
- Consider Roth conversions in low-income years
- Maximize business expense deductions if self-employed`;
  };

  const generateEstatePlan = (assets: string, userAge: string) => {
    const netWorth = parseInt(assets || '50000');
    
    return `### Estate Planning Recommendations:

**Essential Documents**:
- Last Will and Testament (update every 3-5 years)
- Revocable Living Trust (avoid probate, maintain privacy)
- Financial Power of Attorney (trusted person for financial decisions)
- Healthcare Power of Attorney and Living Will
- HIPAA Authorization

**Asset Protection Strategies**:
- Consider umbrella insurance policy ($${Math.ceil(netWorth / 1000000)}M coverage)
- Properly title assets (joint tenancy, beneficiary designations)
- Review beneficiaries annually on all accounts
- Consider asset protection trust if high net worth

**Legacy Planning**:
- 529 plans for grandchildren education funding
- Charitable remainder trust for tax benefits
- Annual gifting strategy ($17,000/person tax-free)
- Life insurance for estate liquidity`;
  };

  const generateBasicEstateSuggestions = () => {
    return `### Basic Estate Planning Steps:
- Create/update will and beneficiary designations
- Consider term life insurance if dependents
- Organize important documents in secure location
- Discuss wishes with family members`;
  };

  const generateEducationalResources = (goals: string[], risk: string) => {
    return `- **Books**: "The Intelligent Investor", "A Random Walk Down Wall Street"
- **Podcasts**: "The Investors Podcast", "BiggerPockets Money"
- **Courses**: ${risk === 'conservative' ? 'Bond investing basics' : 'Options strategies for income'}
- **Tools**: Personal Capital (tracking), Morningstar (research)
- **Communities**: Bogleheads forum, Reddit personal finance`;
  };

  return (
    <AIToolLayout
      title="AI Financial Advisor"
      description="Personalized financial planning, investment strategies, and wealth management advice"
      category="Specialized"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result}
    >
      <div className="space-y-6">
        {/* Advisory Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Advisory Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {advisoryTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setAdvisoryType(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  advisoryType === type.id
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

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="35"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Monthly Income</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="5000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Assets</label>
            <input
              type="number"
              value={currentAssets}
              onChange={(e) => setCurrentAssets(e.target.value)}
              placeholder="50000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Monthly Expenses</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder="3000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Existing Debts</label>
            <input
              type="number"
              value={existingDebts}
              onChange={(e) => setExistingDebts(e.target.value)}
              placeholder="10000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Investment Goals */}
        <div>
          <label className="block text-sm font-medium mb-3">Investment Goals</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {goalOptions.map((goal) => (
              <label key={goal} className="flex items-center">
                <input
                  type="checkbox"
                  checked={investmentGoals.includes(goal)}
                  onChange={() => handleGoalToggle(goal)}
                  className="mr-2"
                />
                <span className="text-sm">{goal}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Risk Tolerance */}
        <div>
          <label className="block text-sm font-medium mb-3">Risk Tolerance</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {riskLevels.map((level) => (
              <div
                key={level.id}
                onClick={() => setRiskTolerance(level.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  riskTolerance === level.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{level.label}</div>
                <div className="text-sm text-gray-600">{level.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Horizon */}
        <div>
          <label className="block text-sm font-medium mb-3">Investment Time Horizon</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {timeHorizons.map((horizon) => (
              <div
                key={horizon.id}
                onClick={() => setTimeHorizon(horizon.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  timeHorizon === horizon.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{horizon.label}</div>
                <div className="text-xs text-gray-600">{horizon.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Options */}
        <div>
          <label className="block text-sm font-medium mb-3">Planning Options</label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={retirementPlanning}
                onChange={(e) => setRetirementPlanning(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Include retirement planning analysis</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={taxOptimization}
                onChange={(e) => setTaxOptimization(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Tax optimization strategies</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={emergencyFund}
                onChange={(e) => setEmergencyFund(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Emergency fund recommendations</span>
            </label>
          </div>
        </div>
      </div>
    </AIToolLayout>
  );
} 