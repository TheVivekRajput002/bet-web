import React from 'react';

// Static chart data for demonstration
const chartData = [
  ['55', '32', '24', '29', '05', '97', '40'],
  ['29', '75', '06', '73', '70', '38', '51'],
  ['91', '33', '26', '02', '64', '56', '83'],
  ['42', '60', '04', '73', '23', '70', '45'],
];

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const stoppedNumbers = ['6', '8', '9'];

const themes = {
  purple: {
    bg: 'bg-[#1c1224]',
    containerBg: 'bg-[#241a30]',
    panelBg: 'bg-[#3a2a4a]',
    highlight: 'bg-purple-500',
    highlightHover: 'hover:bg-purple-700',
    highlightText: 'text-black',
    primaryText: 'text-gray-100',
    secondaryText: 'text-gray-300',
    accentText: 'text-purple-400',
    borderColor: 'border-[#442255]',
    buttonBorder: 'border-purple-500',
    buttonText: 'text-purple-400',
    buttonHover: 'hover:bg-purple-900/50',
    specialBg: 'bg-purple-500/80',
    footerBg: 'bg-purple-600',
    heartColor: 'text-purple-800',
    dividerColor: 'divide-purple-800/50',
  },
  grey: {
    bg: 'bg-gray-800',
    containerBg: 'bg-gray-900',
    panelBg: 'bg-gray-700',
    highlight: 'bg-gray-500',
    highlightHover: 'hover:bg-gray-600',
    highlightText: 'text-white',
    primaryText: 'text-gray-100',
    secondaryText: 'text-gray-300',
    accentText: 'text-gray-400',
    borderColor: 'border-gray-600',
    buttonBorder: 'border-gray-500',
    buttonText: 'text-gray-400',
    buttonHover: 'hover:bg-gray-600/50',
    specialBg: 'bg-gray-500/80',
    footerBg: 'bg-gray-600',
    heartColor: 'text-gray-900',
    dividerColor: 'divide-gray-700',
  },
  gold: {
    bg: 'bg-[#2a231a]',
    containerBg: 'bg-[#403629]',
    panelBg: 'bg-[#5a4d3a]',
    highlight: 'bg-yellow-500',
    highlightHover: 'hover:bg-yellow-600',
    highlightText: 'text-black',
    primaryText: 'text-yellow-100',
    secondaryText: 'text-yellow-200',
    accentText: 'text-yellow-400',
    borderColor: 'border-yellow-700',
    buttonBorder: 'border-yellow-500',
    buttonText: 'text-yellow-400',
    buttonHover: 'hover:bg-yellow-900/50',
    specialBg: 'bg-yellow-500/80',
    footerBg: 'bg-yellow-600',
    heartColor: 'text-yellow-800',
    dividerColor: 'divide-yellow-700/50',
  }
};

// Icons
const HeartIcon = ({ colorClass }) => (
  <svg
    className={`w-10 h-10 ${colorClass} my-2`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    ></path>
  </svg>
);

// Cards Component - receives props from parent
const Cards = ({
  cardData,
  cardNumber,
  theme = 'grey',
  chartData: customChartData,
  days: customDays,
  stoppedNumbers: customStoppedNumbers
}) => {
  // Validate required props
  if (!cardData) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        Error: cardData prop is required
      </div>
    );
  }

  // Use custom data or fallback to default
  const currentChartData = customChartData || cardData.chartData || chartData;
  const currentDays = customDays || days;
  const currentTheme = themes[theme] || themes.grey;

  // Calculate stopped numbers dynamically from last row of chart data
  const calculateStoppedNumbers = () => {
    const lastRow = currentChartData[currentChartData.length - 1] || [];
    const allNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Get ALL digits present in the last row (not just last digits)
    const presentNumbers = new Set();
    lastRow.forEach(num => {
      // Add each digit of the number to the set
      num.split('').forEach(digit => presentNumbers.add(digit));
    });

    // Find numbers that are not present
    const stoppedNums = allNumbers.filter(num => !presentNumbers.has(num));

    return stoppedNums;
  };

  const currentStoppedNumbers = customStoppedNumbers || calculateStoppedNumbers();

  return (
    <div className={`mb-6 flex items-center justify-center p-1 sm:p-2 font-sans`}>
      <div className="w-full max-w-4xl">
        <div className={`${currentTheme.containerBg} border-2 ${currentTheme.borderColor} rounded-lg overflow-hidden shadow-2xl shadow-black/50`}>
          <header className="flex flex-row">
            {/* Left Panel */}
            <div className={`flex-1 ${currentTheme.panelBg} p-4 sm:p-6`}>
              <div className="flex justify-between items-start">
                <span className={`text-md font-mono ${currentTheme.secondaryText}`}>
                  {cardData.date || 'No Date'}
                </span>
                <span className={`${currentTheme.highlight} ${currentTheme.highlightText} rounded-full px-3 py-1.5 flex items-center justify-center font-bold text-xs`}>
                  {cardNumber || 1}
                </span>
                <div className="flex justify-end">
                  <span className="text-xl font-bold">
                    Jodi {cardData.open?.split('-')[1] || '0'}{cardData.close?.split('-')[1] || '0'}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-wider ${currentTheme.primaryText}`}>
                  {cardData.heading || 'NO HEADING'}
                </h1>
                <p className={`text-base ${currentTheme.secondaryText} mt-2`}>
                  {cardData.days || 'No Days'}
                </p>
                <p className={`text-base ${currentTheme.accentText} font-semibold mt-1`}>
                  {cardData.timeSlot || 'No Time'}
                </p>
              </div>
            </div>

            {/* Right Panel */}
            <div className={`w-[250px] ${currentTheme.highlight} ${currentTheme.highlightText} p-4 sm:p-6 flex flex-col justify-between`}>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div>
                  <p className="text-xl font-bold">Open</p>
                  <p className="text-3xl sm:text-4xl font-bold tracking-tighter leading-none">
                    {cardData.open || '000-0'}
                  </p>
                </div>
                <HeartIcon colorClass={currentTheme.heartColor} />
                <div>
                  <p className="text-xl font-bold">Close</p>
                  <p className="text-3xl sm:text-4xl font-bold tracking-tighter leading-none">
                    {cardData.close || '000-0'}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className={`${currentTheme.panelBg} p-4 sm:p-6 border-t-2 ${currentTheme.borderColor}`}>
            <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-6">
              <button className={`border ${currentTheme.buttonBorder} ${currentTheme.buttonText} py-2 px-4 sm:px-6 rounded-full flex items-center space-x-2 ${currentTheme.buttonHover} transition-colors text-sm sm:text-base`}>
                <EyeIcon />
                <span>Panel Chart</span>
              </button>
              <button className={`border ${currentTheme.buttonBorder} ${currentTheme.buttonText} py-2 px-4 sm:px-6 rounded-full flex items-center space-x-2 ${currentTheme.buttonHover} transition-colors text-sm sm:text-base`}>
                <EyeIcon />
                <span>Jodi Chart</span>
              </button>
            </div>

            <div className={`divide-y ${currentTheme.dividerColor}`}>
              {currentChartData.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-7">
                  {row.map((num, colIndex) => (
                    <div
                      key={colIndex}
                      className={`text-center py-3 text-1xl font-semibold ${currentTheme.primaryText} ${rowIndex === 3 && colIndex === 6
                        ? `${currentTheme.specialBg} ${currentTheme.highlightText} rounded-lg`
                        : ''
                        }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 mt-2">
              {currentDays.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`text-center py-2 text-xl font-bold ${dayIndex === 6
                    ? `${currentTheme.highlight} ${currentTheme.highlightText} rounded-md`
                    : `${currentTheme.accentText}`
                    }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </main>
        </div>

        <footer className={`mt-2 ${currentTheme.footerBg} ${currentTheme.highlightText} p-3 rounded-lg flex items-center justify-between font-bold text-lg`}>
          <span className="ml-2">रुके हुए नंबर्स :-</span>
          <div className="flex space-x-2">
            {currentStoppedNumbers.map(num => (
              <span key={num} className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-md font-bold text-lg">
                {num}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Cards;