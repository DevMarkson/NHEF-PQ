import 'dotenv/config';
import { MongoClient } from 'mongodb';

async function checkAllDbs() {
  const uri = process.env.MONGODB_URI.split('/nhef_questions_db')[0];
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB cluster...');
    
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    
    for (const dbInfo of dbs.databases) {
      console.log(`\nDB: ${dbInfo.name}`);
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      
      for (const col of collections) {
        const count = await db.collection(col.name).countDocuments();
        console.log(`  - ${col.name}: ${count} docs`);
        
        if (col.name === 'questions' || col.name === 'Question') {
            const sections = await db.collection(col.name).distinct('testSection');
            console.log(`    Sections: ${sections.join(', ')}`);
        }
      }
    }
  } finally {
    await client.close();
  }
}

checkAllDbs().catch(console.error);
