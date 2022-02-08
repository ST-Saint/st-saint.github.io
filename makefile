##
# Blog
#
# @file
# @version 0.1



# end

build:
	rm -r ./docs ; \
	hugo ; \
	cd doks && hugo --gc --minify -d ../docs/doks
