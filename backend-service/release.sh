#please save your git CREDENTIALS in memory first: http://stackoverflow.com/a/36949072/417939
export NODE_ENV=production
export GCLOUD_PROJECT=pure-particle-156503
export GOOGLE_APPLICATION_CREDENTIALS=/home/printsheetsc/data/kk.json
export GCLOUD_STORAGE_BUCKET=psgo-storage
git pull
#need permission to mkdir
sudo npm install
cservice "src/bin/www.js" --accessKey "7sfspk1axhmia"