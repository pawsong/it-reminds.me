set -e
#stty -echo

bucket=s3://it-reminds.me

echo Deploy start
grunt

cd dist

# Upload to S3!
echo "\n\n-> Uploading to S3"

# Sync media files first (Cache: expire in 1 year)
echo "\n--> Syncing media .js and .css files..."
s3cmd sync --acl-public --exclude '*.*' --include '*.png' --include '*.jpg' --include '*.ico'  --include  '*.css' --include '*.js' \
	--add-header="Expires: Sat, 20 Nov 2020 18:46:39 GMT" --add-header="Cache-Control: max-age=31536000" . $bucket

# Sync html files (Cache: 2 hours)
echo "\n--> Syncing .html"
s3cmd sync --acl-public --exclude '*.*' --include '*.html' --add-header="Cache-Control: max-age=7200, must-revalidate" . $bucket

# Sync everything else, but ignore the assets!
echo "\n--> Syncing everything else"
s3cmd sync --acl-public --delete-removed . $bucket

cd ..

echo Deploy finished
