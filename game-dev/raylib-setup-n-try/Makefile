CC = clang

CFLAGS = -std=c11 -O3 -g -Wall -Wextra -Wpedantic -Wstrict-aliasing

INCFLAGS = -I $(shell find ./lib -type d -name "include")

LDFLAGS = $(shell find ./lib -name "*.a" | sed "s/\.\///g")
LDFLAGS += -framework CoreVideo -framework IOKit -framework Cocoa -framework GLUT -framework OpenGL

BIN = bin
SRC = $(shell find src -name "*.c")
OBJ = $(SRC:%.c=$(BIN)/%.o)
OUT = $(BIN)/game

all: dirs game

$(BIN):
	mkdir -p $@

dirs: $(BIN)
	rsync -a --include='*/' --exclude='*' "src" "bin"

run: all
	$(BIN)/game

game: $(OBJ)
	$(CC) -o $(BIN)/game $^ $(LDFLAGS)

$(OBJ): $(SRC)
	$(CC) -o $@ -c $< $(INCFLAGS) $(CFLAGS)

clean:
	rm -rf $(BIN) $(OBJ)
