Possibly helpful:

http://blog.endpoint.com/2013/11/using-javascript-in-postgresql.html

https://omahaproxy.appspot.com/

http://www.php-javascript.com/documentation/v8

### What worked for me

    dnf update
    dnf install git
    dnf install ncurses-compat-libs
    dnf install gcc-c++
    dnf install redhat-rpm-config
    git clone https://github.com/plv8/plv8.git
    
Now make the following changes:

    #define delete    delete_
    //#define namespace namespace_
    #define typeid    typeid_
    //#define typename  typename_
    //#define using   using_
    mv ./build/v8-git-mirror-5.1.281.14/third_party/binutils/Linux_x64/Release/bin/ld.gold ./build/v8-git-mirror-5.1.281.14/third_party/binutils/Linux_x64/Release/bin/ld.gold.OLD
    ln -s /usr/bin/ld.gold ./build/v8-git-mirror-5.1.281.14/third_party/binutils/Linux_x64/Release/bin/ld.gold

to the following files:

    plv8.cc
    plv8_type.cc
    plv8_func.cc

Back to commands:

    make static
    make install

    passwd postgres
    su - postgres
    initdb -D data -UTF8 -U postgres
    pg_ctl -D data start
    psql --host=127.0.0.1

    CREATE EXTENSION plv8;

    


