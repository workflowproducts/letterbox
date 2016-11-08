Possibly helpful:

http://blog.endpoint.com/2013/11/using-javascript-in-postgresql.html

https://omahaproxy.appspot.com/

http://www.php-javascript.com/documentation/v8

### What worked for me:
Start with Fedora 24 - x86_64 and PostgreSQL 9.6

    dnf update
    dnf install git
    dnf install ncurses-compat-libs

    git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git 

    export PATH=`pwd`/depot_tools:"$PATH"

    fetch v8
    cd v8

    git checkout 5.6.184

    cp -rf buildtools/third_party/libc++/trunk/include/* testing/gtest/include/
    cp -rf buildtools/third_party/libc++abi/trunk/include/* testing/gtest/include/
    make library=shared i18nsupport=off strictaliasing=off native -j6

    cp include/*.h /usr/include
    cp out/native/lib.target/libv8.so /usr/lib

    cd ..
    dnf install g++
    dnf install redhat-rpm-config
    git clone https://github.com/plv8/plv8.git

    mv ./build/v8-git-mirror-5.1.281.14/third_party/binutils/Linux_x64/Release/bin/ld.gold ./build/v8-git -mirror-5.1.281.14/third_party/binutils/Linux_x64/Release/bin/ld.gold.OLD
    ln -s /usr/bin/ld.gold ./build/v8-git-mirror-5.1.281.14/third_party/binutils/Linux_x64/Release/bin/ld.gold


    #define delete    delete_
    //#define namespace namespace_
    #define typeid    typeid_
    //#define typename  typename_
    //#define using   using_

to the following files:

plv8.cc
plv8_type.cc
plv8_func.cc

make static
make install

chown super /var/run/postgresql
initdb -D data -UTF8 -U postgres
pg_ctl -D data startpg_ctl -D data start
psql --host=127.0.0.1 -U postgres

CREATE EXTENSION plv8;









