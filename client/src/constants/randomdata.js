const fs = require('fs');
const { Parser } = require('json2csv');
const faker = require('faker');
const Chance = require('chance');
const randomWords = require('random-words');
const randomUseragent = require('random-useragent');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid'); // For unique IDs
const randomDate = require('random-date'); // For generating random dates

// Initialize Chance
const chance = new Chance();

// Function to generate random data
const generateRandomData = (numRecords, selectedFields) => {
    const records = [];
    for (let i = 0; i < numRecords; i++) {
        const record = {
            id: uuidv4(), // Unique ID
            name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
            postalCode: faker.address.zipCode(),
            job: faker.name.jobTitle(),
            username: faker.internet.userName(),
            dateOfBirth: chance.birthday({ string: true }),
            company: chance.company(),
            product: randomWords({ exactly: 2, join: ' ' }),
            color: chance.color({ format: 'hex' }),
            quote: chance.sentence(),
            website: chance.url(),
            userAgent: randomUseragent.getRandom(),
            registrationDate: moment().subtract(chance.integer({ min: 0, max: 365 }), 'days').format('YYYY-MM-DD'),
            isActive: chance.bool(),
            description: chance.paragraph(),
            lastLogin: randomDate(new Date(2020, 0, 1), new Date()),
            favoriteColor: chance.color(),
            title: chance.title(),
            hobbies: chance.pickset(['Reading', 'Traveling', 'Cooking', 'Sports', 'Gaming', 'Music'], 3).join(', '),
            favoriteNumber: chance.integer({ min: 1, max: 100 }),
            bio: chance.paragraph(),
            interests: chance.pickset(['Technology', 'Art', 'Sports', 'Music', 'Traveling', 'Food'], 3).join(', '),
            skills: chance.pickset(['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Data Analysis'], 3).join(', '),
            subscriptionStatus: chance.pickone(['Active', 'Inactive', 'Pending', 'Cancelled']),
        };

        // Exclude fields based on selected fields
        Object.keys(record).forEach((field) => {
            if (!selectedFields[field]) {
                delete record[field];
            }
        });

        records.push(record);

        // Log progress every 10 records
        if ((i + 1) % 10 === 0) {
            console.log(`Generating record ${i + 1} of ${numRecords}...`);
        }
    }
    return records;
};

// Specify the number of records and output file name from command line arguments
const numRecords = process.argv[2] ? parseInt(process.argv[2]) : 100; // Default to 100
const outputFileName = process.argv[3] || 'random_data.csv'; // Default to 'random_data.csv'
const outputFormat = process.argv[4] ? process.argv[4].toLowerCase() : 'csv'; // Default to 'csv'

// Read the selected fields from command line arguments
const selectedFields = process.argv[5] ? JSON.parse(process.argv[5]) : {};

// Generate random data
const data = generateRandomData(numRecords, selectedFields);

// Convert to CSV or JSON based on the output format
let outputData;
if (outputFormat === 'json') {
    outputData = JSON.stringify(data, null, 2); // Pretty print JSON
} else {
    const json2csvParser = new Parser();
    outputData = json2csvParser.parse(data);
}

// Write to a file with error handling
try {
    fs.writeFileSync(outputFileName, outputData);
    console.log(`Data generated and saved to: ${outputFileName}`);
    console.log(`Format: ${outputFormat.toUpperCase()}`);
} catch (error) {
    console.error('Error writing to file:', error);
}

// Preview the first 5 records in console
console.log('Preview of generated records:');
console.log(data.slice(0, 5));







const handleGenerateData = async () => {
    const fieldsToExclude = Object.keys(selectedFields).filter((field) => !selectedFields[field]);
    
    // Assuming you're using an API endpoint to generate data
    await fetch('/api/generate-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numRecords: 100, // or any other value based on your needs
            selectedFields: selectedFields,
        }),
    });
    
    console.log('Data generation triggered with fields:', fieldsToExclude);
};
