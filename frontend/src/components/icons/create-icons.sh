#!/bin/sh

for i in $(ls -1 ../../assets/images/icons/ ); do

  npx @svgr/cli -- ../../assets/images/icons/${i} > ./$(basename ${i} .svg).tsx
  
done

# npx @svgr/cli -- ../../assets/images/icons/json-file.svg
