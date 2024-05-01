use proc_macro;
use proc_macro::TokenStream;
use quote::quote;
use syn;

fn main() {
    // Declarative Macros with macro_rules! for General Metaprogramming
    #[macro_export]
    macro_rules! vec {
        ( $( $x:expr ),* ) => {
            {
                let mut temp_vec = Vec::new();
                $(
                    temp_vec.push($x);
                )*
                    temp_vec
            }
        };
    }

    // Procedural Macros for Generating Code from Attributes
    #[some_attribute]
    pub fn some_name(input: TokenStream) -> TokenStream {}
    //// How to Write a Custom derive Macro
    pub trait HelloMacro {
        fn hello_macro();
    }
    #[proc_macro_derive(HelloMacro)]
    pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
        // Construct a representation of Rust code as a syntax tree
        // that we can manipulate
        let ast = syn::parse(input).unwrap();

        // Build the trait implementation
        impl_hello_macro(&ast)
    }
    fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
        let name = &ast.ident;
        let gen = quote! {
            impl HelloMacro for #name {
                fn hello_macro() {
                    println!("Hello, Macro! My name is {}!", stringify!(#name));
                }
            }
        };
        gen.into()
    }

    #[derive(HelloMacro)]
    struct Pancakes;

    Pancakes::hello_macro();

    //// Attribute-like macros
    #[route(GET, "/")]
    fn index() {}
    #[proc_macro_attribute]
    pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {}

    //// Function-like macros
    let sql = sql!(SELECT * FROM posts WHERE id=1);
    #[proc_macro]
    pub fn sql(input: TokenStream) -> TokenStream {}
}
