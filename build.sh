#!/bin/bash

[ -e build ] && rm -r build

mkdir build

cd build


### minimize JS
files=`cat ../src/index.html | grep -Eo 'src="[^"]+' | cut -d \" -f 2- | grep -v "editor"`

{
	echo "\"use strict\";"
	
	for a in $files; do
		cat ../src/$a | grep -vE "\"use strict\";"
	done
} > combined.js

java -jar /mnt/storage/closurecompiler/closure-compiler-20190618/target/closure-compiler-1.0-SNAPSHOT.jar --js combined.js --language_out=ECMASCRIPT_2015 --formatting=SINGLE_QUOTES --js_output_file combined.min.js


### minimize CSS
cat ../src/style.css | grep -vE '^\s+$' | tr -d '\n' | sed -r 's/;/; /g' | sed -r 's/\s+/ /g' | sed -r 's/}/}\n/g' > style.min.css


### copy minimized HTML
cp ../src/index.min.html ./


### embed and finalize
cat index.min.html | \
	sed \
		-e '/<!-- insert minified javascript here -->/{' \
		-e 'i <script>' \
		-e 'r combined.min.js' \
		-e 'a </script>' \
		-e 'd}' | \
	sed \
		-e '/<!-- insert minified css here -->/{' \
		-e 'i <style>' \
		-e 'r style.min.css' \
		-e 'a </style>' \
		-e 'd}' \
	> index.html


### zip it
zip -r9 game.zip index.html


git log --pretty=oneline -1

ls -albtr *
