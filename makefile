##
# Blog
#
# @file
# @version 0.1



# end

build:
	hugo -D; \
	cd doks && hugo -D -d ../docs/doks
