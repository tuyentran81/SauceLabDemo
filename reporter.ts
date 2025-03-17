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

  async onEnd(result: FullResult) {
    const reportPath = path.join(this.outputDir, 'report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`Custom report generated at ${reportPath}`);
    this.generateHTMLReport();
  }

  private generateHTMLReport() {
    const totalTests = this.results.length;
    const passedTests = this.results.filter(test => test.status === 'passed').length;
    const failedTests = this.results.filter(test => test.status === 'failed').length;
    const skippedTests = this.results.filter(test => test.status === 'skipped').length;
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
              table { width: 100%; border-collapse: collapse; margin-top: 20px; display: table; }
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
              <p><strong>Total:${totalTests} </strong></p>
              <p><strong>Total Execution Time:${totalExecutionTime} hrs </strong></p>
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
          </div>
          <p id="noDataMessage" class="no-data">No data available.</p>
          <script>
              const ctx = document.getElementById('testChart').getContext('2d');
              new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                      labels: ['Passed', 'Failed', 'Skipped'],
                      datasets: [{
                          data: [${passedTests}, ${failedTests}, ${skippedTests}],
                          backgroundColor: ['#4CAF50', '#F44336', '#FFC107']
                      }]
                  },
                  options: {
                      responsive: true,
                      maintainAspectRatio: false,
                  }
              });
              function filterTests() {
                  let statusFilter = document.getElementById("statusFilter").value;
                  let searchQuery = document.getElementById("searchTest").value.toLowerCase();
                  let rows = document.querySelectorAll("table tbody tr");
                  let hasData = false;
                  rows.forEach(row => {
                      let status = row.children[1].textContent.toLowerCase();
                      let title = row.children[0].textContent.toLowerCase();
                      let show = (statusFilter === "all" || status === statusFilter) && (title.includes(searchQuery));
                      row.style.display = show ? "" : "none";
                      if (show) hasData = true;
                  });
                  document.getElementById("noDataMessage").style.display = hasData ? "none" : "block";
                  document.getElementById("chartContainer").style.display = hasData ? "block" : "none";
                  document.querySelector("table").style.display = hasData ? "table" : "none";
              }
          </script>
          <table>
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
              <tbody>
              ${this.results.map(test => `
                  <tr>
                      <td>${test.title}</td>
                      <td class="${test.status}">${test.status.charAt(0).toUpperCase() + test.status.slice(1)}</td>
                      <td>${test.duration}</td>
                      <td>${test.error || 'N/A'}</td>
                      <td>${test.video ? `<a href="${test.video}">Video</a>` : 'N/A'}</td>
                      <td>${test.screenshot ? `<a href="${test.screenshot}">Screenshot</a>` : 'N/A'}</td>
                  </tr>
              `).join('')}
              </tbody>
          </table>
      </body>
      </html>
    `;
    
    fs.writeFileSync(path.join(this.outputDir, 'dashboard.html'), htmlContent);
  }
}

export default CustomHTMLReporter;
