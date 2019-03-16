const MongoClient = require('mongodb').MongoClient;//创建客户端实例
const ObjectID = require('mongodb').ObjectID;
module.exports = ({url,collection,dbName}) => new Promise((resolve, reject) => {

  //可选参数
  url = url || 'mongodb://localhost:27017';
  dbName = dbName || '1812'
  collection = collection || 'user'

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      reject('库链接失败')
    } else {
      const db = client.db(dbName);
      collection = db.collection(collection);
      resolve({ collection, client,ObjectID })
    }
  });
  
})
