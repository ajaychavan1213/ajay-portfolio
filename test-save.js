const http = require('http');

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: JSON.parse(data)
        });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTest() {
  try {
    // 1. GET sync data
    console.log("Fetching sync data...");
    const getRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/v1/portfolio/sync',
      method: 'GET'
    });
    console.log(`GET sync status: ${getRes.statusCode}`);
    
    const data = getRes.body.data;
    console.log(`Initial skills count: ${data.skills.length}`);

    // 2. Modify skills
    console.log("Adding a new test skill...");
    const testSkill = {
      name: "Test Skill " + Date.now(),
      category: "frontend",
      level: 85,
      iconName: ""
    };
    data.skills.push(testSkill);

    // 3. POST sync data
    console.log("Saving modified data...");
    const postRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/v1/portfolio/sync',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, data);

    console.log(`POST sync status: ${postRes.statusCode}`);
    console.log("POST response body:", postRes.body);

    // 4. GET sync data again to verify
    console.log("Fetching sync data again to verify...");
    const getVerifyRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/v1/portfolio/sync',
      method: 'GET'
    });
    const verifiedSkills = getVerifyRes.body.data.skills;
    console.log(`Verified skills count: ${verifiedSkills.length}`);
    const found = verifiedSkills.find(s => s.name === testSkill.name);
    if (found) {
      console.log("✔ SUCCESS: The new skill was successfully saved and retrieved from MongoDB!");
    } else {
      console.log("❌ FAILURE: The new skill was NOT found in the database!");
    }
  } catch (err) {
    console.error("Test failed with error:", err);
  }
}

runTest();
