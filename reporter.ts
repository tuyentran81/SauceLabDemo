import fs from 'fs';
import path from 'path';
import { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';

interface TestResultData {
    title: string;
    status: string;
    duration: number;
    error?: string | null;
    video?: string | null;
    screenshot?: string | null;
}

class CustomHTMLReporter implements Reporter {
    private results: TestResultData[] = [];
    private outputDir: string;

    constructor(options: { outputDir?: string } = {}) {
        this.outputDir = options.outputDir || 'playwright-report';
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const testResult: TestResultData = {
            title: test.title,
            status: result.status,
            duration: result.duration,
            error: result.error ? result.error.message : null,
            video: result.attachments.find(a => a.name === 'video')?.path || null,
            screenshot: result.attachments.find(a => a.name === 'screenshot')?.path || null,
        };
        this.results.push(testResult);
    }

    async onEnd() {
        const reportPath = path.join(this.outputDir, 'report.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`Custom report generated at ${reportPath}`);
        this.generateHTMLReport();
    }

    private generateHTMLReport() {
        const totalTests = this.results.length;
        const totalExecutionTime = Math.round(this.results.reduce((sum, test) => sum + test.duration, 0) / 3600000);

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Playwright Test Dashboard</title>
                    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                    <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f4f4f4; }
                            .passed { color: green; }
                            .failed { color: red; }
                            .filter-container { margin-bottom: 10px; }
                            .chart-container { display: flex; justify-content: center; align-items: center; max-width: 300px; margin: auto; }
                            .no-data { text-align: center; color: red; font-size: 16px; display: none; }
                            .summary { margin-bottom: 20px; font-size: 16px; }
                    </style>
            </head>
            <body>
                    <h2>Playwright Test Dashboard</h2>
                    <div class="summary">
                            <p><strong>Total:</strong> ${totalTests}</p>
                            <p><strong>Total Execution Time:</strong> ${totalExecutionTime} hrs</p>
                    </div>
                    <div class="chart-container" id="chartContainer">
                            <canvas id="testChart"></canvas>
                    </div>
                    <div class="filter-container">
                            <label for="statusFilter">Filter by Status:</label>
                            <select id="statusFilter" onchange="filterTests()">
                                    <option value="all">All</option>
                                    <option value="passed">Passed</option>
                                    <option value="failed">Failed</option>
                                    <option value="skipped">Skipped</option>
                            </select>
                            <label for="searchTest">Search Test:</label>
                            <input type="text" id="searchTest" onkeyup="filterTests()" placeholder="Search by name...">
                            <label for="pageSize">Show:</label>
                            <select id="pageSize" onchange="filterTests()">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                            </select>
                    </div>
                    <p id="noDataMessage" class="no-data">No data available.</p>
                    <table id="testTable">
                            <thead>
                                    <tr>
                                            <th>Test</th>
                                            <th>Status</th>
                                            <th>Duration (ms)</th>
                                            <th>Error</th>
                                            <th>Video</th>
                                            <th>Screenshot</th>
                                    </tr>
                            </thead>
                            <tbody id="testTableBody"></tbody>
                    </table>
                    <script>
                            let testResults = ${JSON.stringify(this.results)};
                            let chartInstance;
                            function updateChart(filteredResults) {
                                    if (chartInstance) {
                                            chartInstance.destroy();
                                    }
                                    const ctx = document.getElementById('testChart').getContext('2d');
                                    const passed = filteredResults.filter(test => test.status === 'passed').length;
                                    const failed = filteredResults.filter(test => test.status === 'failed').length;
                                    const skipped = filteredResults.filter(test => test.status === 'skipped').length;
                                    if (passed + failed + skipped === 0) {
                                            document.getElementById('chartContainer').style.display = 'none';
                                    } else {
                                            document.getElementById('chartContainer').style.display = 'block';
                                            chartInstance = new Chart(ctx, {
                                                    type: 'doughnut',
                                                    data: {
                                                            labels: ['Passed', 'Failed', 'Skipped'],
                                                            datasets: [{
                                                                    data: [passed, failed, skipped],
                                                                    backgroundColor: ['#4CAF50', '#F44336', '#FFC107']
                                                            }]
                                                    },
                                                    options: {
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                    }
                                            });
                                    }
                            }
                            function filterTests() {
                                    let statusFilter = document.getElementById("statusFilter").value;
                                    let searchQuery = document.getElementById("searchTest").value.toLowerCase();
                                    let pageSize = parseInt(document.getElementById("pageSize").value);
                                    let filteredResults = testResults.filter(test => 
                                            (statusFilter === "all" || test.status === statusFilter) &&
                                            test.title.toLowerCase().includes(searchQuery)
                                    ).slice(0, pageSize);
                                    let tbody = document.getElementById("testTableBody");
                                    tbody.innerHTML = filteredResults.map(test =>
                                            '<tr>' +
                                                    '<td>' + test.title + '</td>' +
                                                    '<td class="' + test.status + '">' + test.status + '</td>' +
                                                    '<td>' + test.duration + '</td>' +
                                                    '<td>' + (test.error || 'N/A') + '</td>' +
                                                    '<td>' + (test.video ? '<a href="' + test.video + '">Video</a>' : 'N/A') + '</td>' +
                                                    '<td>' + (test.screenshot ? '<a href="' + test.screenshot + '">Screenshot</a>' : 'N/A') + '</td>' +
                                            '</tr>'
                                    ).join('');
                                    document.getElementById("noDataMessage").style.display = filteredResults.length ? "none" : "block";
                                    updateChart(filteredResults);
                            }
                            filterTests();
                    </script>
            </body>
            </html>
        `;
        fs.writeFileSync(path.join(this.outputDir, 'dashboard.html'), htmlContent);
    }
}

export default CustomHTMLReporter;
