CC       := cc
CPPFLAGS :=
CFLAGS   := -std=c99 -Wall -Wextra
CFLAGS   += -Ilib/glfw/include
LDFLAGS  := -framework CoreVideo -framework IOKit -framework Cocoa -framework GLUT -framework OpenGL
LDLIBS   := lib/glfw/libglfw3.a

BIN  := main
SRCS := $(wildcard *.c)
DEPS := $(SRCS:.c=.d)
OBJS := $(SRCS:.c=.o)

DEV := 0

ifeq ($(DEV), 1)
	CFLAGS += -O0 -g -MMD
else
	CFLAGS += -O3
endif

$(BIN): $(OBJS)

-include $(DEPS)

.PHONY: run
run: $(BIN)
	./$(BIN)

.PHONY: clean
clean:
	rm -rf $(OBJS) $(DEPS) $(BIN)
