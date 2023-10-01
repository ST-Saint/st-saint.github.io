# WebDAV



* Install
1. Install the Apache HTTP Server.
   #+begin_src sh
   yay -S apache
   #+end_src
2. Enable modules for DAV in ~/etc/httpd/conf/httpd.conf~
   #+begin_src conf
   LoadModule dav_module modules/mod_dav.so
   LoadModule dav_fs_module modules/mod_dav_fs.so
   LoadModule dav_lock_module modules/mod_dav_lock.so
   #+end_src

3. Add the following line to ~/etc/httpd/conf/httpd.conf~
   #+begin_src conf
   DAVLockDB /home/httpd/DAV/DAVLock
   #+end_src

4. Create the directory outside of any other directives
   #+begin_src conf
     DAVLockDB /home/yayu/.local/DAVLock

     Alias /webdav "/home/yayu/WebDAV/DAV"

     <Directory "/home/yayu/WebDAV/DAV">
       DAV On
       AllowOverride None
       Options Indexes FollowSymLinks
       Require all granted
       Header always set Access-Control-Allow-Origin "*"
       Header always set Access-Control-Allow-Headers "Authorization, Content-Type, Depth, Range"
       Header always set Access-Control-Expose-Headers "Content-Length, Content-Type"
       Header always set Access-Control-Allow-Methods "GET, HEAD, PROPFIND"
     </Directory>
   #+end_src



* Troubleshooting
** 403 Forbidden & Permission denied because search permissions are missing on a component of the path
- Make *all the parent directory* executable

