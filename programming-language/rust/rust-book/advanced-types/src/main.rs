use std::fmt;
use std::io::Error;

fn main() {
    // Creating Type Synonyms with Type Aliases
    type Kilometers = i32;
    let x: i32 = 5;
    let y: Kilometers = 5;
    println!("x + y = {}", x + y);

    type Thunk = Box<dyn Fn() + Send + 'static>;
    let f: Thunk = Box::new(|| println!("hi"));
    fn takes_long_type(f: Thunk) {}
    fn returns_long_type() -> Thunk {}

    type Result<T> = std::result::Result<T, std::io::Error>;
    fn write(&mut self, buf: &[u8]) -> Result<usize>;
    fn flush(&mut self) -> Result<()>;
    fn write_all(&mut self, buf: &[u8]) -> Result<()>;
    fn write_fmt(&mut self, fmt: fmt::Arguments) -> Result<()>;

    // The Never Type that Never Returns
    fn bar() -> ! {}
    let guess: u32 = match guess.trim().parse() {
        Ok(num) => num,
        Err(_) => continue,
    };

    impl<T> Option<T> {
        pub fn unwrap(self) -> T {
            match self {
                Some(val) => val,
                None => panic!("called `Option::unwrap()` on a `None` value"),
            }
        }
    }

    // Dynamically Sized Types and the Sized Trait
    fn generic_implicit<T>(t: T) {}
    fn generic_explicit<T: Sized>(t: T) {}
}
