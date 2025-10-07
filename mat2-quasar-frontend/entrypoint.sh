#!/bin/sh
# Replace env vars in JavaScript files

echo "Replacing env vars in JS/HTML"
cp -r /var/templates/* /var/www/html/

echo "Set API Url to: $MAT_API_HOST_PLACEHOLDER"
for file in /var/www/html/**/*.js;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '$MAT_API_HOST_PLACEHOLDER' < $file.tmpl.js > $file
  rm $file.tmpl.js
done

echo "Processing index.html ...";
cp /var/www/html/index.html /var/www/html/index.html.tmpl.html
envsubst < /var/www/html/index.html.tmpl.html > /var/www/html/index.html
rm /var/www/html/index.html.tmpl.html

cat /var/www/html/index.html
echo "Starting Nginx"
nginx -g 'daemon off;'
