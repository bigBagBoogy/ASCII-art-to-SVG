# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "added rectangles"
git push -u origin main

# todo:⭐️

# let's:

Look at how to reduce output file size.
1 pixel = 1 character will give too big output files (pretty quickly).
maybe first run the raster-img.js script and the run the matrix script over that.

# end of todo..........................................

# issues:

port already in use
run: lsof -i :3000
get back something like: COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
node 2450 maarten 24u IPv6 138255 0t0 TCP \*:3000 (LISTEN)
run: kill -9 2450
(the 2450 is the PID number)
