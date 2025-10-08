#!/bin/sh
# Replace env vars in JavaScript files

echo "Replacing env vars in JS/HTML"
cp -r /var/templates/* /var/www/html/

echo "Set API URL to: $MAT_API_HOST_PLACEHOLDER"
echo "Set Frontend URL to: $FRONTEND_URL_PLACEHOLDER"

# Replace API URL placeholder in all JS files
for file in /var/www/html/**/*.js;
do
  echo "Processing $file ...";
  sed -i "s|MAT_API_HOST_PLACEHOLDER|$MAT_API_HOST_PLACEHOLDER|g" "$file"
  sed -i "s|FRONTEND_URL_PLACEHOLDER|$FRONTEND_URL_PLACEHOLDER|g" "$file"
done

echo "Processing index.html ...";
# Replace placeholders in index.html
sed -i "s|MAT_API_HOST_PLACEHOLDER|$MAT_API_HOST_PLACEHOLDER|g" /var/www/html/index.html
sed -i "s|FRONTEND_URL_PLACEHOLDER|$FRONTEND_URL_PLACEHOLDER|g" /var/www/html/index.html

cat /var/www/html/index.html
echo "Starting Nginx"
nginx -g 'daemon off;'
