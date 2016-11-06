Possibly helpful:
http://blog.endpoint.com/2013/11/using-javascript-in-postgresql.html
https://omahaproxy.appspot.com/
http://www.php-javascript.com/documentation/v8

git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git 
export PATH=`pwd`/depot_tools:"$PATH"
gclient
fetch v8
cd v8

git checkout 5.6.184

cp -rf buildtools/third_party/libc++/trunk/include/* testing/gtest/include/
cp -rf buildtools/third_party/libc++abi/trunk/include/* testing/gtest/include/
make library=shared i18nsupport=off native





