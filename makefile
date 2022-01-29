##
# Blog
#
# @file
# @version 0.1



# end

build:
	rm -r ./docs ; \
	hugo -D ; \
	cd doks && hugo -D -d ../docs/doks
