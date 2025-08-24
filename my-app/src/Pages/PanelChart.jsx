import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const PanelChart = () => {
    const { cardId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Get data from router state
    const { chartData, cardData } = location.state || {};
    const startDate = cardData?.date || '21/01/25';

    // Validate props - now from router state
    if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
        return (
            <div className="p-6 bg-black text-white font-mono">
                <div className="text-red-500 p-4 border border-red-300 rounded">
                    <h3 className="text-lg font-bold mb-2">No Chart Data Available</h3>
                    <p>Card ID: {cardId}</p>
                    <p>Please navigate from a valid card to view panel chart.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // Helper function to format date as DD/MM/YY
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

    // Helper function to add days to a date
    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    // Parse start date from DD/MM/YY format
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));
    };

    // Convert chartData numbers to lottery format (main number + small numbers)
    const convertToLotteryFormat = (numberStr) => {
        // Remove any non-digit characters and ensure it's a string
        const cleanNum = numberStr.toString().replace(/[^0-9]/g, '');

        if (cleanNum.length >= 2) {
            // Take first 2 digits as main number
            const mainNumber = cleanNum.slice(0, 2);

            // Generate small numbers from remaining digits or use the main number digits
            const smallNumbers = [];
            const seedDigits = cleanNum.length > 2 ? cleanNum.slice(2) : mainNumber;

            // Create 6 small numbers (0-9) based on the number
            for (let i = 0; i < 6; i++) {
                const digitIndex = i % seedDigits.length;
                const baseDigit = parseInt(seedDigits[digitIndex] || '0');
                const smallNum = (baseDigit + i) % 10;
                smallNumbers.push(smallNum);
            }

            return { mainNumber, smallNumbers };
        } else {
            // Handle single digit or empty
            const mainNumber = cleanNum.padStart(2, '0');
            const smallNumbers = [0, 1, 2, 3, 4, 5]; // Default small numbers
            return { mainNumber, smallNumbers };
        }
    };

    // Generate table data based on chartData
    const generateTableData = () => {
        const startDateObj = parseDate(startDate);
        const rows = [];
        let currentDate = new Date(startDateObj);
        let dataIndex = 0;

        // Calculate how many rows we need based on chartData
        const totalNumbers = chartData.flat().length;
        const weeksNeeded = Math.ceil(totalNumbers / 7);

        for (let week = 0; week < weeksNeeded; week++) {
            const weekData = [];
            const weekStartDate = new Date(currentDate);

            // Generate 7 days for the week
            for (let day = 0; day < 7; day++) {
                const rowIndex = Math.floor(dataIndex / 7);
                const colIndex = dataIndex % 7;

                if (rowIndex < chartData.length && colIndex < chartData[rowIndex].length) {
                    const numberData = convertToLotteryFormat(chartData[rowIndex][colIndex]);
                    weekData.push({
                        date: new Date(currentDate),
                        dayOfWeek: currentDate.getDay(),
                        ...numberData,
                        originalNumber: chartData[rowIndex][colIndex]
                    });
                    dataIndex++;
                } else {
                    weekData.push(null);
                }

                currentDate = addDays(currentDate, 1);
            }

            // Only add row if it has at least one day
            if (weekData.some(day => day !== null)) {
                const endDate = weekData.filter(day => day !== null).pop()?.date || weekStartDate;
                rows.push({
                    startDate: formatDate(weekStartDate),
                    endDate: formatDate(endDate),
                    weekData: weekData,
                    weekNumber: week + 1
                });
            }
        }

        return rows;
    };

    const tableData = generateTableData();
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="p-6 bg-black text-white font-mono">
            <div className="mb-4 text-center">
                <h2 className="text-xl font-bold text-green-400">Panel Chart - {cardData?.heading || 'Card'}</h2>
                <p className="text-sm text-gray-400">
                    {cardData?.date} | {cardData?.timeSlot} | Open: {cardData?.open} | Close: {cardData?.close}
                </p>
                <p className="text-sm text-gray-400">Data from chartData ({chartData.length} rows × {chartData[0]?.length || 0} columns)</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                    ← Back to Cards
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b-2 border-green-500">
                            <th className="border border-green-500 p-4 bg-gray-800 text-center">Date</th>
                            {dayNames.map((day) => (
                                <th key={day} className="border border-green-500 p-4 bg-gray-800 text-center">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                <tr>
                                    <td className="border border-green-500 p-4 bg-gray-900 text-center relative h-24">
                                        <div className="text-sm">{row.startDate}</div>
                                        <div className="text-sm">{row.endDate}</div>
                                        <div className="absolute top-1 left-1 bg-purple-600 text-white text-xs px-1 rounded">
                                            {row.weekNumber}
                                        </div>
                                    </td>
                                    {dayNames.map((dayName, dayIndex) => {
                                        const mondayIndex = 1; // Monday is index 1 in JavaScript Date
                                        const actualDayIndex = (dayIndex + mondayIndex) % 7;
                                        const matchingDay = row.weekData.find(day =>
                                            day && day.dayOfWeek === actualDayIndex
                                        );

                                        return (
                                            <td key={dayIndex} className="border border-green-500 p-4 bg-gray-900 relative h-24">
                                                {matchingDay ? (
                                                    <div className="flex items-center justify-center h-full">
                                                        <div className="flex flex-col text-xs text-red-400 mr-1">
                                                            {matchingDay.smallNumbers.slice(0, 3).map((num, i) => (
                                                                <span key={i} className="leading-tight">{num}</span>
                                                            ))}
                                                        </div>
                                                        <div className="text-2xl font-bold text-white mx-2" title={`Original: ${matchingDay.originalNumber}`}>
                                                            {matchingDay.mainNumber}
                                                        </div>
                                                        <div className="flex flex-col text-xs text-red-400 ml-1">
                                                            {matchingDay.smallNumbers.slice(3, 6).map((num, i) => (
                                                                <span key={i} className="leading-tight">{num}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex items-center justify-center text-gray-600">
                                                        <span className="text-xs">-</span>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 text-xs text-gray-400">
                <p>• Large numbers are derived from first 2 digits of chartData</p>
                <p>• Small side numbers are calculated from remaining digits</p>
                <p>• Hover over large numbers to see original chartData values</p>
            </div>
        </div>
    );
};

export default PanelChart;