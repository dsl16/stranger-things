import funmodule

bob = funmodule.Puppy('Bob',23,'pug',True)
print(f'Bob weighs {bob.weight} pounds.')

bob.approach()

bob.eat(10)
print(f'Bob now weighs {bob.weight} pounds. How fat!')

bob.poop(33)
print(f'Bob now weighs {bob.weight} pounds. Bob pooped his entire weight!'
       ' He\'s gone!!')
