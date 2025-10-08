#!/bin/sh
# Replace env vars in JavaScript files

echo "Replacing env vars in JS/HTML"
cp -r /var/templates/* /var/www/html/

echo "Set API Url to: $MAT2_API_URL_PROD"
for file in /var/www/html/**/*.js;
do
  echo "Processing $file ...";
  # Replace placeholder with actual API URL
  sed -i "s|MAT2_API_URL_PROD_PLACEHOLDER|$MAT2_API_URL_PROD|g" "$file"
done

echo "Processing index.html ...";
cp /var/www/html/index.html /var/www/html/index.html.tmpl.html
envsubst < /var/www/html/index.html.tmpl.html > /var/www/html/index.html
rm /var/www/html/index.html.tmpl.html

cat /var/www/html/index.html
echo "Starting Nginx"
nginx -g 'daemon off;'
