executable="game"
export MACOSX_DEPLOYMENT_TARGET=10.12
clang src/main.c -I ./include/raylib -L./lib/raylib -lraylib -o $executable -framework CoreVideo -framework IOKit -framework Cocoa -framework GLUT -framework OpenGL
# clang main.c -I ./raylib/include -lraylib -o $executable -framework CoreVideo -framework IOKit -framework Cocoa -framework GLUT -framework OpenGL
./$executable
