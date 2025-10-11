CC       := cc
CPPFLAGS :=
CFLAGS   := -std=c99 -Wall -Wextra
CFLAGS   += -Ilib/glfw/include -Ilib/glad/include
LDFLAGS  := -framework CoreVideo -framework IOKit -framework Cocoa -framework GLUT -framework OpenGL
LDLIBS   :=

BIN := main
SRC := $(wildcard *.c) 
OBJ := $(SRC:.c=.o) lib/glad/src/glad.o lib/glfw/src/libglfw3.a 
DEP := $(SRC:.c=.d) 

DEV := 0

ifeq ($(DEV), 1)
	CFLAGS += -O0 -g -MMD
else
	CFLAGS += -O3
endif

$(BIN): $(OBJ)

-include $(DEP)

lib/glfw/src/libglfw3.a:
	mkdir -p lib/glfw/build
	cmake -S lib/glfw -B lib/glfw/build -DGLFW_BUILD_EXAMPLES=OFF -DGLFW_BUILD_TESTS=OFF -DGLFW_BUILD_DOCS=OFF
	make -C lib/glfw/build
	mv lib/glfw/build/src/libglfw3.a lib/glfw/src
	rm -rf lib/glfw/build

.PHONY: run
run: $(BIN)
	./$(BIN)

.PHONY: tags
tags:
	ctags -R .
	# ctags --kinds-c=+p -R .

.PHONY: clean
clean:
	rm -rf $(DEP) $(OBJ) $(BIN)
