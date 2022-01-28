##
# Blog
#
# @file
# @version 0.1



# end

build:
	hugo; \
	cd doks && hugo -d ../docs/doks
