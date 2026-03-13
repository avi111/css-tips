const fs = require('fs');
const path = require('path');

const newsDir = path.join(__dirname, 'news');

try {
  const files = fs.readdirSync(newsDir);

  // Find all files that match the pattern YYYY-MM-DD.html
  const htmlFiles = files.filter(file => 
    file.endsWith('.html') && /^\d{4}-\d{2}-\d{2}\.html$/.test(file)
  );
  
  const dates = htmlFiles.map(file => file.replace('.html', ''));

  if (dates.length > 0) {
    // Sort descending to get the latest date first
    dates.sort((a, b) => b.localeCompare(a));
    const latestDate = dates[0];
    
    const lastUpdatePath = path.join(newsDir, 'last-update.json');
    const data = JSON.stringify({ lastUpdate: latestDate }, null, 2);
    
    fs.writeFileSync(lastUpdatePath, data + '\n', 'utf-8');
    console.log(`Successfully updated last-update.json with date: ${latestDate}`);
  } else {
    console.log('No valid HTML files found in the news directory.');
  }
} catch (error) {
  console.error('Error updating last-update.json:', error);
}
