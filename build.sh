version=$(<.version)
echo "Building gwenore:$version"
docker build -t gwenore:$version -t gwenore:latest .