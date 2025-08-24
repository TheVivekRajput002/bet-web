import React from 'react';
import Cards from './Cards'
import Hero from '../Components/Hero';

// Card data configuration - JSON structure
const cardsData = [
    {
        id: 1,
        date: '27/07/25',
        heading: 'BETTING DAY',
        days: 'Mon - Sun',
        timeSlot: 'Time:- 8:00 AM / 9:00 AM',
        open: '789-4',
        close: '159-5',
        theme: 'purple',
        chartData: [
            ['55', '32', '24', '29', '05', '97', '40'],
            ['29', '75', '06', '73', '70', '38', '51'],
            ['91', '33', '26', '02', '64', '56', '83'],
            ['42', '10', '14', '73', '23', '70', '45']
        ]
    },
    {
        id: 2,
        date: '28/07/25',
        heading: 'LUCKY DAY',
        days: 'Mon - Fri',
        timeSlot: 'Time:- 10:00 AM / 11:00 AM',
        open: '456-2',
        close: '789-8',
        theme: 'gold',
        chartData: [
            ['12', '85', '37', '64', '91', '28', '55'],
            ['73', '46', '19', '82', '05', '67', '34'],
            ['98', '21', '74', '36', '58', '03', '76'],
            ['45', '67', '89', '12', '34', '56', '78']
        ]
    },
    {
        id: 3,
        date: '29/07/25',
        heading: 'MEGA DAY',
        days: 'Wed - Sun',
        timeSlot: 'Time:- 2:00 PM / 3:00 PM',
        open: '123-7',
        close: '456-3',
        theme: 'grey',
        chartData: [
            ['12', '75', '87', '74', '91', '28', '58'],
            ['83', '76', '13', '72', '85', '67', '32'],
            ['68', '23', '74', '39', '78', '56', '86'],
            ['45', '67', '09', '12', '24', '56', '98']
        ]
    },
    {
        id: 4,
        date: '30/07/25',
        heading: 'SUPER DAY',
        days: 'Sat - Sun',
        timeSlot: 'Time:- 6:00 PM / 7:00 PM',
        open: '890-1',
        close: '234-6',
        theme: 'purple',
        chartData: [
            ['32', '75', '87', '78', '91', '28', '38'],
            ['83', '70', '93', '92', '86', '87', '32'],
            ['12', '25', '74', '56', '78', '78', '86'],
            ['34', '89', '89', '45', '89', '98', '78']
        ]
    },
    {
        id: 5,
        date: '31/07/25',
        heading: 'PREMIUM DAY',
        days: 'Thu - Sun',
        timeSlot: 'Time:- 4:00 PM / 5:00 PM',
        open: '567-9',
        close: '890-2',
        theme: 'gold',
        chartData: [
            ['12', '65', '77', '90', '23', '98', '79'],
            ['09', '89', '33', '92', '96', '87', '92'],
            ['12', '25', '74', '56', '78', '78', '86'],
            ['89', '59', '79', '22', '89', '90', '12']
        ]

    }
];

// Home Component - manages the data and passes props to Cards
const Home = () => {
    // Function to validate card data
    const validateCardData = (cardData) => {
        const requiredFields = ['id', 'date', 'heading', 'days', 'timeSlot', 'open', 'close', 'theme'];
        const missingFields = requiredFields.filter(field => !cardData[field]);

        if (missingFields.length > 0) {
            console.warn(`Card ${cardData.id || 'Unknown'} is missing fields:`, missingFields);
            return false;
        }
        return true;
    };

    // Filter out invalid cards
    const validCards = cardsData.filter(validateCardData);

    // Log props being passed for debugging
    console.log('Cards Data being passed:', validCards);

    return (
        <div className="min-h-screen bg-[#1c1224] py-8 px-10">

            {/* hero section  */}

            <div className='m-5'>
                <Hero />
            </div>

            {/* Cards Section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gp-6 ">
                {validCards.length > 0 ? (
                    validCards.map((cardData, index) => {
                        // Log each card's props for debugging
                        console.log(`Rendering Card #${cardData.id}:`, {
                            cardData,
                            cardNumber: cardData.id,
                            theme: cardData.theme
                        });

                        return (
                            <Cards
                                key={cardData.id}
                                cardData={cardData}
                                cardNumber={cardData.id}
                                theme={cardData.theme}
                                chartData={cardData.chartData} 
                            />
                        );
                    })
                ) : (
                    <div className="text-center text-red-400 p-8 bg-red-900/20 rounded-lg border border-red-800">
                        <h3 className="text-xl font-bold mb-2">No Valid Cards Found</h3>
                        <p>Please check your card data configuration.</p>
                    </div>
                )}
            </div>


            {/* Debug Information */}
            <div className="mt-12 text-center text-gray-500 text-sm">
                <details className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <summary className="cursor-pointer font-semibold">Debug Information</summary>
                    <div className="mt-4 text-left">
                        <h4 className="font-bold mb-2">Props Validation:</h4>
                        <ul className="space-y-1">
                            {cardsData.map(card => (
                                <li key={card.id}>
                                    Card {card.id}: {validateCardData(card) ? '✅ Valid' : '❌ Invalid'}
                                </li>
                            ))}
                        </ul>
                        <h4 className="font-bold mt-4 mb-2">Required Props for Cards Component:</h4>
                        <ul className="text-gray-400 space-y-1 text-xs">
                            <li>• cardData (object) - Required</li>
                            <li>• cardNumber (number) - Optional, defaults to 1</li>
                            <li>• theme (string) - Optional, defaults to 'grey'</li>
                            <li>• chartData (array) - Optional, uses default chart data</li>
                            <li>• days (array) - Optional, uses default days</li>
                            <li>• stoppedNumbers (array) - Optional, uses default numbers</li>
                        </ul>
                    </div>
                </details>
            </div>
        </div>
    );
};

export default Home;