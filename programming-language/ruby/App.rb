# I/O
print "Enter your name: "
name = gets.chomp 
puts "Hello #{name} a"

# for loop
for index in 0..5
  puts index
end

5.times do |index|
  puts index
end

lucky_numbers = [4, 8, 15, 16, 23]
for lucky_number in lucky_numbers
  puts lucky_number
end

lucky_numbers.each do |lucky_number|
  puts lucky_number
end

# Exception catching
begin
  num = 10 / 0
rescue ZeroDivisionError
  puts "Error"
rescue
  puts "All other errors"
end
# raise "Made up exception"

# OOP
class Book
  attr_accessor :title, :author

  def initialize(title, author)
    self.title = title
    @author = author
  end

  def title=(title)
    puts "Set"
    @title = title
  end

  def title
    puts "Get"
    return @title
  end

  def read_book()
    puts "Reading #{self.title} by #{@author}"
  end

end
book1 = Book.new("Harry Potter", "JK Rowling")
book1.read_book()

# Inheritance
class Chef
  attr_accessor :name, :age
  def initialize(name, age)
    @name = name
    @age = age
  end

  def make_chicken()
    puts "The chef makes chicken"
  end

  def make_salad()
    puts "The chef makes salad"
  end

  def make_special_dish()
    puts "The chef makes a special dish"
  end
end

class ItalianChef < Chef
  attr_accessor :country_of_origin
  def initialize(name, age, country_of_origin)
    @country_of_origin = country_of_origin
    super(name, age)
  end

  def make_pasta()
    puts "The chef makes pasta" 
  end

  def make_special_dish()
    puts "The chef makes chicken parm"
  end
end

my_chef = Chef.new("Nam", 12)
my_chef.make_chicken()
my_chef.make_special_dish()

italian_chef = ItalianChef.new("Harry", 13, "Italian")
italian_chef.make_chicken()
italian_chef.make_special_dish()
puts italian_chef.age