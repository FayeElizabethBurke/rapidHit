var fs = require('fs'), // Requests a reference to the Node.js file system. 
    CronJob = require('cron').CronJob, // Requests a reference to the Cron module.
    TestCafe = require('testcafe').TestCafe; // Requests a reference to the TestCafe module.

var CONFIG_FILE_NAME = 'config.json',
    LOG_FILE_NAME = 'log.txt';

var croneJob = null,
    testCafe = null;

getConfig(function (config) {
    // Creates a new TestCafe instance and specifies startup options for TestCafe
    // using a JSON object with the same notation as in the TestCafe configuration file.
    testCafe = new TestCafe(config.testcafe);

    // Sets a watch on changes in the configuration file.
    fs.watchFile(CONFIG_FILE_NAME, function () {
        restartCronJob();
    });

    // Logs the results in the console.
    console.log('\nTest will be started by pattern: ' + config.cronTime + '.');
    console.log('Test results you can find in the log.txt file.');

    runCronJob();
});

// Reads the configuration file and parses settings from JSON.
function getConfig(callback) {
    fs.readFile(CONFIG_FILE_NAME, function (err, json) {
        if (err)
            throw err;

        callback(JSON.parse(json));
    });
}

function restartCronJob() {
    // Stops the Cron job.
    croneJob.stop();
    // Runs the Cron job again.
    runCronJob();
}

function runCronJob() {
    getConfig(function (config) {
        // Creates a new Cron job for the Node.js instance.
        croneJob = new CronJob({
            cronTime: config.cronTime, // Cron pattern.
            onTick: function () {
                runTests(); // This function fires at the specified time.
            },
            start: true
        });
    });
}

function runTests() {
    var runOptions = {
        workers: testCafe.listConnectedWorkers(), // Returns an array of strings identifying connected remote workers.
        browsers: testCafe.listAvailableBrowsers(), // Returns an array of strings identifying available browsers.
        emulateCursor: true // Enables emulation of cursor movements while tests are running.
    };

    // Runs tests and saves the results to the log file.
    testCafe.runTests(runOptions, function () {
        testCafe.on('taskComplete', function (report) {
            log('\n' + new Date().toString() + ':\n' + JSON.stringify(report));
        });
    });
}

// Saves test run results to a log file, which is created if it does not exist.
function log(mssg) {
    fs.appendFile(LOG_FILE_NAME, mssg, function (err) {
        if (err)
            throw err;
    });
}
How 